<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <div style="height:1500px;max-width:1500px;">
    <!-- custom actionsheet -->
    <h4>custom popover</h4>
    <button ref="btn1">
      hover
    </button>
    <bp-popover :bind="$refs.btn1" trigger="hover" >
      <span style="width:100px">
        hello sfsdf 
      </span>
    </bp-popover>
    
    <button ref="btn2">
      click
    </button>
    <bp-popover :bind="$refs.btn2" trigger="click">
      <span style="width:100px">
        hellosd fsd sdf dsf dsf s
      </span>
    </bp-popover>
    <bp-popover :bind="$refs.btn2" trigger="long-press">
      <span style="width:100px">
        long-press
      </span>
    </bp-popover>

    <button ref="btn3">
      custom
    </button>
    <bp-popover :bind="$refs.btn3" direction="right" trigger="click">
      <div class="bp-popover__cell">cell 1</div>
      <div class="bp-popover__cell">cell 2</div>
      <div class="bp-popover__cell">cell 3</div>
      <div class="bp-popover__cell">cell 4</div>
      <div class="bp-popover__cellWarn">cell warn</div>
    </bp-popover>


    <button ref="btn4">
      custom row
    </button>
    <bp-popover class="bp-popover__row" :bind="$refs.btn4" trigger="click">
      <div class="bp-popover__cell">cell 1</div>
      <div class="bp-popover__cell">cell 2</div>
      <div class="bp-popover__cell">cell 3</div>
      <div class="bp-popover__cell">cell 4</div>
      <div class="bp-popover__cellWarn">cell warn</div>
    </bp-popover>

 

    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    <div style="width:100px;">
      parent
      <bp-popover direction="right" trigger="hover">
        <div class="bp-popover__cell">cell 1</div>
        <div class="bp-popover__cell">cell 2</div>
        <div class="bp-popover__cell">cell 3</div>
        <div class="bp-popover__cell">cell 4</div>
        <div class="bp-popover__cellWarn">cell warn</div>
      </bp-popover>
    </div>
    

  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Watch,
    Provide,
    Emit
  } from "vue-property-decorator";
  import {
    State,
    Mutation
  } from "vuex-class";

  import bpui from 'bpui.js';

  @Component({
    components: {
      bpPopover: bpui.bpPopover as any,
    }
  })
  export default class extends Vue {
    //
    // event.
    @Emit()
    demoEvent(type: string) {}

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number }) demo: number;

    //
    // data.
    @Provide() visible1:boolean = false;
    @Provide() visible2:boolean = false;
    @Provide() popoverBind2:any = null;

    //
    // computed.
    // get demo() { return xxxx; }

    // //
    // // watch.
    // @Watch('visible1')
    // onChildChanged(val: string, oldVal: string) { console.log(val); }

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
