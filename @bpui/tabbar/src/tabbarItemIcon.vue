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
  <div :class="{
    'bp-tabbar__item__icon': true,
    'bp-tabbar__item__icon_active': actived,
    }">
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