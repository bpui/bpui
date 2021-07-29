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
- cancel:     取消

method:
- getImageBase64() 获得裁剪的图像数据.
 -->

<template>
  <div ref="main" class="bp-uploader-image-crop-preview__mobile" :style="{
      display: visibleReal?null:'none',
      }" @click.stop>
    <button class="bp-uploader-image-crop-preview__cancel" @click.stop="oncancel"/></button>
    <button class="bp-uploader-image-crop-preview__ok" @click.stop="onok"></button>
    <div ref="canvasWrap" style="position:relative;" :style="{'margin-top':canvasMarginHeight+'px'}"
        @touchmove.stop="onMainMouseMove"
        @touchend.stop="onClipMouseUp"
        @touchstart.stop="onClipMouseDown" 
      >
      <canvas ref="canvas"></canvas>
      <div :style="{
          top: clipPadding+'px',
          left: clipPadding+'px',
          bottom: clipPadding+'px',
          right: clipPadding+'px',
          position: 'absolute'
        }">
        <div ref="canvasClip" class="bp-uploader-image-crop-preview__cliprect"
        :style="{ 
            left: clipPos.left + 'px' , 
            right: clipPos.right + 'px',
            top: clipPos.top + 'px',
            bottom: clipPos.bottom + 'px' }">
          <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="n"
            @touchstart.stop="onClipHornMouseDown"></span>
          <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="e"
            @touchstart.stop="onClipHornMouseDown"></span>
          <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="s"
            @touchstart.stop="onClipHornMouseDown"></span>
          <span v-if="!clipSharpReal" class="bp-uploader-image-crop-preview__cliprect__horn" data-direction="w"
            @touchstart.stop="onClipHornMouseDown"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as febs from 'febs-browser';
  import bpLibs from '@bpui/libs';
  // import bpDialog from '@bpui/dialog';

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
        canvasMarginHeight: 60,
        clipPadding: 30,
        clipSharpReal: null,
        outputFormatReal: null,
        imageBase64: null,
        imgScale: 1,
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
      },
    },
    mounted() {
      this.clipSharpReal = this.clipSharp;
      this.outputFormatReal = this.outputFormat;
      this.visibleReal = this.visible;

      febs.dom.addEventListener(window, "orientationchange", this.onresize, false);
      
      this.imgScale = 1;
      this.imgOffset = {x:0, y:0};

      // gesture.
      this.gesture = new bpLibs.Gesture(this.$refs.canvasWrap);
      let pinchRecognizer = this.gesture.enablePinchRecognizer();
      let panRecognizer = this.gesture.enablePanRecognizer({pointers:1});
      panRecognizer.requireFailure(pinchRecognizer);

      this.gesture.on('pan', this.onClipMouseMove)
                  .on('pinch', this.onClipMouseMove);
    },
    beforeDestroy() {
      febs.dom.removeEventListener(window, "orientationchange", this.onresize, false);
      this.gesture.dispose();
    },
    methods: {
      getImageBase64(outputFormatReal) {
        let img = this.image;
        let mws = img.width;
        let mhs = img.height;
        let mox = this.imgOffset.x;
        let moy = this.imgOffset.y;
    
        let cw = this.canvas.canvas.width;
        let ch = this.canvas.canvas.height;

        let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        canvas.width = (cw - (this.clipPos.left + this.clipPos.right + this.clipPadding*2)*2) / 2;
        canvas.height = (ch - (this.clipPos.top + this.clipPos.bottom + this.clipPadding*2)*2) / 2;

        let offx = (mox) + (this.clipPos.left+this.clipPadding)*2 / this.imgScale;
        let offy = (moy) + (this.clipPos.top+this.clipPadding)*2 / this.imgScale;

        ctx.drawImage(img, 
          offx, offy,
          canvas.width * 2 / this.imgScale, 
          canvas.height * 2 / this.imgScale, 
          0, 0, canvas.width, canvas.height);

        let dataURL = canvas.toDataURL(outputFormatReal || "image/png");
        canvas = null;
        return dataURL;
      },
      oncancel() {
        this.visibleReal=false;
        this.$emit('cancel');
        if (this._cancelListener) this._cancelListener();
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
      _addCancelListener(func) {
        this._cancelListener = func;
      },
      onresize() {
        if (this.visibleReal) {
          this.$timer.setTimeout(()=>{
              this.drawImage(this.imageBase64);
          }, 30);
        }
      },
      drawImage(imageBase64) {
        this.$timer.clearAllAnimationFrame();
        this.canvasSize = febs.dom.getViewPort();
        // this.canvasSize.width *= 1;
        this.canvasSize.width = Math.floor(this.canvasSize.width);
        // this.canvasSize.height *= 1;
        this.canvasSize.height = Math.floor(this.canvasSize.height);

        this.imageBase64 = imageBase64;
        let img = new Image();

        this.imgScale = 1;
        this.imgOffset = {x:0, y:0};

        let appCtx = this;
        img.onload = function () {
          let cw = appCtx.canvasSize.width;
          let ch = appCtx.canvasSize.height - appCtx.canvasMarginHeight;
          cw *= 2;
          ch *= 2;

          appCtx.canvasSize.width = cw;
          appCtx.canvasSize.height = ch;

          appCtx.imgScale = Math.max(cw / img.width, ch / img.height);
          let fixWidth = cw / img.width > ch / img.height;

          cw /= 2;
          ch /= 2;
          appCtx.clipPos = {
            top: cw < ch? (ch - cw) / 2: 0,
            bottom: cw > ch? 0 : ch - cw - (ch - cw) / 2,
            left: cw > ch? (cw - ch) / 2 : 0,
            right: cw > ch? cw - ch - (cw - ch) / 2: 0,
          }

          let ccw = cw - appCtx.clipPos.left - appCtx.clipPos.right - appCtx.clipPadding * 2;
          let cch = ch - appCtx.clipPos.top - appCtx.clipPos.bottom - appCtx.clipPadding * 2;
          appCtx.imgScaleMin = fixWidth ? (ccw / cw * appCtx.imgScale) : (cch / ch * appCtx.imgScale);
          // appCtx.imgScale0 = ()=>appCtx.canvasSize.width / 500.0 / (0.05 * img.width);
          appCtx.imgScale0 = (v)=> {
            let imgSWidth = appCtx.imgScale * appCtx.image.width;
            v = ((v / 0.05) * 2.0 + imgSWidth) / imgSWidth;
            let imgScale = appCtx.imgScale * v;
            imgScale = Math.min(imgScale, 4);
            imgScale = Math.max(imgScale, appCtx.imgScaleMin);
            // bpDialog.apiWidget.showToast(imgScale);
            return imgScale;
          }

          appCtx.imgOffset.x = (img.width - appCtx.canvasSize.width / appCtx.imgScale) / 2;
          appCtx.imgOffset.y = (img.height - appCtx.canvasSize.height / appCtx.imgScale) / 2;

          if (appCtx.imgOffset.x < 0) {
            appCtx.imgOffset.x = appCtx.imgOffset.x * appCtx.imgScale;
          }
          if (appCtx.imgOffset.y < 0) {
            appCtx.imgOffset.y = appCtx.imgOffset.y * appCtx.imgScale;
          }

          appCtx.$refs.canvas.width = appCtx.canvasSize.width;
          appCtx.$refs.canvas.height = appCtx.canvasSize.height;

          $(appCtx.$refs.canvas).css('width', appCtx.canvasSize.width/2 + 'px');
          $(appCtx.$refs.canvas).css('height', appCtx.canvasSize.height/2 + 'px');
          $(appCtx.$refs.canvasWrap).css('width', appCtx.canvasSize.width/2 + 'px');
          $(appCtx.$refs.canvasWrap).css('height', appCtx.canvasSize.height/2 + 'px');

          appCtx.canvas = appCtx.$refs.canvas.getContext('2d');

          let fooNo = ()=>{
            appCtx.$timer.requestAnimationFrame(() => {
              foo();
            });
          }
          let foo = ()=>{
            appCtx.$timer.requestAnimationFrame(() => {
              appCtx.onDrawImage();
              fooNo();
            });
          }
          foo();
        }

        img.src = imageBase64;
        this.visibleReal = true;
        this.image = img;
      },
      onDrawImage() {
        let img = this.image;
        let mws = img.width;
        let mhs = img.height;
        let mox = this.imgOffset.x;
        let moy = this.imgOffset.y;
        let cmw = (mws-mox) * this.imgScale;
        let cmh = (mhs-moy) * this.imgScale;

        let ctx = this.canvas;
        let cw = ctx.canvas.width;
        let ch = ctx.canvas.height;

        ctx.clearRect(0, 0, cw, ch);
        ctx.save();

        ctx.globalAlpha = 1;
        ctx.drawImage(img, mox, moy, mws-mox, mhs-moy, 0, 0, cmw, cmh);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, cw, ch);

        ctx.beginPath();
        if (this.clipSharpReal === 'circle') {
          let r = Number(cw/2 - this.clipPos.left - this.clipPos.right) - this.clipPadding*2;
          ctx.arc(
            Math.floor((this.clipPos.left+this.clipPadding)*2 + r),
            Math.floor((this.clipPos.top+this.clipPadding)*2 + r),
            r,
            0, Math.PI*2,
            true
          );
        }
        else {
          ctx.rect(
            Math.floor((this.clipPos.left+this.clipPadding)*2),
            Math.floor((this.clipPos.top+this.clipPadding)*2),
            Math.floor(Number(cw - (this.clipPos.left + this.clipPos.right + this.clipPadding*2)*2)),
            Math.floor(Number(ch - (this.clipPos.top + this.clipPos.bottom + this.clipPadding*2)*2)));
        }
        //ctx.fillStyle="#FFF";
        ctx.fill();
        ctx.clip();
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, mox, moy, mws-mox, mhs-moy, 0, 0, cmw, cmh);
        ctx.restore();
      },
      onClipMouseDown(e) {
        let touch;
        if (e.changedTouches) {
          touch = e.changedTouches[0];
        }
        else {
          touch = {clientX: e.clientX, clientY: e.clientY};
        }

        this.mousePos = {
          x: touch.clientX,
          y: touch.clientY
        };
        this.mouseClipPos = febs.utils.mergeMap(this.clipPos);
        this.mouseImgOffset = febs.utils.mergeMap(this.imgOffset);
        // let css = window.getComputedStyle(currentTarget);

        e.preventDefault();
      },
      onClipMouseUp(e) {
        // clip.
        this._rightImgScale();
        this._rightImgOffset();

        // horn.
        if (this.mouseHornDown) {
          this._moveHornClip(e);
        }
        this.mouseHornDown = null;
        
        e.preventDefault();
        // bpDialog.apiWidget.showToast('up');
      },
      onMainMouseMove(e) {
        this._moveHornClip(e);
        e.preventDefault();
      },
      onClipMouseMove(e) {
        if (e.type == 'pan') {
          this._moveClip(e.center.x, e.center.y);
        }
        else if (e.type == 'pinch') {
          this._moveScaleClip(e.center, e.scale);
        }
        e.preventDefault();
      },
      onClipHornMouseDown(e) {
        let touch;
        if (e.changedTouches) {
          touch = e.changedTouches[0];
        }
        else {
          touch = {clientX: e.clientX, clientY: e.clientY};
        }

        let currentTarget = e.currentTarget;

        if (!$(currentTarget).hasClass('bp-uploader-image-crop-preview__cliprect__horn')) {
          return;
        }

        this.mouseHornDown = $(currentTarget);
        this.mouseHornPos = {
          x: touch.clientX,
          y: touch.clientY
        };
        this.mouseHornClipPos = febs.utils.mergeMap(this.clipPos);
      },
      _moveClip(x, y) {
        if (this.mouseHornDown) {
          return;
        }
        if (Number.isNaN(x) || Number.isNaN(y) || !this.mousePos) {
          return;
        }

        let mousePos = {
          x: x - this.mousePos.x,
          y: y- this.mousePos.y,
        };

        this.imgOffset.x = this.mouseImgOffset.x - mousePos.x*2;
        this.imgOffset.y = this.mouseImgOffset.y - mousePos.y*2;
      
        // bpDialog.apiWidget.showToast('move');
      },
      _moveScaleClip(center, scale) {
        if (scale > 1) {
          scale = this.imgScale0(scale-1);
        } else {
          scale = this.imgScale0(-(1-scale));
        }

        let imgScaleTmp = scale / this.imgScale;
        this.imgScale = scale;

        this.imgOffset.x *= imgScaleTmp;
        this.imgOffset.y *= imgScaleTmp;

        this._rightImgScale();
        this._rightImgOffset();

        // bpDialog.apiWidget.showToast('scale');
      },
      _moveHornClip(e) {
        if (!this.mouseHornDown) {
          return;
        }

        let touch;
        if (e.changedTouches) {
          touch = e.changedTouches[0];
        }
        else {
          touch = {clientX: e.clientX, clientY: e.clientY};
        }

        let mousePos = {
          x: touch.clientX - this.mouseHornPos.x,
          y: touch.clientY - this.mouseHornPos.y
        };

        const min_size = 60;
        
        let direction = this.mouseHornDown.attr('data-direction');

        if (direction == 'n' || direction == 'ne' || direction == 'nw') {
          if (this.mouseHornClipPos.top + mousePos.y + this.clipPos.bottom + this.clipPadding*2 > this.canvasSize.height/2 - min_size) {
            mousePos.y = this.canvasSize.height/2 - this.clipPos.bottom - this.mouseHornClipPos.top - min_size - this.clipPadding*2;
          }
          else if (this.mouseHornClipPos.top + mousePos.y < 0) {
            mousePos.y = -this.mouseHornClipPos.top;
          }
        }

        if (direction == 's' || direction == 'se' || direction == 'sw') {
          if (this.clipPos.top + this.mouseHornClipPos.bottom - mousePos.y + this.clipPadding*2 > this.canvasSize.height/2 - min_size) {
            mousePos.y = -(this.canvasSize.height/2 - this.clipPos.top - this.mouseHornClipPos.bottom - min_size - this.clipPadding*2);
          }
          else if (this.mouseHornClipPos.bottom - mousePos.y < 0) {
            mousePos.y = this.mouseHornClipPos.bottom ;
          }
        }

        if (direction == 'w' || direction == 'nw' || direction == 'sw') {
          if (this.mouseHornClipPos.left + mousePos.x + this.clipPos.right + this.clipPadding*2 > this.canvasSize.width/2 - min_size) {
            mousePos.x = this.canvasSize.width/2 - this.clipPos.right - this.mouseHornClipPos.left - min_size - this.clipPadding*2;
          }
          else if (this.mouseHornClipPos.left + mousePos.x < 0) {
            mousePos.x = -this.mouseHornClipPos.left;
          }
        }

        if (direction == 'e' || direction == 'ne' || direction == 'se') {
          if (this.clipPos.left + this.mouseHornClipPos.right - mousePos.x + this.clipPadding*2 > this.canvasSize.width/2 - min_size) {
            mousePos.x = -(this.canvasSize.width/2 - this.clipPos.left - this.mouseHornClipPos.right - min_size - this.clipPadding*2);
          }
          else if (this.mouseHornClipPos.right - mousePos.x < 0) {
            mousePos.x = this.mouseHornClipPos.right;
          }
        }

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
            mn();
            me();
            break;
          case 's':
            ms();
            break;
          case 'sw':
            mw();
            ms();
            break;
          case 'se':
            ms();
            me();
            break;
          case 'w':
            mw();
            break;
          case 'nw':
            mw();
            mn();
            break;
          case 'e':
            me();
            break;
        }
      },
      _rightImgOffset() {
        let cp = this.clipPadding;
        let c = this.clipPos;

        if (-this.imgOffset.x * this.imgScale > (cp+c.left) * 2) {
          this.imgOffset.x = - (cp+c.left) * 2 / this.imgScale;
        }
        else if ((this.image.width - this.imgOffset.x) * this.imgScale < this.canvasSize.width - (cp+c.right)*2) {
          this.imgOffset.x = this.image.width - (this.canvasSize.width - (cp+c.right)*2) / this.imgScale;
        }

        if (-this.imgOffset.y * this.imgScale > (cp+c.top) * 2) {
          this.imgOffset.y = - (cp+c.top) * 2 / this.imgScale;
        }
        else if ((this.image.height - this.imgOffset.y) * this.imgScale < this.canvasSize.height - (cp+c.bottom)*2) {
          this.imgOffset.y = this.image.height - (this.canvasSize.height - (cp+c.bottom)*2) / this.imgScale;
        }
      },
      _rightImgScale() {
        this.imgScale = Math.max(this.imgScale, this.imgScaleMin);
      }
    }
  };
</script>
