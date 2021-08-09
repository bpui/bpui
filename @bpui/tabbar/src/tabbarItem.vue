<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbarItem.
*/

<tabbarItem>
  <div slot="icon"><svg></div>
  <div slot="title">个人中心</div>
</tabbarItem>

 -->

<template>
  <a href="javascript:;" :data-noPage="noPage?1:null" @click="onClick" class="weui-tabbar__item febsvue-tabbar-item">
    <slot name="default"/>
  </a>
</template>

<script>

  export default {
    props: {
      noPage: {
        type: Boolean,
        default: false,
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
      onClick() {
        if (this.noPage) {
          this.$emit('click');
        }
      }
    },
  };
</script>

<style lang="scss">
.febsvue-tabbar-item {
  position: relative;
}
</style>