<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

 -->


<template>
  <widget ref="widget" class="bp-popover" 
    :visible.sync="visibleReal" 
    :maskClose="maskClose" 
    :mask="mask" 
    :preventEvent="false"
    :hideBodyScroll="false"
    :appendToBody="true"
  >
    <div class="bp-popover__main" ref="main" :direction="directionData" :style="pStyle"  
      :class="pageClass"
    >
      <slot name="default" />
      <div class="bp-popover__arrow" :style="{
        left: offsetArrowLeft,
        top: offsetArrowTop,
        right: offsetArrowRight,
        bottom: offsetArrowBottom,
        }"></div>
    </div>
  </widget>
</template>

<script>
  import bpLibs from '@bpui/libs';
  import bpDialog from '@bpui/dialog';

  export default {
    components: {
      widget: bpDialog.bpWidget
    },
    props: {
      visible: Boolean,
      mask: {
        default: false,
        type: Boolean,
      },
      maskClose: {
        default: true,
        type: Boolean,
      },
      pageClass: String|Array,
      pageStyle: String|Array|Object,

      direction: {
        default: 'auto',
        type: String,
      },
      trigger: {
        type: String,
      },
      bind: {
        default: null,
        type: [String,Object,HTMLElement],
      },
    },
    computed: {
      pStyle() {
        if (this.pageStyle) {
          if (typeof this.pageStyle === 'string') {
            return `left:${this.offsetLeft};top:${this.offsetTop};`+this.pageStyle;
          }
          else {
            return {
              left: this.offsetLeft,
              top: this.offsetTop,
              ...this.pageStyle
            };
          }
        } else {
          return {
            left: this.offsetLeft,
            top: this.offsetTop,
          }
        }
      }
    },
    data() {
      return {
        visibleReal: false,
        directionData: 'auto',
        offsetTop: 0,
        offsetLeft: 0,
        offsetArrowLeft: null,
        offsetArrowTop: null,
        offsetArrowBottom: null,
        offsetArrowRight: null,
      };
    },
    watch: {
      visible(v, oldV) {
        if (this.visibleReal != v) {
          this.visibleReal = v;
          if (v != oldV) {
            if (v) {
              this._onTriggerShow(null);
            }
            else {
              this._onTriggerHide(null);
            }
            // this._show(this.direction);
            // this._show('top');
            // this._show('bottom');
            // this._show('left');
            // this._show('right');
          }
        }
      },
      visibleReal(v) {
        this.$emit('update:visible', v);
      },
      bind(v, oldV) {
        this._removeEvent(oldV);
        this._bindEvent(v);
      }
    },
    beforeMount() {
      this.visibleReal = this.visible;
    },
    beforeDestroy() {
      this._removeEvent(this.bind);
      let clickEventName = bpLibs.device.browserIsMobile()?'click':'mousedown';
      $('body').off(clickEventName, this._hide);
    },
    mounted() {
      // $('body').off('click', this._hide).on('click', this._hide);

      // if (this.trigger) {
      //   let el = $(this.$el).parent();
      //   this._bindEvent(el);
      // }

      this.$nextTick(()=>{
        this.$parent.$forceUpdate();
        this.$nextTick(()=>{
          if (!this.bind) {
            this._bindEvent(this.bind);
          }
        });
      })
    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function () {
        return this.$refs.widget.show();
      },

      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function () {
        return this.$refs.widget.hide();
      },
      _removeEvent(v) {
        if (v) {
          let el;
          if (bpLibs.dom.isVueObject(v)) {
            el = v.$el;
          }
          else {
            el = v;
          }

          $(el).off('mouseover', this._onTriggerShow)
          $(el).off('mouseleave', this._onTriggerHide)
          $(el).off('click', this._onTriggerShow)
          if (this.ges) {
            this.ges.dispose();
            this.ges = null;
          }
        }
      },
      _bindEvent(v) {
        this._removeEvent(v);

        if (!v) {
          v = this.$parent;
        }

        if (v) {
          let el;
          if (bpLibs.dom.isVueObject(v)) {
            el = v.$el;
          }
          else {
            el = v;
          }

          if (this.trigger == 'hover') {
            if (bpLibs.device.browserIsMobile()) {
              $(el).on('click', this._onTriggerShow);
            }
            else {
              $(el).on('mouseover', this._onTriggerShow);
              $(el).on('mouseleave', this._onTriggerHide);
            }
          } else if (this.trigger == 'click') {
            let eventName = bpLibs.device.browserIsMobile()? 'click': 'click';
            $(el).off(eventName, this._onTriggerShow).on(eventName, this._onTriggerShow);  
          } else if (this.trigger == 'long-press') {
            this.ges = new bpLibs.Gesture(el);
            this.ges.enablePressRecognizer({duration:600});
            this.ges.on('press', (ev)=>{
              bpLibs.device.vibrate(10);
              this._onTriggerShow(ev);
            });
          }
        }
      },
      _onTriggerShow(ev) {
        let clickEventName = bpLibs.device.browserIsMobile()?'click':'mousedown';
        let closeHandleTimeout = 10;

        if (ev) {
          if (this.trigger == 'click') {
            if (this.visibleReal) {
              $('body').off(clickEventName, this._hide);
              this._hide();

              ev.stopPropagation();
              ev.preventDefault();
              ev.cancelBubble = true;
              return false;
            }
          }
        }


        this.visibleReal = true;
        setTimeout(()=>{
          $('body').off(clickEventName, this._hide).on(clickEventName, this._hide);
        }, closeHandleTimeout);

        this._show(this.direction);
      },
      _onTriggerHide(e) {
        let main = $(this.$refs.main);

        let ev = e;

        // this.$timer.setTimeout(()=>{
          let mainOffset = bpLibs.dom.getElementOffset(main[0]);
          
          // in popover.
          if (ev 
          && ev.clientX >= mainOffset.left - 14
          && ev.clientX <= mainOffset.left + main[0].offsetWidth + 14
          && ev.clientY >= mainOffset.top - 14
          && ev.clientY <= mainOffset.top + main[0].offsetHeight + 14) {
            $(this.$refs.main).on('mouseleave', this._hideVisible);
          }
          else {
            this.visibleReal = false;
          }

          let clickEventName = bpLibs.device.browserIsMobile()?'click':'mousedown';
          $('body').off(clickEventName, this._hide);
        // }, 50);
      },
      _show: function(directionData) {
        let bind = this.bind;
        if (!this.bind)  {
          bind = this.$parent;
        }

        let el;
        if (bpLibs.dom.isVueObject(bind)) {
          el = bind.$el;
        }
        else {
          el = bind;
        }

        let offset = bpLibs.dom.getElementOffset(el);
        let port = {};
        port.height = el.clientHeight;
        port.width = el.clientWidth;

        let viewPort = bpLibs.dom.getViewPort();
        let docOffset = bpLibs.dom.getDocumentOffset();

        this.offsetTop = offset.top + docOffset.top;
        // this.offsetLeft = offset.left;

        // directionData.
        if (directionData == 'top') {
          this.directionData = 'top';
          this.offsetTop -= 8;
        }
        else if (directionData == 'bottom') {
          this.directionData = 'bottom';
          this.offsetTop += port.height;
        }
        else if (directionData == 'left') {
          this.directionData = 'left';
          this.offsetLeft = offset.left + port.width;
        }
        else if (directionData == 'right') {
          this.directionData = 'right';
          this.offsetLeft = offset.left + port.width;
        }
        else {
          if ((offset.top + port.height / 2) > viewPort.height/2) {
            directionData = 'top';
            this.directionData = 'top';
            this.offsetTop -= 8;
          }
          else {
            directionData = 'bottom';
            this.directionData = 'bottom';
            this.offsetTop += port.height;
          }
        }


        this.offsetTop = parseInt(this.offsetTop);

        // arrow.
        let arrowOffset;
        if (directionData == 'left' || directionData == 'right') { 
          arrowOffset = parseInt(offset.top+port.height/2);
        } else {
          arrowOffset = parseInt(offset.left+port.width/2);
        }

        const SCREEN_PADDING = 10;
        let main = this.$refs.main;

        bpLibs.dom.probeDom(400, ()=>{
          return main.clientWidth > 0;
        }, ()=>{
          if (directionData == 'left' || directionData == 'right') {
            let mainOffset = parseInt(arrowOffset - main.clientHeight/2);
            if (mainOffset < SCREEN_PADDING) {
              mainOffset = SCREEN_PADDING;
            }
            if (mainOffset+main.clientHeight > viewPort.height-SCREEN_PADDING) {
              mainOffset = viewPort.height-SCREEN_PADDING - main.clientHeight;
            }

            this.offsetTop = parseInt(mainOffset + docOffset.top) + 'px';
            this.offsetLeft = directionData == 'right'? offset.left+port.width+6: offset.left-main.clientWidth-6-6;
            this.offsetLeft += docOffset.left;
            this.offsetLeft = parseInt(this.offsetLeft);
            this.offsetLeft += 'px';
            this.offsetArrowLeft = null;
            this.offsetArrowBottom = null;
            this.offsetArrowTop = parseInt(arrowOffset - mainOffset - 6);
            if (this.offsetArrowTop < 10) {
              this.offsetArrowTop = 10;
            }
            else if (this.offsetArrowTop > main.clientHeight-22) {
              this.offsetArrowTop = parseInt(main.clientHeight-22);
            }
            this.offsetArrowTop += 'px';
            this.offsetArrowRight = null;
          }
          else {
            let cw = parseInt(main.clientWidth||50);
            let ch = parseInt(main.clientHeight||50);
  
            if (directionData == 'top') {
              this.offsetTop -= ch + 6;
            }
            this.offsetTop += 'px';

            let mainOffset = parseInt(arrowOffset - cw/2);
            if (mainOffset < SCREEN_PADDING) {
              mainOffset = SCREEN_PADDING;
            }
            if (mainOffset+cw > viewPort.width-SCREEN_PADDING) {
              mainOffset = viewPort.width-SCREEN_PADDING - cw;
            }

            this.offsetLeft = parseInt(mainOffset) + 'px';
            this.offsetArrowLeft = parseInt(arrowOffset - mainOffset) - 6;
            if (this.offsetArrowLeft < 10) {
              this.offsetArrowLeft = 10;
            }
            else if (this.offsetArrowLeft > cw-22) {
              this.offsetArrowLeft = cw-22;
            }
            this.offsetArrowLeft += 'px';
            this.offsetArrowBottom = null;
            this.offsetArrowTop = null;
            this.offsetArrowRight = null;
          }
        });
      },
      _hide(e) {
        let clickEventName = bpLibs.device.browserIsMobile()?'click':'mousedown';
        $('body').off(clickEventName, this._hide);
        this.hide().then(res=>{});
      },
      _hideVisible(ev) {
        $(this.$refs.main).off('mouseleave', this._hideVisible)
        if (ev) {
          let el;
          if (bpLibs.dom.isVueObject(this.bind)) {
            el = this.bind.$el;
          }
          else {
            el = this.bind;
            if (typeof el === 'string') {
              el = $(el)[0];
            }
          }
          let mainOffset = bpLibs.dom.getElementOffset(el);

          // in popover.
          if (ev.clientX >= mainOffset.left - 14
          && ev.clientX <= mainOffset.left + el.offsetWidth + 14
          && ev.clientY >= mainOffset.top - 14
          && ev.clientY <= mainOffset.top + el.offsetHeight + 14) {
            return;
          }

          // if (ev.toElement.isSameNode(el)) {
          //   return;
          // }
        }
        this.visibleReal = false;
      }
    },
  };
</script>