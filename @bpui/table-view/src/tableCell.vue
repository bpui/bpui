<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

<tableViewCell :nextArrow="true" @click="api.alert.show('你点击了cell');">
  <tableViewCellLeft><img src=""></tableViewCellLeft>
  <tableViewCellCenter>标题文字</tableViewCellCenter>
  <tableViewCellRight>说明文字</tableViewCellRight>
</tableViewCell>

属性:
- nextArrow: 是否有跳转下个页面图标. (滑动删除开启时无效)
- disabled: 是否disabled.

事件:
- click: 点击事件.

方法:
- showEditor: 显示出滑动删除按钮.
- hideEditor: 隐藏滑动删除按钮.
- animateDelete: ()=>Promise<void> 显示删除动画.

 -->

<template>
  <div v-if="(!!$slots.editor) &&!_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_swiped': true,
    }" :platform="platform" ref="editorCellMain">
    <div v-if="platform=='ios'" class="bp-tableView__cell_foot" ref="editor">
      <slot name="editor"/>
    </div>
    <div v-if="platform=='ios'" class="bp-tableView__cell_head" ref="editorCell" data-mark="swiped" style="transform: translateX(0px)">
      <div class="bp-tableView__cell" ref="domTouch">
        <slot name="default"/>
      </div>
    </div>
    <slot v-if="platform!='ios'" name="default"/>
    <bp-popover v-if="platform!='ios'" :visible.sync="popoverVisible" class="bp-popover__row bp-tableView_popover__main" :bind="$refs.editorCellMain" :trigger="'long-press'">
      <slot name="editor"/>
    </bp-popover>
  </div>
  <div v-else-if="_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_disabled': true,
  }" ref="domTouch">
    <slot name="default"/>
    <div class="bp-tableView__cell_next" >
      <bp-icon v-if="nextArrowReal" name="bp-tableView_next"/>
    </div>
  </div>
  <div v-else :class="{
    'bp-tableView__cell': true,
  }" @click="onClickCell" ref="domTouch">
    <slot name="default"/>
    <div class="bp-tableView__cell_next" >
      <bp-icon v-if="nextArrowReal" name="bp-tableView_next"/>
    </div>
  </div>
</template>

<script>
  import * as febs from 'febs-browser';
  import bpLibs from '@bpui/libs';
  import bpPopover from '@bpui/popover';
  import * as iosEvent from './event.ios';

  export default {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      bpPopover: bpPopover.bpPopover,
    },
    props: {
      /**
       * @desc: 调整至下一页面图标.
       */
      nextArrow: {
        validator: function (value) {
          return !value || typeof value === 'boolean' || value === 'true' || value === 'false';
        }
      },
      /**
      * @desc: 是否disabled.
      */
      disabled: {
        validator: function (value) {
          return !value || typeof value === 'boolean' || value === 'true' || value === 'false';
        }
      },
      _platform: String,
    },
    data() {
      return {
        platform: null,
        popoverVisible: false,
      };
    },
    computed: {
      nextArrowReal: function() {
        return this.$slots.editor? false: this._isTrue(this.nextArrow);
      }
    },
    beforeMount() {
      this.platform = this._platform;
      if (!this.platform) {
        if (!febs.utils.browserIsMobile()) {
          this.platform = 'tablet';
        }
        else if (febs.utils.browserIsIOS()) {
          this.platform = 'ios';
        }
        else {
          this.platform = 'android';
        }
      }
    },
    mounted() {
      let elem = $(this.$el);

      if (this.$listeners.click) {
        elem.css('cursor', 'pointer');
      }

      if (this.platform == 'ios') {
        this._initIOS();
      } else {
        this._initAndroid();
      }

      // touch.
      let domTouch = this.$refs.domTouch || this.$refs.editorCellMain;
      this.$bpEventMgr.addEventListener(domTouch, 'touchstart', (ev)=>{
        let target = ev.currentTarget || ev.target;
        $(target).attr('data-touch', 'touch');
      }, true);
      this.$bpEventMgr.addEventListener(domTouch, 'touchend', (ev)=>{
        let target = ev.currentTarget || ev.target;
        $(target).attr('data-touch', 'end');
      }, true);
      this.$bpEventMgr.addEventListener(domTouch, 'touchcancel', (ev)=>{
        let target = ev.currentTarget || ev.target;
        $(target).attr('data-touch', 'end');
      }, true);

      // click radiobtn & checkbox.
      elem = $(domTouch);
      let iconEl = elem.children().children('.bp-checkbox');
      if (iconEl[0]) {
        elem.click((event)=>{
          var icons = $(event.currentTarget).children().children('.bp-checkbox');
          icons = icons.children().children('input');
          if (icons[0] && !icons[0].disabled) {
            icons[0].checked = !icons[0].checked;
            icons.trigger('change');
          }
        });
      }
      iconEl = elem.children().children('.bp-switch');
      if (iconEl[0]) {
        elem.click((event)=>{
          var icons = $(event.currentTarget).children().children('.bp-switch');
          icons = icons.children().children('input');
          if (icons[0] && !icons[0].disabled) {
            icons[0].checked = !icons[0].checked;
            icons.trigger('change');
          }
        });
      }
      iconEl = elem.children().children('.bp-input');
      if (iconEl[0]) {
        elem.click((event)=>{
          var icons = $(event.currentTarget).children().children('.bp-input');
          icons = icons.children('input');
          if (icons[0] && !icons[0].disabled) {
            icons[0].focus();
          }
        });
      }
    },
    methods: {
      _isTrue(v) {
        return v ? (v === 'true' || v === true) : false;
      },
      _initIOS() {
        if (this.$refs.editor) {
          let elem = $(this.$el);
          let editor = $(this.$refs.editor);
          let editors = editor.children('.bp-tableView__cell__editor')[0];
          $(editors).css("padding-left", "40px");
          let ww = editors.clientWidth - 40;
          $(this.$refs.editorCell).attr('data-swipedw', ww);
          // 设置背景色.
          editor.children('.bp-tableView__cell__editor').css('background-color', window.getComputedStyle($(editors).children()[0]).backgroundColor);

          let el = elem.children('.bp-tableView__cell_head')[0];
          let namestart, namemove, nameend, namecancel;
          if (typeof el.ontouchstart !== 'undefined') {
            namestart = 'touchstart';
            namemove = 'touchmove';
            nameend = 'touchend';
            namecancel = 'touchcancel';
          } else {
            namestart = 'mousedown';
            namemove = 'mousemove';
            nameend = 'mouseup';
            namecancel = 'mouseout';
          }

          // 点击事件在swiper事件之后.
          $(el).on('fakeClick', (event)=>{return this.onClickCell(event);});

          this.$bpEventMgr.addEventListener(el, namestart, iosEvent.mobile_onTouchstart_tablecell, true);
          this.$bpEventMgr.addEventListener(el, namemove, iosEvent.mobile_onTouchmove_tablecell, true);
          this.$bpEventMgr.addEventListener(el, nameend, iosEvent.mobile_onTouchend_tablecell, true);
          this.$bpEventMgr.addEventListener(el, namecancel, iosEvent.mobile_onTouchcancel_tablecell, true);
        } // if.
      },
      _initAndroid() {

      },
      /**
      * @desc: 显示出滑动删除按钮.
      */
      showEditor: function() {
        if (this.$slots.editor) {

          if (this.platform == 'ios') {
            let w = Number($(this.$refs.editorCell).attr('data-swipedw'));
            w = Number.isNaN(w)?64:Math.floor(w);
            let target = $(this.$el).children('.bp-tableView__cell_head');
            target.addClass('bp-tableView__animation');
            target.css('-webkit-transform', `translate3d(-${w}px, 0px, 0px)`);
            target.css('-moz-transform', `translate3d(-${w}px, 0px, 0px)`);
            target.css('-ms-transform',  `translateX(-${w}px)`);
            target.css('transform', `translate3d(-${w}px, 0px, 0px)`);
            target[0].__tableView_swipered = true;

            // 还原.
            febs.utils.sleep(50)
            .then(()=>{
              $('body').one('click', ()=>{
                this.hideEditor();
              });
            });
          }
          else {
            this.popoverVisible = true;
          }
        }
      },
      /**
      * @desc: 隐藏滑动删除按钮.
      */
      hideEditor: function() {
        if (this.$slots.editor) {
          if (this.platform == 'ios') {
            let target = $(this.$el).children('.bp-tableView__cell_head');
            target.addClass('bp-tableView__animation');
            target.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
            target.css('-moz-transform', 'translate3d(0px, 0px, 0px)');
            target.css('-ms-transform',  'translateX(0px)');
            target.css('transform', 'translate3d(0px, 0px, 0px)');
            delete target[0].__tableView_swipered;
          }
          else {
            this.popoverVisible = false;
          }
        }
      },

      /**
      * @desc: 点击了滑动删除.
      */
      animateDelete: function() {
        this.hideEditor();

        let el = $(this.$el);
        el.css('height', el[0].clientHeight+'px')
          .removeClass('bp-tableView__animation')
          .addClass('bp-tableView__animation-fast');

        bpLibs.device.vibrate(20);

        return febs.utils.sleep(10)
          .then(()=>{
            el.css('height', '0px'); 
            el.css('left', '-' + this.$el.clientWidth + 'px');
            return febs.utils.sleep(200);
          });
      },

      /**
      * @desc: 点击事件.
      */
      onClickCell: function(event) {
        this.$emit('click', event);
      }
    },
  };
</script>

