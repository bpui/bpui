/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

"use strict";

import * as febs from "febs-browser";
import err from "./upload.err";
import { submitFile } from "./submitFile";
import { getFileByBase64 } from './image';

/**
 * post方式上传文件
 * 使用 multipart/form-data 方式.
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据.
 *                fileInfo:   , // 文件信息
 *                  imageBase64:   , // 图片的base64数据
 *                  filename:       , // 图片文件名.
 *                  fileObj:        , // input 文件对象.
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

  var file = getFileByBase64(cfg.fileInfo.imageBase64, cfg.fileInfo.filename);
  cfg.fileObj = cfg.fileInfo.fileObj;

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

  var timeout = cfg.timeout;

  function uploadFile() {
    var filesize = this.file.size;
    if (this.sliceLength == -1) {
      this.sliceLength = filesize - this.sliceOffset;
    }

    filesize = filesize - this.sliceOffset;
    if (this.sliceLength > filesize) {
      this.sliceLength = filesize;
    } else {
      filesize = this.sliceLength;
    }

    var urlpath;
    if (this.checkoutCrc32) {
      urlpath =
        this.control_upload_url +
        "crc32=" +
        this.crc +
        "&size=" +
        filesize +
        (this.data ? "&data=" + this.data : "");
    } else {
      urlpath = this.control_upload_url + "size=" + filesize;
    }

    let per = this.sliceOffset / this.file.size;
    let per2 = this.sliceLength / this.file.size;

    try {
      var ctx = this;

      var con = submitFile([this.file], {
        sliceOffset: this.sliceOffset,
        sliceLength: this.sliceLength,
        fileIndex: 0,
        timeout: this.timeout,
        method: "POST",
        url: urlpath,
        progress: function(percentComplete) {
          percentComplete = percentComplete ? parseFloat(percentComplete.toFixed(2)) : 0;
          percentComplete = per + per2 * percentComplete;
          percentComplete = parseFloat(percentComplete.toFixed(2));
          if (ctx.control_upload_progress_cb)
            ctx.control_upload_progress_cb(ctx.fileObj, percentComplete);
        },
        error: function() {
          if (ctx.control_upload_cb) ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, null);
          // ctx.fileObj[0].value="";
        },
        success: function(r) {
          try {
            r = JSON.parse(r);
          } catch (e) {
            r = {};
          }

          if (ctx.control_upload_cb) ctx.control_upload_cb(null, ctx.fileObj, r);
          ctx.fileObj[0].value = "";
        },
        complete: function(xhr, responseText) {
          if (xhr.status != 200) {
            try {
              if (ctx.control_upload_cb)
                ctx.control_upload_cb(err.NET_ERROR, ctx.fileObj, responseText, xhr);
            } catch (e) {}
          } else {
            ctx.fileObj[0].value = "";
          }
        },
        crossDomain: this.crossDomain,
        headers: this.headers,
        withCredentials: this.withCredentials
      });
      if (this.control_upload_begin_cb) this.control_upload_begin_cb(this.fileObj, con);
    } catch (e) {
      if (this.control_upload_cb) this.control_upload_cb(e, this.fileObj, null);
      // this.fileObj[0].value="";
    }
  } // function.

  if (cfg.checkoutCrc32) {
    crypt.crc32_fileSegment(
      file,
      control_sliceOffset,
      control_sliceLength,
      function(crc) {
        if (crc) {
          uploadFile.bind(febs.utils.mergeMap(this, { crc: crc }))();
        } else {
          if (this.control_upload_cb)
            this.control_upload_cb(err.FILE_HASH_ERROR, this.fileObj, null);
          // this.fileObj[0].value="";
        }
      }.bind({
        timeout: timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        file: file,
        data: cfg.data,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
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
      control_upload_progress_cb: control_upload_progress_cb,
      control_upload_cb: control_upload_cb,
      crossDomain: cfg.crossDomain,
      headers: cfg.headers,
      withCredentials: cfg.withCredentials,
      control_upload_begin_cb: control_upload_begin_cb,
      sliceOffset: control_sliceOffset,
      sliceLength: control_sliceLength
    })();
  }
}
