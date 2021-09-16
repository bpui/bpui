<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Date: 2020-02-22 00:24
* Desc:  bp-uploader
*/

接收的属性
- coverUrl     封面
- serverUrl    上传服务器的地址
- data         需要上传到服务端的字符串
- accept       接受文件的类型
- maxFileSize  允许上传的最大文件.0表示无限制.默认为0
- timeout      上传超时,默认10000
- disabled     是否禁用
- httpHeaders  上传时的请求headers对象.
- crossDomain      跨域, 默认为true
- withCredentials  是否附带cookie, 默认为true
- tip          提示文字, 默认"将文件拖到此处,或点击上传"
- tipCancel    提示文字, 默认"点击取消"
- enableDragFile   打开拖拽文件特性
- textErrFileNotFound 默认为: '未选择文件!'
- textErrFileSizeExceed 默认为: '选择的文件大小超出最大值!'
- textErrFileHashError 默认为: '计算文件哈希值时发生错误,请重新选择文件!'
- textErrNetError 默认为: '网络错误,请稍后重试!'
- breakpointResume (file, crc32, cb:(sliceOffset: number)=>void)=>void; 上传文件前进行确认从哪个偏移地址开始上传

emit事件:
- uploadSuccess: 上传成功返回图片地址
- uploadProgress: 上传进度
- uploadError: 上传出错

method:
- reset() 重置上传组件.
- browseFile() 浏览文件.
 -->

<template>
  <div class="bp-uploader" :class="{
      'bp-uploader__disabled':disabled,
      'bp-uploader__drag': classDrapEnter
    }" @click.stop="browseFile">
    <div class="bp-uploader__progress" :style="{width: percentage}"></div>
    <div ref="main" class="bp-uploader__file-content-main" style="width:100%; height:100%;">

      <!-- image -->
      <div v-if="fileIsImage && isUploading" data-action="uploading" class="bp-uploader__add-icon" @click.stop="reset()">
        <bp-icon name="bp-uploader_cancel" width="22px" height="22px"></bp-icon>
        <p>{{tipCancel}}</p>
        <img v-if="coverRealUrl && coverRealUrl.length > 0" class="bp-uploader__uploading-image-cover"
          :src="coverRealUrl" alt :title="tip"/>
      </div>
      <div v-else-if="fileIsImage && coverRealUrl && coverRealUrl.length > 0" style="flex:1">
        <img class="bp-uploader__cover"
          :src="coverRealUrl" alt :title="tip"/>
      </div>
      <div v-else-if="fileIsImage" class="bp-uploader__add-icon" :title="tip">
        <bp-icon name="bp-uploader_add" width="22px" height="22px"></bp-icon>
        <p>{{tip}}</p>
      </div>
      <!-- file -->
      <div v-if="!fileIsImage && isUploading" data-action="uploading" class="bp-uploader__add-icon bp-uploader__uploading-icon-file" @click.stop="reset()">
        <bp-icon name="bp-uploader_cancel" width="22px" height="22px"></bp-icon>
        <p>{{tipCancel}}</p>
      </div>
      <div v-if="!fileIsImage && fileType" style="flex:1" :class="isUploading? 'bp-uploader__uploading-icon-filetype': ''">
        <div class="bp-uploader__cover bp-uploader__cover__file" :title="tip" :data-type="fileType"/>
        <div class="bp-uploader__cover__file__name">{{filename}}</div>
      </div>
      <div v-else-if="!fileIsImage && !isUploading" class="bp-uploader__add-icon" :title="tip">
        <bp-icon name="bp-uploader_add" width="22px" height="22px"></bp-icon>
        <p>{{tip}}</p>
      </div>

      <form method="post" class="bp-uploader__fileform" ref="form" role="form"
        enctype="multipart/form-data" :style="{
            visibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            opacity: 0,
          }">
        <input type="file" ref="fileInput" name="file" :accept="accept"
          @change="upload" class="bp-uploader__img_input" />
      </form>
    </div>
    <slot />
  </div>
</template>

<script>
  import bpDialog from '@bpui/dialog';
  import * as libUpload from './libs/upload';
  import * as libImage from './libs/image';
  import libUploadErr from './libs/upload.err';
  import * as febs from 'febs-browser';

  export default {
    name: "",
    components: {},
    props: {
      timeout: {
        default: 10000,
        type: Number
      },
      disabled: {
        default: false,
        type: Boolean
      },
      tip: {
        default: '将文件拖到此处,或点击上传',
        type: String
      },
      tipCancel: {
        default: '点击取消',
        type: String
      },
      data: {
        type: String
      },
      serverUrl: {
        type: String
      },
      accept: {
        type: String,
      },
      httpHeaders: {
        validator: function (value) {
          return !value || typeof value === 'object';
        }
      },
      breakpointResume: {
        validator: function (value) {
          return !value || typeof value === 'function';
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
      coverUrl: {
        default: "",
        type: String,
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
        fileIsImage: true,
        filename: null,
        fileType: null,
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
    },
    methods: {
      reset() {
        if (this.uploader) {
          this.uploader.abort();
          this.uploader = null;
        }

        let fileInput = this.$refs.fileInput;
        this.percentage = "0%";
        fileInput.value = '';
        this.coverRealUrl = null;
        this.fileType = null;
        this.filename = null;
        this.isUploading = false;
        return false;
      },
      upload(e, file) {
        if (this.uploader) {
          this.uploader.abort();
          this.uploader = null;
          this.isUploading = false;
        }
        this.percentage = "0%";
        this.coverRealUrl = null;
        this.fileType = null;
        this.filename = null;
        this.isUploading = false;

        let localImage;

        if (file) {
          if (file.type.indexOf('image/') == 0) {
            bpDialog.apiWidget.showLoading();

            libImage.getImageBase64ByFile(file, (base64Data) => {
              localImage = base64Data;
              bpDialog.apiWidget.hideLoading();
              //this.coverRealUrl = localImage;
            });
            this.fileIsImage = true;
            this.filename = null;
          } 
          else {
            let ii = file.name.lastIndexOf('.');
            ii = file.name.substr(ii+1);
            this.fileType = this.getSupportFileTypeIcon(ii);
            this.fileIsImage = false;
            this.filename = file.name;
          }
        }
        else {
          let fileInput = this.$refs.fileInput;
          if (!fileInput.files[0]) {
            return;
          }

          if (fileInput.files[0].type.indexOf('image/') == 0) {
            bpDialog.apiWidget.showLoading();
            libImage.getImageBase64(fileInput, (base64Data, width, height) => {
              localImage = base64Data;
              bpDialog.apiWidget.hideLoading();
              //this.coverRealUrl = localImage;
            });
            this.fileIsImage = true;
            this.filename = null;
          }
          else {
            let ii = fileInput.files[0].name.lastIndexOf('.');
            ii = fileInput.files[0].name.substr(ii+1);
            this.fileType = this.getSupportFileTypeIcon(ii);
            this.fileIsImage = false;
            this.filename = fileInput.files[0].name;
          }
        }

        let options = {
          timeout: this.timeout,
          data: this.data,
          crossDomain: this.crossDomain,
          withCredentials: this.withCredentials,
          headers: this.httpHeaders,
          breakpointResume: this.breakpointResume,
          fileInfo: file ? {
            fileObj: file,
          } : {
            formObj: $(this.$refs.form),
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

              this.coverRealUrl = null;
              this.fileType = null;
              this.filename = null;
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

        this.isUploading = true;
        return;

        if (options.uploadUrl) {
          libUpload.upload(options);
        } 
        else {
          this.reset();
          bpDialog.apiWidget.showAlert('props `serverUrl` is null');
        }
      },
      getSupportFileTypeIcon(type) {
        type = type.toLowerCase();
        if (!Number.isNaN(Number.parseInt(type[0]))) {
          return '_' + type;
        }
        
        switch (type) {
        case 'doc':
        case 'docx':
          return 'doc';
        case 'ppt':
        case 'pptx':
          return 'ppt';
        case 'xls':
        case 'xlsx':
          return 'xls';
        default:
          return type;
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
          let accept = this.accept;
          if (accept) {
            accept = febs.string.replace(accept, ' ', '');
            accept = accept.split(',');

            let fc = file.type.split('/');
            for (let i = 0; i < accept.length; i++) {
              let ac = accept[i].split('/');
              if ((fc[0] == ac[0] || ac[0] == '*') && (ac[1] == '*' || fc[1] == ac[1])) {
                this.upload(null, file);
                return;
              }
            }
            return;
          }

          this.upload(null, file);
        }
      }
    }
  };
</script>
