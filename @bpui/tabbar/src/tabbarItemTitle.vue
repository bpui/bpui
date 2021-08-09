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

 -->

<template>
  <p class="weui-tabbar__label febsvue-tabbar-item-title"><slot name="default"/></p>
</template>

<script>

  export default {
    props: {
      tableTitle: String,
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

</style>