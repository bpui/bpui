<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbar.
*/

<tabbar>
  <tabbarItem>  // 选中及非选中使用同一个图标.
    <tabbarItemIcon><svg/></tabbarItemIcon>
    <tabbarItemTitle>通讯录</tabbarItemTitle>
  </tabbarItem>
  <tabbarItem>  // 选中及非选中使用不同图标.
    <tabbarItemIcon :actived="true"><svg/></tabbarItemIcon>
    <tabbarItemIcon :actived="false"><svg/></tabbarItemIcon>
    <tabbarItemTitle>发现</tabbarItemTitle>
  </tabbarItem>
  <tabbarItem>
    <tabbarItemIcon><svg/></tabbarItemIcon>
    <tabbarItemTitle>我</tabbarItemTitle>
  </tabbarItem>
</tabbar>

属性:
- tintColor: 选中的文本颜色.
- unselectedTintColor: 未选中的文本颜色.
- initTabIndex: 初始选择的tabIndex

事件:
- hiddenChanged: 可视化改变.
- tabChanged: tab改变. (event, oldIndex, newIndex, noPage)=>{}

方法:
- setHidden 设置是否隐藏.
- isHidden  查询是否隐藏.
- getCurrentTabIndex: 获得当前选中的tab.
- setCurrentTabIndex: 设置当前选中的tab (将触发tabChanged事件).

 -->

<template>
  <div class="bp-tabbar">
    <slot name="default"/>
  </div>
</template>

<script>
  import * as febs from 'febs';

  export default {
    props: {
      /**
       * @desc: 初始选择的tabIndex
       */
      initTabIndex: {
        type: Number,
      }
    },
    data() {
      return {
      };
    },
    beforeMount() {
    },
    mounted() {
      let el = $(this.$el).children('a');
      el.each((index, ee)=>{
        ee = $(ee);
        ee.attr('data-index', index);
        ee.on('click', (event)=>{
          if (!ee.hasClass('weui-bar__item_on')) {
            // noPage.
            if (ee.attr('data-noPage') == 1) {
              return;
            } // if.

            let oldIndex = this.getCurrentTabIndex();
            el.removeClass('weui-bar__item_on');
            // el.children('.febsvue-tabbar-active-icon').addClass('febsui-invisible').removeClass('febsui-visible');
            // el.children('.febsvue-tabbar-inactive-icon').addClass('febsui-visible').removeClass('febsui-invisible');
            ee.addClass('weui-bar__item_on');
            // ee.children('.febsvue-tabbar-active-icon').addClass('febsui-visible').removeClass('febsui-invisible');
            // ee.children('.febsvue-tabbar-inactive-icon').addClass('febsui-invisible').removeClass('febsui-visible');
            
            this.$emit('tabChanged', event, oldIndex, parseInt(ee.attr('data-index')));
          }
        });
        if (index == this.initTabIndex) {
          ee.addClass('weui-bar__item_on');
        }
      });
    },
    methods: {
      /**
      * @desc: 设置可见度.
      */
      setHidden: function(isHidden) { 
        if (this.isVisible === null || isHidden == this.isVisible) { this.isVisible = !isHidden; this.$emit('hiddenChanged'); } },
      /**
      * @desc: 是否隐藏.
      */
      isHidden: function() { return this.isVisible===null? this.hidden: !this.isVisible; },
      /**
      * @desc: 当前的选中的tab索引.
      */
      getCurrentTabIndex: function() {
        let el = $(this.$el).children('.weui-tabbar__item');
        for (let i = 0; i < el.length; i++) {
          if ($(el[i]).hasClass('weui-bar__item_on')) {
            return i;
          }
        }
        return -1;
      },
      /**
      * @desc: 设置当前的选中的tab.
      */
      setCurrentTabIndex: function(tabIndex, trigger = true) {
        if (this.getCurrentTabIndex() != tabIndex) {
          let el = $(this.$el).children('a');
          let ee = $(el[tabIndex]);
          if (tabIndex >= 0 && tabIndex < el.length) {
            if (trigger) {
              ee.click();
            } else {
              if (!ee.hasClass('weui-bar__item_on')) {
                el.removeClass('weui-bar__item_on');
                ee.addClass('weui-bar__item_on');
              }
            }
          }
        }
      }
    },
  };
</script>

<style lang="scss">
  .febsvue-tabbar {
    position: fixed;
    height: 53px;

    .febsvue-tabbar-inactive-icon {
      display: inline-block;
    }
    .febsvue-tabbar-active-icon {
      display: none;
    }

    .weui-tabbar__item.weui-bar__item_on {
      .febsvue-tabbar-active-icon {
        display: inline-block;
      }
      .febsvue-tabbar-inactive-icon {
        display: none;
      }
    }

    @media only screen and(min-width :768px) {
      .febsvue-tabbar-item {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .febsvue-tabbar-item-icon {
          margin: 0 8px 0 0;
        }
        .febsvue-tabbar-item-title {
          font-size: 14px;
        }
      }
    }
  }


</style>