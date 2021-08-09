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
    <bp-checkbox v-model="checked" :checked="checked1" @change="onChange">chk1</bp-checkbox>
    <bp-checkbox v-model="checked" @change="onChange">chk1</bp-checkbox>
    <bp-checkbox :checked="checked" >chk2</bp-checkbox>
    <bp-checkbox disabled="disabled" >chk3</bp-checkbox>
    <bp-checkbox :checked="true" disabled="disabled" >chk4</bp-checkbox>

    <h4>group</h4>
    <bp-checkbox-group v-model="groupValue" :disabled="groupDisable">
      <bp-checkbox>check1</bp-checkbox>
      <bp-checkbox>check2</bp-checkbox>
      <bp-checkbox>check3</bp-checkbox>
    </bp-checkbox-group>

    <button @click="groupDisable=!groupDisable">change disable</button>

    <h4></h4>
    <button @click="checked=false">unchecked chk1</button>
    <button @click="$bpWidget.showToast('checked:'+checked + ' ' + 'checked1:'+checked1)">see check value</button>

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
      bpCheckbox: bpui.bpCheckbox,
      bpCheckboxGroup: bpui.bpCheckboxGroup,
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
    checked:boolean = true;
    checked1:boolean = false;
    groupValue:Array<any> = [{isChecked: true},{isChecked: true},{isChecked: true},];
    groupDisable:boolean = false;

    //
    // computed.
    // get demo() { return xxxx; }

    //
    // watch.
    @Watch('groupValue')
    onGroupValueChanged(val: string, oldVal: string) {
      // @ts-ignore
      this.$bpWidget.showToast(JSON.stringify(val));

      console.log(val);
    }

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
