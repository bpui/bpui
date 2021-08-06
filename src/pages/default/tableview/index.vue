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
    <bp-table-view tableTitle="常规">
      <bp-table-cell>
        <bp-table-cell-left><bp-icon name="heartFill"/></bp-table-cell-left>
        <bp-table-cell-center>center label</bp-table-cell-center>
        <bp-table-cell-right>right label</bp-table-cell-right>
      </bp-table-cell>
      <bp-table-cell nextArrow="true" @click="()=>{$bpWidget.showToast('click')}">
        <bp-table-cell-left></bp-table-cell-left>
        <bp-table-cell-center>nextArrow</bp-table-cell-center>
      </bp-table-cell>
      <bp-table-cell :disabled="true">
        <bp-table-cell-left></bp-table-cell-left>
        <bp-table-cell-center>disabled</bp-table-cell-center>
      </bp-table-cell>
    </bp-table-view>

    <bp-table-view tableTitle="编辑/删除">
      <bp-table-cell :swipeDel="true" @swipeDeleted="()=>{$bpWidget.showToast('swipeDeleted')}">
        <bp-table-cell-left></bp-table-cell-left>
        <bp-table-cell-center>swipeDel</bp-table-cell-center>
        <bp-table-cell-editor slot="editor">
          <button type="info2">标为未读</button>
          <button type="info1">不显示</button>
          <button type="warn">删除</button>
        </bp-table-cell-editor>
      </bp-table-cell>
    </bp-table-view>
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
      ...bpui.bpTableViewComponents,
    }
  })
  export default class extends Vue {

    @Watch("$route")
    onRouteChange(newp: bp.Router, old: bp.Router) {
      console.log("routeChange");
    }

    //
    // event.
    // @Emit()
    // demoEvent(type: string) { }

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number })
    // demo: number = 1

    //
    // data.
    @Provide() demo: number = 1;
    @Provide() data: number[] = [1, 2, 3, 4];

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
      // this.$router.getMatchedComponents()
    }

    created() {
      console.log('created: navbar');
    }

    mounted() {
      console.log('mounted: navbar');
    }

    beforeDestroy() {
      console.log('beforeDestroy: navbar');
      console.log('');
    }

    viewAppear(popData: any) {
      console.log('viewAppear: navbar ' + popData);
      (this as any).$navbar.setBarInfo({
        title: 'navbar',
        hidden: false
      });
      // this.$navbar.setBarLeftItem({icon: 'loading'});
    }

    viewDisappear() {
      console.log('viewDisappear: navbar');
    }

    pushNav() {
      (this as any).$navbar.push('./page2');
    }
  }
</script>


<style>
</style>
