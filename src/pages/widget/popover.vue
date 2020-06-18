<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
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
      bpPopover: bpui.bpPopover,
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
