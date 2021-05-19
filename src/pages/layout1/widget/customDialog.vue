<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <bp-dialog :maskClose="true" :showClose="false">
    <div slot="title">hello2</div>
  </bp-dialog>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from "vue-property-decorator";

  import bpui from 'bpui.js';

  @Component({
    components: {
      bpDialog: bpui.bpDialog,
    }
  })
  export default class extends Vue {
  }
</script>

<style lang="scss">
</style>
