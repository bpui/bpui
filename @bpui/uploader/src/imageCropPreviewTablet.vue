<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Date: 2020-02-22 00:24
*/

接收的属性
- visible       是否可见.
- clipSharp      裁剪形状(square, circle).
- outputFormat   输出的图片格式; 默认为 image/png

emit事件:
- clipFinish: 裁剪完成

method:
- getImageBase64() 获得裁剪的图像数据.
 -->

<template>
  <div class="bp-uploader-image-crop-preview" :style="{
      display: visibleReal?null:'none',
      }" @click.stop 
      @mousemove.stop="onClipMouseMove"
      @mouseup.stop="onClipMouseUp"
      @mouseleave="onClipMouseUp">
    <bp-icon class="bp-uploader-image-crop-preview__cancel" name="bp-uploader_cancel" width="22px"
      height="22px" @click="visibleReal=false"></bp-icon>
    <bp-icon class="bp-uploader-image-crop-preview__ok" name="bp-uploader_ok" width="22px"
      height="22px" @click="onok"></bp-icon>
    <div ref="canvasWrap" style="position:relative">
      <canvas ref="canvas"></canvas>
      <div ref="canvasClip" class="bp-uploader-image-crop-preview__cliprect"
        @mousedown.stop="onClipMouseDown" :style="{ 
          left: clipPos.left + 'px' , 
          right: clipPos.right + 'px',
          top: clipPos.top + 'px',
          bottom: clipPos.bottom + 'px' }">
        <span class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="nw"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="ne"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="sw"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="se"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="n"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="s"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="w"
          @mousedown.stop="onClipHornMouseDown"></span>
        <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="e"
          @mousedown.stop="onClipHornMouseDown"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as febs from 'febs-browser';

  export default {
    name: "vue-bp-uploader-image-crop-preview",
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
    },
    props: {
      visible: {
        default: false,
        type: Boolean,
      },
      clipSharp: {
        validator: function (value) {
          return !value || value === 'square' || value === 'circle';
        }
      },
      outputFormat: {
        default: 'image/png',
        type: String,
      },
    },
    data() {
      return {
        visibleReal: false,
        clipPos: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        clipSharpReal: null,
        outputFormatReal: null,
      };
    },
    watch: {
      visible(v) {
        this.visibleReal = v;
      },
      visibleReal(v) {
        if (this.visible != v) {
          this.$emit('update:visible', v);
        }
        if (!v) {
          this.$timer.clearAllInterval();
        }
      },
    },
    mounted() {
      this.clipSharpReal = this.clipSharp;
      this.outputFormatReal = this.outputFormat;
      this.visibleReal = this.visible;
      this.canvasSize = febs.dom.getViewPort();

      this.canvasSize.width *= 0.9;
      this.canvasSize.width = Math.floor(this.canvasSize.width);
      this.canvasSize.height *= 0.9;
      this.canvasSize.height = Math.floor(this.canvasSize.height);

      $(this.$refs.canvas).attr('width', this.canvasSize.width);
      $(this.$refs.canvas).attr('height', this.canvasSize.height);

      febs.dom.addEventListener(window, "orientationchange", this.onresize, false);
      if (!febs.utils.browserIsMobile()) {
        febs.dom.addEventListener(window, "resize", this.onresize);
      }
    },
    beforeDestroy() {
      febs.dom.removeEventListener(window, "orientationchange", this.onresize, false);
      if (!febs.utils.browserIsMobile()) {
        febs.dom.removeEventListener(window, "resize", this.onresize);
      }
    },
    methods: {
      getImageBase64(outputFormatReal) {
        let cw = Math.floor(this.canvas.canvas.width);
        let ch = Math.floor(this.canvas.canvas.height);
        let ccw = Math.floor(Number(cw - this.clipPos.left - this.clipPos.right));
        let cch = Math.floor(Number(ch - this.clipPos.top - this.clipPos.bottom));

        let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");

        canvas.width = Math.floor(ccw/cw * this.image.width);
        if (this.clipSharpReal) {
          canvas.height = canvas.width;
        }
        else {
          canvas.height = Math.floor(cch/ch * this.image.height);
        }

        ctx.drawImage(this.image, 
          this.clipPos.left/cw * this.image.width,
          this.clipPos.top/ch * this.image.height,
          ccw/cw * this.image.width,
          cch/ch * this.image.height,
          0, 0, canvas.width, canvas.height
        );

        let dataURL = canvas.toDataURL(outputFormatReal || "image/png");
        canvas = null;
        return dataURL;
      },
      onok(){
        let url = this.getImageBase64(this.outputFormatReal);
        this.visibleReal = false;
        this.$emit('clipFinish', url);
        if (this._clipFinishListener) {
          this._clipFinishListener(url);
        }
      },
      _addClipFinishListener(func) {
        this._clipFinishListener = func;
      },
      onresize() {
        if (this.visibleReal) {
          this.drawImage(this.imageBase64);
        }
      },
      drawImage(imageBase64) {
        this.canvasSize = febs.dom.getViewPort();
        this.canvasSize.width *= 0.9;
        this.canvasSize.width = Math.floor(this.canvasSize.width);
        this.canvasSize.height *= 0.9;
        this.canvasSize.height = Math.floor(this.canvasSize.height);

        this.imageBase64 = imageBase64;
        let img = new Image();

        let appCtx = this;
        img.onload = function () {
          let imw = img.width;
          let imh = img.height;
          let cw = appCtx.canvasSize.width;
          let ch = appCtx.canvasSize.height;
          let sw = 1.0,
            sh = 1.0;

          if (imw > cw) {
            sw = cw / imw;
          }
          if (imh > ch) {
            sh = ch / imh;
          }

          sw = Math.min(sw, sh);

          let imrw = sw * imw;
          let imrh = sw * imh;

          imrw = Math.floor(imrw);
          imrh = Math.floor(imrh);
          appCtx.canvasSize.width = imrw;
          appCtx.canvasSize.height = imrh;

          if (appCtx.clipSharpReal) {
            appCtx.clipPos = {
              top: imrw < imrh? (imrh - imrw) / 2: 0,
              bottom: imrw > imrh? 0 : imrh - imrw - (imrh - imrw) / 2,
              left: imrw > imrh? (imrw - imrh) / 2 : 0,
              right: imrw > imrh? imrw - imrh - (imrw - imrh) / 2: 0,
            }
          } else {
            appCtx.clipPos = {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }

          $(appCtx.$refs.canvas).attr('width', imrw);
          $(appCtx.$refs.canvas).attr('height', imrh);
          $(appCtx.$refs.canvasWrap).css('width', imrw + 'px');
          $(appCtx.$refs.canvasWrap).css('height', imrh + 'px');

          appCtx.canvas = appCtx.$refs.canvas.getContext('2d');
          appCtx.$timer.setTimeout(() => {
            appCtx.onDrawImage();
          }, 10);
        }

        img.src = imageBase64;
        this.visibleReal = true;
        this.image = img;
      },
      onDrawImage() {
        let ctx = this.canvas;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();

        ctx.globalAlpha = 1;
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        if (this.clipSharpReal === 'circle') {
          let r = Number(ctx.canvas.width - this.clipPos.left - this.clipPos.right)/2;
          ctx.arc(
            Math.floor(this.clipPos.left + r),
            Math.floor(this.clipPos.top + r),
            r,
            0, Math.PI*2,
            true
          );
        }
        else {
          ctx.rect(
            Math.floor(Number(this.clipPos.left)), 
            Math.floor(Number(this.clipPos.top)), 
            Math.floor(Number(ctx.canvas.width - this.clipPos.left - this.clipPos.right)),
            Math.floor(Number(ctx.canvas.height - this.clipPos.top - this.clipPos.bottom)));
        }
        //ctx.fillStyle="#FFF";
        ctx.fill();
        ctx.clip();
        ctx.globalAlpha = 1;
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
      },
      onClipMouseDown(e) {
        let currentTarget = e.currentTarget;

        if (!$(currentTarget).hasClass('bp-uploader-image-crop-preview__cliprect')) {
          return;
        }

        this.mouseDown = true;
        this.mousePos = {
          x: e.clientX,
          y: e.clientY
        };
        this.mouseClipPos = febs.utils.mergeMap(this.clipPos);
        // let css = window.getComputedStyle(currentTarget);

        this.$timer.setInterval(this.onDrawImage, 30);
      },
      onClipMouseUp(e) {
        // clip.
        if (this.mouseDown) {
          let currentTarget = e.currentTarget;
          currentTarget = $(currentTarget);
          this._moveClip(currentTarget, e.clientX, e.clientY);
        }
        this.mouseDown = false;

        // horn.
        if (this.mouseHornDown) {
          this._moveHornClip(e.clientX, e.clientY);
        }
        this.mouseHornDown = null;
        this.$timer.clearAllInterval();
      },
      onClipMouseMove(e) {
        if (this.mouseHornDown) {
          this._moveHornClip(e.clientX, e.clientY);
        }
        else if (this.mouseDown) {
          let currentTarget = e.currentTarget;
          currentTarget = $(currentTarget);
          this._moveClip(currentTarget, e.clientX, e.clientY);
        }
      },
      onClipHornMouseDown(e) {
        let currentTarget = e.currentTarget;

        if (!$(currentTarget).hasClass('bp-uploader-image-crop-preview__cliprect__horn')) {
          return;
        }

        this.mouseHornDown = $(currentTarget);
        this.mouseHornPos = {
          x: e.clientX,
          y: e.clientY
        };
        this.mouseHornClipPos = febs.utils.mergeMap(this.clipPos);

        this.$timer.setInterval(this.onDrawImage, 30);
      },
      _moveClip(currentTarget, x, y) {
        let mousePos = {
          x: x - this.mousePos.x,
          y: y - this.mousePos.y
        };

        if (mousePos.y < 0) {
          if (this.mouseClipPos.top + mousePos.y < 0) {
            mousePos.y = -this.mouseClipPos.top;
          }
        }
        else if (mousePos.y > 0) {
          if (this.mouseClipPos.bottom - mousePos.y < 0) {
            mousePos.y = this.mouseClipPos.bottom;
          }
        }

        if (mousePos.x < 0) {
          if (this.mouseClipPos.left + mousePos.x < 0) {
            mousePos.x = -this.mouseClipPos.left;
          }
        }
        else if (mousePos.x > 0) {
          if (this.mouseClipPos.right - mousePos.x < 0) {
            mousePos.x = this.mouseClipPos.right;
          }
        }

        this.$set(this.clipPos, 'top', this.mouseClipPos.top + mousePos.y);
        this.$set(this.clipPos, 'left', this.mouseClipPos.left + mousePos.x);
        this.$set(this.clipPos, 'bottom', this.mouseClipPos.bottom - mousePos.y);
        this.$set(this.clipPos, 'right', this.mouseClipPos.right - mousePos.x);

      },
      _moveHornClip(x, y) {
        let mousePos = {
          x: x - this.mouseHornPos.x,
          y: y - this.mouseHornPos.y
        };

        let direction = this.mouseHornDown.attr('data-direction');

        if (direction == 'n' || direction == 'ne' || direction == 'nw') {
          if (this.mouseHornClipPos.top + mousePos.y + this.clipPos.bottom > this.canvasSize.height) {
            mousePos.y = this.canvasSize.height - this.clipPos.bottom - this.mouseHornClipPos.top - min_size;
          }
          else if (this.mouseHornClipPos.top + mousePos.y < 0) {
            mousePos.y = -this.mouseHornClipPos.top;
          }
        }

        if (direction == 's' || direction == 'se' || direction == 'sw') {
          if (this.clipPos.top + this.mouseHornClipPos.bottom - mousePos.y > this.canvasSize.height) {
            mousePos.y = -(this.canvasSize.height - this.clipPos.top - this.mouseHornClipPos.bottom - min_size);
          }
          else if (this.mouseHornClipPos.bottom - mousePos.y < 0) {
            mousePos.y = this.mouseHornClipPos.bottom ;
          }
        }

        if (direction == 'w' || direction == 'nw' || direction == 'sw') {
          if (this.mouseHornClipPos.left + mousePos.x + this.clipPos.right > this.canvasSize.width) {
            mousePos.x = this.canvasSize.width - this.clipPos.right - this.mouseHornClipPos.left - min_size;
          }
          else if (this.mouseHornClipPos.left + mousePos.x < 0) {
            mousePos.x = -this.mouseHornClipPos.left;
          }
        }

        if (direction == 'e' || direction == 'ne' || direction == 'se') {
          if (this.clipPos.left + this.mouseHornClipPos.right - mousePos.x > this.canvasSize.width) {
            mousePos.x = -(this.canvasSize.width - this.clipPos.left - this.mouseHornClipPos.right - min_size);
          }
          else if (this.mouseHornClipPos.right - mousePos.x < 0) {
            mousePos.x = this.mouseHornClipPos.right;
          }
        }

        let moveX = 0;
        if (this.clipSharpReal) {
          let x = Math.abs(mousePos.x);
          let y = Math.abs(mousePos.y);
          moveX = Math.min(x, y);
        }

        const min_size = 10;

        let mn = () => {
          this.$set(this.clipPos, 'top', this.mouseHornClipPos.top + mousePos.y);
        }
        let ms = () => {
          this.$set(this.clipPos, 'bottom', this.mouseHornClipPos.bottom - mousePos.y);
        }
        let mw = () => {
          this.$set(this.clipPos, 'left', this.mouseHornClipPos.left + mousePos.x);
        }
        let me = () => {
          this.$set(this.clipPos, 'right', this.mouseHornClipPos.right - mousePos.x);
        }


        switch (direction) {
          case 'n':
            mn();
            break;
          case 'ne':
            if (this.clipSharpReal) {
              if (mousePos.x > 0) {
                mousePos.x = moveX;
                mousePos.y = -moveX;
              }
              else {
                mousePos.x = -moveX;
                mousePos.y = moveX;
              }
            }
            mn();
            me();
            break;
          case 's':
            ms();
            break;
          case 'sw':
            if (this.clipSharpReal) {
              if (mousePos.x > 0) {
                mousePos.x = moveX;
                mousePos.y = -moveX;
              }
              else {
                mousePos.x = -moveX;
                mousePos.y = moveX;
              }
            }
            mw();
            ms();
            break;
          case 'se':
            if (this.clipSharpReal) {
              if (mousePos.x > 0) {
                mousePos.x = moveX;
                mousePos.y = moveX;
              }
              else {
                mousePos.x = -moveX;
                mousePos.y = -moveX;
              }
            }
            ms();
            me();
            break;
          case 'w':
            mw();
            break;
          case 'nw':
            if (this.clipSharpReal) {
              if (mousePos.x > 0) {
                mousePos.x = moveX;
                mousePos.y = moveX;
              }
              else {
                mousePos.x = -moveX;
                mousePos.y = -moveX;
              }
            }
            mw();
            mn();
            break;
          case 'e':
            me();
            break;
        }
      },
    }
  };
</script>
