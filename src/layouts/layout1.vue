<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 10:35
* Desc:
*/
 -->

<template>
  <div>
    <div style="height:70px;background:#eee;">layout1</div>
    <div>
      <navbarView pageClass="layout1-navbarView" class="container"></navbarView>
    </div>

    <bp-tabbar routePath="/tabbar">
      <bp-tabbar-item routePath="/_1">
        <bp-icon name="heartFill"></bp-icon>
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item routePath="/_2">
        <bp-icon active="true" name="heartFill"></bp-icon>
        <bp-icon active="false" name="heart"></bp-icon>
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item routePath="/_3">
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item routePath="/_4">
        <bp-icon active="true" name="heartFill"></bp-icon>
        <bp-icon active="false" name="heart"></bp-icon>
      </bp-tabbar-item>
      <bp-tabbar-item @click.stop>
        <bp-icon name="heartFill"></bp-icon>
      </bp-tabbar-item>
    </bp-tabbar>

    <bp-tabbar routePath="/tabbar2">
      <bp-tabbar-item routePath="/_1">
        <bp-icon name="heartFill"></bp-icon>
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item routePath="/_2">
        <bp-icon active="true" name="heartFill"></bp-icon>
        <bp-icon active="false" name="heart"></bp-icon>
        <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
      </bp-tabbar-item>
      <bp-tabbar-item @click.stop="$router.push('/tabbar')">
        <bp-tabbar-item-title>to tabbar1</bp-tabbar-item-title>
      </bp-tabbar-item>
    </bp-tabbar>
  </div>
</template>

<script lang="ts">
import bpui from 'bpui.js';

import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  components: {
    navbarView: bpui.bpNavbarView,
    ...bpui.bpTabbarComponents,
  },
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {
  }

}
</script>

<style lang="scss">
</style>
