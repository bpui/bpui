<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Date: 2020-02-22 00:24
* Desc:  bp-uploader-image
*/

接收的属性
- previewRef   预览组件引用 ()=>ComponentInstance
- clipSharp      裁剪形状(square, circle).
- outputFormat   输出的图片格式; 默认为 image/png
- coverUrl     封面
- serverUrl    上传服务器的地址
- data         需要上传到服务端的字符串
- maxFileSize  允许上传的最大文件.0表示无限制.默认为0
- maxImageSize 最大的宽或高的尺寸, 超过此尺寸会自动压缩, 默认为1024;
- timeout      上传超时,默认10000
- disabled     是否禁用
- httpHeaders  上传时的请求headers对象.
- crossDomain      跨域, 默认为true
- withCredentials  是否附带cookie, 默认为true
- tip          提示文字, 默认"点击上传"
- enableDragFile   打开拖拽文件特性
- textErrFileNotFound 默认为: '未选择文件!'
- textErrFileSizeExceed 默认为: '选择的文件大小超出最大值!'
- textErrFileHashError 默认为: '计算文件哈希值时发生错误,请重新选择文件!'
- textErrNetError 默认为: '网络错误,请稍后重试!'

emit事件:
- uploadSuccess: 上传成功返回图片地址
- uploadProgress: 上传进度
- uploadError: 上传出错

method:
- reset() 重置上传组件.
- browseFile() 浏览文件.
 -->

<template>
  <div class="bp-uploader-image-crop" :class="{
      'bp-uploader-image__disabled':disabled,
      'bp-uploader-image__drag': classDrapEnter
    }" @click.stop="browseFile">
    <div class="bp-uploader-image__progress" :style="{width: percentage}"></div>
    <div ref="main" class="bp-uploader-image__file-content-main" style="width:100%; height:100%;">
      <div v-if="isUploading" data-action="uploading" class="bp-uploader-image__add-icon" @click.stop="reset()">
        <bp-icon name="bp-uploader_cancel" width="22px" height="22px"></bp-icon>
      </div>
      <img v-else-if="coverRealUrl && coverRealUrl.length > 0" class="bp-uploader-image__cover"
        :src="coverRealUrl" alt :title="tip" />
      <div v-else class="bp-uploader-image__add-icon" :title="tip">
        <bp-icon name="bp-uploader_add" width="22px" height="22px"></bp-icon>
      </div>
      <form method="post" class="bp-uploader-image__fileform" ref="form" role="form"
        enctype="multipart/form-data" :style="{
            visibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            opacity: 0,
          }">
        <input type="file" ref="fileInput" name="file" accept="image/*"
          @change="upload" class="bp-uploader-image__img_input" />
      </form>
    </div>
    <slot />
  </div>
</template>

<script>
  import Vue from 'vue';
  import bpLibs from '@bpui/libs';
  import bpDialog from '@bpui/dialog';
  import * as libUpload from './libs/upload.base64';
  import * as libImage from './libs/image';
  import libUploadErr from './libs/upload.err';
  import imageCropPreviewTablet from './imageCropPreviewTablet.vue';
  import imageCropPreviewMobile from './imageCropPreviewMobile.vue';
  
  const imageCropPreview = bpLibs.device.browserIsMobile()? imageCropPreviewMobile: imageCropPreviewTablet;

  export default {
    name: "",
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
    },
    props: {
      previewRef: {
        validator: function (value) {
          return !value || typeof value === 'function';
        }
      },
      timeout: {
        default: 10000,
        type: Number
      },
      disabled: {
        default: false,
        type: Boolean
      },
      tip: {
        default: '点击上传',
        type: String
      },
      data: {
        type: String
      },
      serverUrl: {
        type: String
      },
      httpHeaders: {
        validator: function (value) {
          return !value || typeof value === 'object';
        }
      },
      crossDomain: {
        default: true,
        type: Boolean,
      },
      withCredentials: {
        default: true,
        type: Boolean,
      },
      maxFileSize: {
        default: 0,
        type: Number,
      },
      maxImageSize: {
        validator: function (value) {
          return !value || value > 0;
        },
        default: 1024,
        type: Number,
      },
      coverUrl: {
        default: "",
        type: String,
      },
      outputFormat: {
        default: 'image/png',
        type: String,
      },
      clipSharp: {
        validator: function (value) {
          return !value || value === 'square' || value === 'circle';
        }
      },
      enableDragFile: {
        default: true,
        type: Boolean,
      },
      textErrFileNotFound: {
        default: "未选择文件!",
        type: String,
      },
      textErrFileSizeExceed: {
        default: "选择的文件大小超出最大值!",
        type: String,
      },
      textErrFileHashError: {
        default: "计算文件哈希值时发生错误,请重新选择文件!",
        type: String,
      },
      textErrNetError: {
        default: "网络错误,请稍后重试!",
        type: String,
      },
    },
    data() {
      return {
        classDrapEnter: false,
        coverRealUrl: "",
        percentage: "0%",
        uploader: null,
        isUploading: false,
      };
    },
    watch: {
      coverUrl: function (val, oldVal) {
        this.coverRealUrl = val;
      },
      enableDragFile: function (val, oldVal) {
        this.enableDragFile(val);
      }
    },
    mounted() {
      this.coverRealUrl = this.coverUrl;
      if (this.enableDragFile) {
        this.enableFiledrag(this.enableDragFile)
      }

      this.previewId = null;
      this.previewRefReal = this.previewRef;
      if (!this.previewRefReal) {
        this.previewId = 'c' + febs.crypt.uuid();
        $(`<div id="${this.previewId}"></div>`).appendTo($('body'));
        // 创建实例.
        this.previewRefReal = new Vue({
          render: h => h(imageCropPreview, {
            attrs: {id:this.previewId}, 
            props: {
              clipSharp: this.clipSharp,
              outputFormat: this.outputFormat,
            },
            on: {
              clipFinish:(imageData)=>{
                this.coverRealUrl = imageData;
                this.$refs.fileInput.value = '';
                this.onUpload(this.coverRealUrl);
              },
              cancel: ()=>{
                this.$refs.fileInput.value = '';
              },
            }
          }),
        }).$mount(`#${this.previewId}`).$children[0];
      }
      else {
        this.previewRefReal = this.previewRefReal();
        if (!(bpLibs.dom.isVueObject(this.previewRefReal) && this.previewRefReal.$vnode.tag.indexOf('bp-uploader-image-crop-preview') >= 0)) {
          throw new Error('previewRef is not component of `bpUploaderImagePreview`');
        }
        this.previewRefReal.$data.clipSharpReal = this.clipSharp;
        this.previewRefReal.$data.outputFormatReal = this.outputFormat;
        this.previewRefReal._addClipFinishListener((imageData)=>{
          this.coverRealUrl = imageData;
          this.$refs.fileInput.value = '';
          this.onUpload(this.coverRealUrl);
        });
        this.previewRefReal._addCancelListener(()=>{
          this.$refs.fileInput.value = '';
        });
      }
    },
    beforeDestroy() {
      if (this.previewId) {
        $('#'+this.previewId).remove();
      }
    },
    methods: {
      reset() {
        if (this.uploader) {
          this.uploader.abort();
          this.uploader = null;
        }

        this.$refs.fileInput.value = '';
        this.percentage = "0%";
        this.coverRealUrl = null;
        this.isUploading = false;
      },
      onUpload(imageData) {

        libImage.compressImage(imageData, this.maxImageSize, null, (base64Data, width, height)=>{
          this.coverRealUrl = base64Data;
          let options = {
            timeout: this.timeout,
            data: this.data,
            crossDomain: this.crossDomain,
            withCredentials: this.withCredentials,
            headers: this.httpHeaders,
            fileInfo: {
              imageBase64: base64Data,
              filename: this.filename,
              fileObj: $(this.$refs.fileInput),
            },
            uploadUrl: this.serverUrl,
            maxFileSize: this.maxFileSize,
            beginCB: (fieObj, uploader) => {
              this.uploader = uploader;
              this.isUploading = true;
            },
            finishCB: (err, fileObj, serverData) => {
              this.percentage = "0%";
              this.isUploading = false;
              if (err) {
                
                if (err == libUploadErr.FILE_NOT_FOUND) {
                  bpDialog.apiWidget.showAlert(this.textErrFileNotFound);
                }
                else if (err == libUploadErr.FILE_SIZE_EXCEED) {
                  bpDialog.apiWidget.showAlert(this.textErrFileSizeExceed);
                }
                else if (err == libUploadErr.FILE_HASH_ERROR) {
                  bpDialog.apiWidget.showAlert(this.textErrFileHashError);
                }
                else if (err == libUploadErr.NET_ERROR) {
                  bpDialog.apiWidget.showAlert(this.textErrNetError);
                }
                else {
                  bpDialog.apiWidget.showAlert(err.toString());
                }

                this.reset();
                this.$emit('uploadError', err);
              } else {
                this.coverRealUrl = localImage;
                this.$emit('uploadSuccess', serverData);
              }
            },
            progressCB: (fileObj, percent) => {
              percent = percent == 0 ? 0.01 : percent;
              this.percentage = percent * 100 + "%";
              this.$emit('uploadProgress', percent);
            }
          };

          if (options.uploadUrl) {
            libUpload.upload(options);
          } else {
            this.reset();
            bpDialog.apiWidget.showAlert('props `serverUrl` is null');
          }
        });
      },
      upload(e, file) {
        if (this.uploader) {
          this.uploader.abort();
          this.uploader = null;
          this.isUploading = false;
        }

        let localImage;

        if (file) {
          libImage.getImageBase64ByFile(file, (base64Data) => {
            //this.coverRealUrl = localImage;
            if (!base64Data) {
              bpDialog.apiWidget.showAlert(this.textErrFileNotFound);
              return;
            }
            this.filename = file.name;
            this.previewRefReal.drawImage(base64Data);
          });
        }
        else {
          let fileInput = this.$refs.fileInput;
          libImage.getImageBase64(fileInput, (base64Data, width, height) => {
            if (!base64Data) {
              bpDialog.apiWidget.showAlert(this.textErrFileNotFound);
              return;
            }
            this.filename = fileInput.value;
            this.previewRefReal.drawImage(base64Data);
          });
        }
      },
      browseFile() {
        if (this.percentage != '0%') return false;
        let fileInput = this.$refs.fileInput;
        fileInput.click();
        return false;
      },
      enableFiledrag(isEnable) {
        this.$refs.main.ondragover = null;
        this.$refs.main.ondrop = null;
        this.$refs.main.ondragenter = null;
        this.$refs.main.ondragleave = null;

        if (isEnable) {
          document.ondragover = function (e) {
            e.preventDefault();
          };
          document.ondrop = function (e) {
            e.preventDefault();
          };
          this.$refs.main.ondragover = function (e) {
            e.preventDefault();
          };
          this.$refs.main.ondrop = this._dropHandle;
          this.$refs.main.ondragenter = this._dragEnter;
          this.$refs.main.ondragleave = this._dragLeave;
        }
      },
      _dragEnter() {
        this.classDrapEnter = true;
      },
      _dragLeave() {
        this.classDrapEnter = false;
      },
      _dropHandle(e) {
        this.reset();
        let list = e.dataTransfer.files;
        if (list.length > 0) {
          let file = list[0];
          if (file.type.indexOf('image/') == 0) {
            this.upload(null, file);
          }
        }
      }
    }
  };
</script>
