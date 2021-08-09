<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbarContentAlways. 一直会显示在页面上内容.
*/

<tabbarContentAlways>

</tabbarContentAlways>


 -->

<template>
  <div class="febsvue-tabbar-content-always">
    <slot name="default"/>
  </div>
</template>

<script>

  export default {
    props: {
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
.febsvue-tabbar-content-always {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20000;
}
</style>