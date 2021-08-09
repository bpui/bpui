<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbarItem.
*/

<tabbarItem>
  <tabbarItemIcon><svg/></tabbarItemIcon>
  <tabbarItemTitle>个人中心</tabbarItemTitle>
</tabbarItem>


属性:
- actived: 是否是actived状态下的图标.

 -->

<template>
  <div :class="'weui-tabbar__icon febsvue-tabbar__icon' + (actived===true?' febsvue-tabbar-active-icon':(actived===false?' febsvue-tabbar-inactive-icon':'')) + ' febsvue-tabbar-item-icon'">
    <slot name="default"/>
  </div>
</template>

<script>

  export default {
    props: {
      actived: {
        type: Boolean,
        default: null,
      }
    },
    data() {
      return {
      };
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style lang="scss">

.febsvue-tabbar__icon {
  position: relative !important;
  svg, img {
    width: 27px;
    height: 27px;
  }
}

</style>