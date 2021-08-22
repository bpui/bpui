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
    _1
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

    mounted() {
      // @ts-ignore
      this.$bpTabbar.setHidden(false);
      // @ts-ignore
      this.$bpTabbar.setTabBadge(0, 5);
      // @ts-ignore
      this.$bpTabbar.setTabBadge(1, 'new');
      // @ts-ignore
      this.$bpTabbar.setTabBadge(2, 0);
      // @ts-ignore
      this.$bpTabbar.setTabBadge(3, true);
    }
  }
</script>


<style>
</style>
