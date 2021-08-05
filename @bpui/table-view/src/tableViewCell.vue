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
- showSwipe: 显示出滑动删除按钮.
- hideSwipe: 隐藏滑动删除按钮.

 -->

<template>
  <div v-if="_isTrue(swipeDel)&&!_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_swiped': true,
    'bp-tableView__cell_access': nextArrowReal
    }">
    <div class="bp-tableView__cell_foot">
      <a class="bp-tableView__cell__swiped-btn_warn" href="javascript:" @click="onDelete"></a>
    </div>
    <div class="bp-tableView__cell_head" data-mark="swiped" style="transform: translateX(0px)">
      <div class="bp-tableView__cell">
        <slot name="default"/>
      </div>
    </div>
  </div>
  <div v-else-if="_isTrue(disabled)" :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_disabled': true,
    'bp-tableView__cell_access': nextArrowReal,
  }">
    <slot name="default"/>
  </div>
  <div v-else :class="{
    'bp-tableView__cell': true,
    'bp-tableView__cell_access': nextArrowReal
  }" @click="onClickCell">
    <slot name="default"/>
  </div>
</template>

<script>
  import * as febs from 'febs-browser';

  //
  // event.
  function mobile_onTouchstart_tablecell(event) {
    event = event || window.event;

    var touch;
    if (event.touches) {
      touch = event.touches[0];
    }
    else {
      touch = {clientX: event.clientX, clientY: event.clientY};
    }

    if (touch) {
      var target = event.currentTarget || event.target;
      if (target.getAttribute('data-mark') === 'swiped') {
        $(target).removeClass('bp-tableView__animation');

        target.__tableView_start = true;
        delete target.__tableView_start_scroll;

        target.__tableView_touch = touch.clientX;
        target.__tableView_touch1 = touch.clientY;
        return true;
      }
      else {
        return true;
      }
    }
  }
  function mobile_onTouchmove_tablecell(event) {
    event = event || window.event;

    var touch;
    if (event.touches) {
      touch = event.touches[0];
    }
    else {
      touch = {clientX: event.clientX, clientY: event.clientY};
    }
    
    if (touch) {
      var target = event.currentTarget || event.target;
      if (target.getAttribute('data-mark') === 'swiped') {
        if (!target.__tableView_start)
          return;

        if (!target.__tableView_start_scroll) {
          var span1;
          var span2;

          span1 = Math.abs(target.__tableView_touch-touch.clientX);
          span2 = Math.abs(target.__tableView_touch1-touch.clientY);

          if (span1 > span2) {
            if (span1 > 20) {
              target.__tableView_start_scroll = true;
            }
          } else {
            if (span2 > 30) {
              delete target.__tableView_start;
            }
          }

          return;
        }

        var offset = (target.__tableView_touch-touch.clientX);
        if (offset < 0) offset = 0;
        else if (offset > 64) offset = 64;
        
        target.style['-webkit-transform'] = `translate3d(${-offset}px, 0px, 0px)`;
        target.style['-moz-transform'] = `translate3d(${-offset}px, 0px, 0px)`;
        target.style['-ms-transform'] = `translateX(${-offset}px)`;
        target.style['transform'] = `translate3d(${-offset}px, 0px, 0px)`;

        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
      }
    }

    // event.preventDefault();
  }
  function mobile_onTouchend_tablecell(event) {
    event = event || window.event;

    var touch;
    if (event.changedTouches) {
      touch = event.changedTouches[0];
    }
    else {
      touch = {clientX: event.clientX, clientY: event.clientY};
    }

    if (touch) {
      var target = event.currentTarget || event.target;
      if (target.getAttribute('data-mark') === 'swiped') {
        
        if (!target.__tableView_start_scroll) {
          if (!target.__tableView_swipered)
            $(target).trigger('fakeClick');
          return;
        }

        delete target.__tableView_start;
        delete target.__tableView_start_scroll;

        var swipeSpan = 0;
        swipeSpan = target.__tableView_touch-touch.clientX;

        $(target).addClass('bp-tableView__animation');
        var swipe = swipeSpan > 30;
        if (swipe) {
          target.style['-webkit-transform'] = `translate3d(-64px, 0px, 0px)`;
          target.style['-moz-transform'] = `translate3d(-64px, 0px, 0px)`;
          target.style['-ms-transform'] = `translateX(-64px)`;
          target.style['transform'] = `translate3d(-64px, 0px, 0px)`;
          target.__tableView_swipered = true;

          // 还原.
          var restoreEvent = (event2)=>{
            if (event2 && event && event2.timeStamp !== event.timeStamp) {
              var targets = $('.bp-tableView__cell_swiped');
              targets.each(function(index, ee) {
                var tt = $(ee).children('.bp-tableView__cell_head');
                tt.addClass('bp-tableView__animation');
                tt.css('-webkit-transform', `translate3d(0px, 0px, 0px)`);
                tt.css('-moz-transform', `translate3d(0px, 0px, 0px)`);
                tt.css('-ms-transform',  `translateX(0px)`);
                tt.css('transform', `translate3d(0px, 0px, 0px)`);
                delete tt[0].__tableView_swipered;
              });
            } else {
              $('body').one('click', restoreEvent);
            }
          };
          $('body').one('click', restoreEvent);
        }
        else {
          target.style['-webkit-transform'] = `translate3d(0px, 0px, 0px)`;
          target.style['-moz-transform'] = `translate3d(0px, 0px, 0px)`;
          target.style['-ms-transform'] = `translateX(0px)`;
          target.style['transform'] = `translate3d(0px, 0px, 0px)`;
          delete target.__tableView_swipered;
        }

        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
      }

      if (!target.__tableView_swipered)
        $(target).trigger('fakeClick');
    }
    
  }
  var mobile_onTouchcancel_tablecell = mobile_onTouchend_tablecell;


  export default {
    props: {
      /**
       * @desc: 调整至下一页面图标.
       */
      nextArrow: Boolean,
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
    },
    data() {
      return {
      };
    },
    computed: {
      nextArrowReal: function() {
        return this._isTrue(this.swipeDel)? false: this.nextArrow;
      }
    },
    beforeMount() {
    },
    mounted() {
      let elem = $(this.$el);
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

        this.$bpEventMgr.addEventListener(el, namestart, mobile_onTouchstart_tablecell, true);
        this.$bpEventMgr.addEventListener(el, namemove, mobile_onTouchmove_tablecell, true);
        this.$bpEventMgr.addEventListener(el, nameend, mobile_onTouchend_tablecell, true);
        this.$bpEventMgr.addEventListener(el, namecancel, mobile_onTouchcancel_tablecell, true);
      } // if.


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
      /**
      * @desc: 显示出滑动删除按钮.
      */
      showSwipe: function() {
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
              this.hideSwipe();
            });
          });
        }
      },
      /**
      * @desc: 隐藏滑动删除按钮.
      */
      hideSwipe: function() {
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
            this.hideSwipe();
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

