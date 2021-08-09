<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/
 -->

<template>
  <bp-dialog :title="title" :showClose="false">
    {{content}}
    <div slot="foot">
      <button @click="$emit('confirm')">{{okText}}</button>
    </div>
  </bp-dialog>
</template>

<script>
  import bpDialog from '../dialog.vue';

  export default {
    components: {
      bpDialog
    },
    data() {
      return {
        title: '',
        content: '',
        okText: '确认'
      };
    },
  };
</script>
