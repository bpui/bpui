<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
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
  <widget ref="widget" class="bp-toast" :mask="false" :preventEvent="false" :hideBodyScroll="false">
    <div>
      <div v-if="icon" class="bp-toast__main">
        <bp-icon :name="icon"/>
      </div>
      <div class="bp-toast__text">
        {{content}}
      </div>
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
        icon: null,
      }
    },
  };
</script>
