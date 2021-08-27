<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbar.
*/

属性:
- tabIndex: 初始选择的tabIndex

方法:
- setHidden 设置是否隐藏.
- isHidden  查询是否隐藏.
- getCurrentTabIndex: 获得当前选中的tab.

 -->

<template>
  <div class="bp-tabbar"
    :class="{
      'bp-tabbar-visible': realValue,
      'bp-tabbar-invisible': !realValue,
      'bp-tabbar-safe-area-inset': unSupportSafeArea
    }"
  >
    <slot name="default"/>
  </div>
</template>

<script>
  import * as utilsSafeArea from './utils/safeArea';
  import * as tabbarInstance from './tabbarInstance';

  export default {
    props: {
      /**
       * @desc: 初始选择的tabIndex
       */
      tabIndex: {
        type: Number,
        default: 0,
      },
      value: {
        type: Boolean,
        default: null,
      },
      routePath: {
        type: String,
        default: null,
      }
    },
    data() {
      return {
        realValue: true,
        unSupportSafeArea: false,
      };
    },
    beforeMount() {
    },
    watch: {
      value(v) {
        this.realValue = (!!v || v === null);
        this.stackValue = this.realValue;
      },
      '$route' (to, from) {
        if (tabbarInstance.isMatchRoute(this.routePath, to.path)) {
          this._restore();
          tabbarInstance.setInstance(this);
          utilsSafeArea.init();

          let subRoute = tabbarInstance.getSubRoute(this.routePath, to.path);
          let children = this.$children;
          for (let i = 0; i < children.length; i++) {
            if (children[i]._routePath == subRoute) {
              this._setCurrentTabIndex(i);
              break;
            }
          } // for.
        }
      }
    },
    created() {
    },
    mounted() {
      if (!tabbarInstance.isMatchRoute(this.routePath, this.$bpLibs.router.currentRoute.path)) {
        $(this.$el).css('display', 'none');
      }

      let isCurTabbar = false;
      tabbarInstance.setInstanceByRoute(this, this.routePath);
      if (tabbarInstance.isMatchRoute(this.routePath, this.$route.path)) {
        tabbarInstance.setInstance(this);
        utilsSafeArea.init();
        isCurTabbar = true;
      } // if.

      this.realValue = (!!this.value || this.value === null);
      this.initValue = this.realValue;

      $('body').append(this.$el);

      // change to cur tab.
      if (isCurTabbar) {
        let childrenObj = this.$children;
        let curTab = -1;
        let routePath = this.routePath;
        if (!routePath) { routePath = '/'; }
        else if (routePath[routePath.length-1] != '/') { routePath += '/'; }
        for (let i = 0; i < childrenObj.length; i++) {
          if (childrenObj[i]._routePath) {
            let r = childrenObj[i]._routePath;
            if (r[0] == '/') {
              r = r.substring(1);
            }
            
            r = routePath + r;

            if (tabbarInstance.isMatchRoute(r, this.$route.path)) {
              curTab = i;
              this._setCurrentTabIndex(curTab);
              return;
            }
          }
        } // for.

        if (curTab == -1) {
          let el = this.$children[this.tabIndex];
          if (el) {
            $(el.$el).removeClass('bp-tabbar__item_on').trigger('click');
          }
        }
      } // if.
    },
    beforeDestroy() {
      $('.bp-tabbar').remove();
    },
    methods: {
      _changeFakeSafeArea(isFakeSafeArea) {
        this.unSupportSafeArea = isFakeSafeArea;
      },
      /**
      * @desc: 设置可见度.
      */
      setHidden: function(isHidden) {
        this.realValue = !!!isHidden;
        this.stackValue = this.realValue;
        this.$emit("input", this.realValue);
      },
      /**
      * @desc: 是否隐藏.
      */
      isHidden: function() { return this.visible; },
      /**
       * @desc: 设置指定tab的badge信息.
       * @param badge {string|true|null} tab上的badge提示.
       *            - string则按文本内容显示.
       *            - number则<=0不显示, 1~99正常显示, 以上显示为99+
       *            - true则显示一个圆点
       *            - null则不显示.
       */
      setTabBadge: function(tabIndex, badge) {
        let el = this.$children[tabIndex];
        if (el) {
          if (typeof badge === 'number' && badge < 0) {
            badge = 0;
          }
          el.badge = badge;
        }
      },
      /**
      * @desc: 当前的选中的tab索引.
      */
      getCurrentTabIndex: function() {
        let el = this.$children;
        for (let i = 0; i < el.length; i++) {
          if ($(el[i].$el).hasClass('bp-tabbar__item_on')) {
            return i;
          }
        }
        return -1;
      },
      /**
      * @desc: 设置当前的选中的tab.
      */
      _setCurrentTabIndex: function(tabIndex) {
        if (this.getCurrentTabIndex() != tabIndex) {
          let el = $(this.$el).children('a');
          let ee = $(el[tabIndex]);
          if (tabIndex >= 0 && tabIndex < el.length) {
            if (!ee.hasClass('bp-tabbar__item_on')) {
              el.removeClass('bp-tabbar__item_on');
              ee.addClass('bp-tabbar__item_on');
            }
          }
        }
      },
      // 还原当前route页的设置.
      _restore: function() {
        if (this.stackValue !== null) {
          this.setHidden(!this.initValue);
          this.stackValue = null;
        }
      },
    },
  };
</script>
