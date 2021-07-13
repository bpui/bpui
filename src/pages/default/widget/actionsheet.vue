<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <div style="height:1000px;">
    <!-- custom actionsheet -->
    <h4>custom actionsheet</h4>
    <button @click="visible1=true">show1</button>
    <button @click="visible2=true">show custom</button>
    <button @click="visible3=true">show phone style</button>

    <!-- actionsheet -->
    <bp-actionsheet :visible.sync="visible1">
      <div class="bp-actionsheet__group">
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast({content:1})">ddd</div>
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast(2)">ddd</div>
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast(3)">ddd</div>
      </div>
    </bp-actionsheet>


    <bp-actionsheet :visible.sync="visible3" forcePhoneStyle="true">
      <div class="bp-actionsheet__group">
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast({content:1})">ddd</div>
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast(2)">ddd</div>
        <div class="bp-actionsheet__cell" @click="$bpWidget.showToast(3)">ddd</div>
      </div>
      <div class="bp-actionsheet__group">
        <div class="bp-actionsheet__cellWarn" @click="visible1=false">ddd</div>
      </div>
    </bp-actionsheet>

    

    <!-- actionsheet -->
    <bp-actionsheet :visible.sync="visible2" :pageStyle="{height:'200px',overflow: 'auto',display:'block'}">
      <div style="height:300px; width:100%; background:#fff;">
        df
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </div>
    </bp-actionsheet>
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
      bpActionsheet: bpui.bpActionsheet as any,
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
    @Provide() visible3:boolean = false;

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
