<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-27 15:05
* Desc: 
*/
 -->

<template>
  <div>
    <h4>example</h4>
    <bp-checkbox v-model="checked" @change="onChange">chk1</bp-checkbox>
    <bp-checkbox :checked="checked" >chk2</bp-checkbox>
    <bp-checkbox disabled="disabled" >chk3</bp-checkbox>
    <bp-checkbox :checked="true" disabled="disabled" >chk4</bp-checkbox>

    <button @click="checked=false">unchecked chk1</button>
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
      bpCheckbox: bpui.bpCheckbox
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
    @Provide() checked:boolean = true;

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

    onChange(v) {
      console.log(v, this.checked);
    }
  }
</script>

<style lang="scss">
</style>
