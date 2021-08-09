<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

方法:
// 隐藏.
- hide();
// 显示.
- show();

 -->

<template>
  <widget ref="widget" class="bp-loading" :mask="false" :preventEvent="true">
    <div class="bp-loading__main">
      <bp-icon name="loading"/>
    </div>
    <div class="bp-loading__text">
      {{content}}
    </div>
  </widget>
</template>

<script>
  import bpLibs from '@bpui/libs';
  import widget from '../widget.vue';

  export default {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      widget
    },
    data() {
      return {
        content: '',
      }
    },
  };
</script>
