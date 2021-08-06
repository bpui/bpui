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
- swipeDel: 滑动删除.
- disabled: 是否disabled.

事件:
- click: 点击事件.
- swipeDeleted: 被滑动删除了. (删除后, 应该更新cell的datasource, 否则cell组件一直存在)

方法:
- showEditor: 显示出滑动删除按钮.
- hideEditor: 隐藏滑动删除按钮.

 -->

<template>
  <div v-if="(!!$slots.editor) &&!_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_swiped': true,
    }" :platform="platform" ref="editorCell">
    <div v-if="platform=='ios'" class="bp-tableView__cell_foot" ref="editor">
      <slot name="editor"/>
    </div>
    <div v-if="platform=='ios'" class="bp-tableView__cell_head" ref="editorCell" data-mark="swiped" style="transform: translateX(0px)">
      <div class="bp-tableView__cell">
        <slot name="default"/>
      </div>
    </div>
    <slot v-if="platform!='ios'" name="default"/>
    <bp-popover v-if="platform!='ios'" class="bp-popover__row bp-tableView_popover__main" :bind="$refs.editorCell" :trigger="'long-press'">
      <slot name="editor"/>
    </bp-popover>
  </div>
  <div v-else-if="_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_disabled': true,
  }">
    <slot name="default"/>
    <div class="bp-tableView__cell_next" >
      <bp-icon v-if="nextArrowReal" name="bp-tableView_next"/>
    </div>
  </div>
  <div v-else :class="{
    'bp-tableView__cell': true,
  }" @click="onClickCell">
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
       * @desc: 是否支持滑动删除.
       */
      swipeDel: {
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
      };
    },
    computed: {
      nextArrowReal: function() {
        return this._isTrue(this.swipeDel)? false: this._isTrue(this.nextArrow);
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

      // click radiobtn & checkbox.
      let iconEl = elem.children().children('.febsui-checkbox');
      if (iconEl[0]) {
        elem.click((event)=>{
          var icons = $(event.currentTarget).children().children('.febsui-checkbox');
          icons = icons.children('input');
          if (icons[0] && !icons[0].disabled) {
            icons[0].checked = !icons[0].checked;
            icons.trigger('change');
          }
        });
      }
      iconEl = elem.children().children('.febsui-radio');
      if (iconEl[0]) {
        elem.click((event)=>{
          var icons = $(event.currentTarget).children().children('.febsui-radio');
          icons = icons.children('input');
          if (icons[0] && !icons[0].disabled) {
            icons[0].checked = true;
            icons.trigger('change');
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
          let editor = $(this.$refs.editor);
          let editors = editor.children('.bp-tableView__cell__editor')[0];
          let ww = editors.clientWidth;
          $(this.$refs.editorCell).attr('data-swipedw', ww);
          // 设置背景色.
          editor.css('background-color', window.getComputedStyle($(editors).children()[0]).backgroundColor);
        }

        //
        // swiper.
        if (this._isTrue(this.swipeDel)) {
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
        if (this._isTrue(this.swipeDel)) {
          let target = $(this.$el).children('.bp-tableView__cell_head');
          target.addClass('bp-tableView__animation');
          target.css('-webkit-transform', 'translate3d(-64px, 0px, 0px)');
          target.css('-moz-transform', 'translate3d(-64px, 0px, 0px)');
          target.css('-ms-transform',  'translateX(-64px)');
          target.css('transform', 'translate3d(-64px, 0px, 0px)');
          target[0].__tableView_swipered = true;

          // 还原.
          febs.utils.sleep(50)
          .then(()=>{
            $('body').one('click', ()=>{
              this.hideEditor();
            });
          });
        }
      },
      /**
      * @desc: 隐藏滑动删除按钮.
      */
      hideEditor: function() {
        if (this._isTrue(this.swipeDel)) {
          let target = $(this.$el).children('.bp-tableView__cell_head');
          target.addClass('bp-tableView__animation');
          target.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
          target.css('-moz-transform', 'translate3d(0px, 0px, 0px)');
          target.css('-ms-transform',  'translateX(0px)');
          target.css('transform', 'translate3d(0px, 0px, 0px)');
          delete target[0].__tableView_swipered;
        }
      },
      /**
      * @desc: 点击了滑动删除.
      */
      onDelete: function(event) {

        this.$emit('swipeDeleted', event, (del)=>{
          if (!del) {
            this.hideEditor();
          }
          else {
            let el = $(this.$el);
            el.css('height', el[0].offsetHeight+'px');

            febs.utils.sleep(10)
            .then(()=>{
              el.addClass('bp-tableView__animation-fast')
                .css('height', '0px'); 
              
              // el2.style['-webkit-transform'] = `translate3d(-400px, 0px, 0px)`;
              // el2.style['-moz-transform'] = `translate3d(-400px, 0px, 0px)`;
              // el2.style['-ms-transform'] = `translateX(-400px)`;
              // el2.style['transform'] = `translate3d(-400px, 0px, 0px)`;
              
              return febs.utils.sleep(200);
            }); 
          } // if..else.
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

