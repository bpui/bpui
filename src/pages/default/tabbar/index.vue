<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 14:49
* Desc:
*/
 -->

<template>
  <div style="background: #eee">
    <bp-tabbar>
      <bp-tabbar-item>
        <bp-tabbar-item-icon></bp-tabbar-item-icon>
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item>hello2</bp-tabbar-item>
      <bp-tabbar-item>hello3</bp-tabbar-item>
    </bp-tabbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component,
    Prop,
    Watch,
    Provide,
    Emit,
  } from 'vue-property-decorator';
  import {
    State,
    Mutation
  } from 'vuex-class';

  import bpui from 'bpui.js';

  @Component({
    components: {
      ...bpui.bpTabbarComponents,
    }
  })
  export default class extends Vue {
    //
    // lifecycle hook.
    constructor() {
      super();
    }
  }
</script>


<style>
</style>
