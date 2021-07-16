/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

"use strict";

import * as febs from "febs-browser";
import err from "./upload.err";
import { submitForm } from "./submitForm";
import { submitFile } from "./submitFile";

/**
 * post方式上传文件
 * 使用 multipart/form-data 方式.
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据.
 *                fileInfo:   , // 文件信息; 以下两种
 *                 1. formObj:    , // 含有enctype="multipart/form-data"的form
 *                    fileObj:    , // form中的file对象
 *                    fileIndex:  , // 选中的file文件的索引; 默认为0;
 *                 2. fileObj:    , // File 对象.
 *                uploadUrl:  , // 上传文件内容的url. 系统将自动使用 uploadUrl?crc32=&size=的方式来上传.
 *                maxFileSize:    , // 允许上传的最大文件.0表示无限制.默认为0
 *                beginCB:     , // 上传开始的回调. function(fieObj, uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData, xhr=null)
 *                               //                   err:  - uploadErr.FILE_NOT_FOUND    未选择文件.
 *                               //                         - uploadErr.FILE_SIZE_EXCEED  文件大小超出允许的最大值.
 *                               //                         - uploadErr.FILE_HASH_ERROR   计算本地文件hash值时错误.
 *                               //                         - uploadErr.NET_ERROR         ajax上传时出错.
 *                               //                         - 其他异常对象
 *                               //                   serverData: 服务器返回的数据.
 *                progressCB:  , // 上传进度的回调. function(fileObj, percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true,
 *                checkoutCrc32: true,   // 是否上传 crc32,size,ajaxmark(防止chrome优化) 三个参数.
 *                timeout: 5000,        // 默认为 5000
 *                breakpointResume:     // (file, crc32,  (sliceOffset)=>void)=>void; 上传文件前进行确认从哪个偏移地址开始上传
 *                sliceOffset: 0,       // 上传数据起始偏移地址.
 *                sliceLength: -1,      // 上传数据段长度 (-1表示到结尾).
 *              }
 */
export function upload(cfg) {
  var control_upload_cb = cfg.finishCB;
  var control_upload_progress_cb = cfg.progressCB;
  var control_upload_begin_cb = cfg.beginCB;
  var control_upload_url = cfg.uploadUrl;
  var control_upload_maxFileSize = !cfg.maxFileSize ? Number.MAX_SAFE_INTEGER : cfg.maxFileSize;

  var control_sliceOffset = cfg.sliceOffset || 0;
  var control_sliceLength = cfg.sliceLength || -1;

  var control_fileIndex = cfg.fileInfo.fileIndex || 0;

  cfg.fileObj = $(cfg.fileInfo.fileObj);

  var file;

  // Form.
  if (cfg.fileInfo.formObj) {
    cfg.formObj = $(cfg.fileInfo.formObj);

    // if (cfg.fileType) {
    //   cfg.fileObj.attr("accept", cfg.fileType);
    // }
    file = cfg.fileObj[0].files[control_fileIndex];
  } else {
    file = cfg.fileObj;
  }

  let breakpointResumeFoo = cfg.breakpointResume;
  if (!breakpointResumeFoo) {
    breakpointResumeFoo = (file, crc32, sliceOffsetCb) => {
      sliceOffsetCb(0);
    };
  } // if.

  // ie9.
  var uid = "febsuifile" + febs.crypt.uuid();
  uid = febs.string.replace(uid, "-", "");
  var is_IE9 = febs.utils.browserIEVer() <= 9;
  if (is_IE9 && cfg.formObj) {
    cfg.formObj.attr("target", uid);
    cfg.formObj.attr("action", control_upload_url);
    cfg.formObj.attr("method", "post");

    var iframeDom = `<iframe id="${uid}" name="${uid}" style="display:none;"></iframe>`;
    $("body").prepend(iframeDom);

    $("#" + uid).on("load", function() {
      var responseText = $("#" + uid)[0].contentDocument.body.textContent;
      var r;
      try {
        r = JSON.parse(responseText);
      } catch (e) {
        r = {};
      }

      if (r.isSuccess == true || r.code == 200) {
        //success
        if (control_upload_cb) control_upload_cb(null, cfg.fileObj, r);
      } else {
        //error
        if (control_upload_cb) control_upload_cb(err.NET_ERROR, cfg.fileObj, null);
      }

      cfg.formObj.removeAttr("target");
      cfg.fileObj[0].value = "";
      $("#" + uid).remove();
    });

    if (control_upload_begin_cb)
      control_upload_begin_cb(cfg.fileObj, {
        abort: function() {
          $("#" + uid).remove();
          cfg.fileObj[0].value = "";
        }
      });

    var inputs = cfg.formObj.children("input");
    $(inputs[inputs.length - 1]).click();
  } else {
    if (!file) {
      if (control_upload_cb) control_upload_cb(err.FILE_NOT_FOUND, cfg.fileObj, null);
      return;
    }
    if (file.size > control_upload_maxFileSize) {
      if (control_upload_cb) control_upload_cb(err.FILE_SIZE_EXCEED, cfg.fileObj, null);
      return;
    }

    var urlQueryIndex = control_upload_url.indexOf("?");
    if (urlQueryIndex < 0) {
      control_upload_url += "?";
    } else if (urlQueryIndex < control_upload_url.length - 1) {
      control_upload_url += "&";
    }

    var formObj = cfg.formObj;
    var fileObj = cfg.fileObj;
    var timeout = cfg.timeout;

    function uploadFile() {
      try {
        breakpointResumeFoo(this.file, this.crc, offset => {
          this.sliceOffset = offset;
          var filesize = this.file.size;
          if (this.sliceLength == -1) {
            this.sliceLength = filesize - this.sliceOffset;
          }

          // filesize = filesize - this.sliceOffset;
          // if (this.sliceLength > filesize) {
          //   this.sliceLength = filesize;
          // } else {
          //   filesize = this.sliceLength;
          // }

          var urlpath;
          if (this.checkoutCrc32) {
            urlpath =
              this.control_upload_url +
              "crc32=" +
              this.crc +
              "&offset=" +
              this.sliceOffset +
              "&size=" +
              filesize +
              (this.data ? "&data=" + this.data : "");
          } else {
            urlpath = this.control_upload_url + "size=" + filesize +
              "&offset=" +
              this.sliceOffset;
          }

          let per = this.sliceOffset / this.file.size;
          let per2 = this.sliceLength / this.file.size;

          try {
            var ctx = this;

            if (this.formObj) {
              var con = submitForm(this.formObj, this.fileObj, {
                sliceOffset: this.sliceOffset,
                sliceLength: this.sliceLength,
                fileIndex: this.control_fileIndex,
                timeout: this.timeout,
                method: "POST",
                url: urlpath,
                progress: function (percentComplete) {
                  percentComplete = percentComplete ? parseFloat(percentComplete.toFixed(2)) : 0;
                  percentComplete = per + per2 * percentComplete;
                  percentComplete = parseFloat(percentComplete.toFixed(2));
                  if (ctx.control_upload_progress_cb)
                    ctx.control_upload_progress_cb(ctx.fileObj, percentComplete);
                },
                error: function () {
                  if (ctx.control_upload_cb) ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, null);
                  ctx.fileObj[0].value = "";
                },
                success: function (r) {
                  try {
                    r = JSON.parse(r);
                  } catch (e) {
                    r = {};
                  }

                  if (ctx.control_upload_cb) ctx.control_upload_cb(null, ctx.fileObj, r);
                  ctx.fileObj[0].value = "";
                },
                complete: function (xhr, responseText) {
                  if (xhr.status != 200) {
                    try {
                      if (ctx.control_upload_cb)
                        ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, responseText, xhr);
                    } catch (e) { }
                  } else {
                    ctx.fileObj[0].value = "";
                  }
                },
                crossDomain: this.crossDomain,
                headers: this.headers,
                withCredentials: this.withCredentials
              });
              if (this.control_upload_begin_cb) this.control_upload_begin_cb(this.fileObj, con);
            } else {
              var con = submitFile(this.fileObj, {
                sliceOffset: this.sliceOffset,
                sliceLength: this.sliceLength,
                fileIndex: this.control_fileIndex,
                timeout: this.timeout,
                method: "POST",
                url: urlpath,
                progress: function (percentComplete) {
                  percentComplete = percentComplete ? parseFloat(percentComplete.toFixed(2)) : 0;
                  percentComplete = per + per2 * percentComplete;
                  percentComplete = parseFloat(percentComplete.toFixed(2));
                  if (ctx.control_upload_progress_cb)
                    ctx.control_upload_progress_cb(ctx.fileObj, percentComplete);
                },
                error: function () {
                  if (ctx.control_upload_cb) ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, null);
                  ctx.fileObj[0].value = "";
                },
                success: function (r) {
                  try {
                    r = JSON.parse(r);
                  } catch (e) {
                    r = {};
                  }

                  if (ctx.control_upload_cb) ctx.control_upload_cb(null, ctx.fileObj, r);
                  ctx.fileObj[0].value = "";
                },
                complete: function (xhr, responseText) {
                  if (xhr.status != 200) {
                    try {
                      if (ctx.control_upload_cb)
                        ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, responseText, xhr);
                    } catch (e) { }
                  } else {
                    ctx.fileObj[0].value = "";
                  }
                },
                crossDomain: this.crossDomain,
                headers: this.headers,
                withCredentials: this.withCredentials
              });
              if (this.control_upload_begin_cb) this.control_upload_begin_cb(this.fileObj, con);
            } // if..else.
          } catch (e) {
            if (this.control_upload_cb) this.control_upload_cb(e, this.fileObj, null);
            this.fileObj[0].value = "";
          }
        });
      } catch (e) {
        if (this.control_upload_cb) this.control_upload_cb(e, this.fileObj, null);
        console.error(e);
      }
    } // function.

    if (cfg.checkoutCrc32) {
      crypt.crc32_fileSegment(
        file,
        0,
        -1,
        function(crc) {
          if (crc) {
            uploadFile.bind(febs.utils.mergeMap(this, { crc: crc }))();
          } else {
            if (this.control_upload_cb)
              this.control_upload_cb(err.FILE_HASH_ERROR, this.fileObj, null);
            this.fileObj[0].value = "";
          }
        }.bind({
          timeout: timeout,
          checkoutCrc32: cfg.checkoutCrc32,
          control_upload_url: control_upload_url,
          fileObj: cfg.fileObj,
          file: file,
          data: cfg.data,
          formObj: cfg.formObj,
          control_upload_progress_cb: control_upload_progress_cb,
          control_upload_cb: control_upload_cb,
          control_fileIndex: control_fileIndex,
          crossDomain: cfg.crossDomain,
          headers: cfg.headers,
          withCredentials: cfg.withCredentials,
          control_upload_begin_cb: control_upload_begin_cb,
          sliceOffset: control_sliceOffset,
          sliceLength: control_sliceLength
        })
      );
    } else {
      uploadFile.bind({
        timeout: timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        file: file,
        data: cfg.data,
        formObj: cfg.formObj,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
        control_fileIndex: control_fileIndex,
        crossDomain: cfg.crossDomain,
        headers: cfg.headers,
        withCredentials: cfg.withCredentials,
        control_upload_begin_cb: control_upload_begin_cb,
        sliceOffset: control_sliceOffset,
        sliceLength: control_sliceLength
      })();
    }
  } // if..else.
}
