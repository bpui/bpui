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
    <h4>group</h4>
    <bp-radio-group v-model="value1">
      <bp-radio value="1">选项1</bp-radio>
      <bp-radio value="2">选项2</bp-radio>
    </bp-radio-group>

    <button @click="value1=1">sel 选项2</button>

    <h4>disabled</h4>
    <bp-radio-group disabled="disabled">
      <bp-radio value="1">选项1</bp-radio>
      <bp-radio value="2">选项2</bp-radio>
    </bp-radio-group>
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
      bpRadio: bpui.bpRadio,
      bpRadioGroup: bpui.bpRadioGroup
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
    @Provide() value1:number = 2;

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
