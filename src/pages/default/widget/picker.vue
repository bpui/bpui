<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <div style="height:1000px;">
    <!-- custom picker -->
    <h4>custom picker</h4>
    <button @click="visible1=true">show1</button>
    <button @click="()=>{visible1=true; value1=2;}">show1</button>
    <button @click="visible2=true">show2</button>
    <button @click="visible3=true">show phone style</button>
 
    <!-- picker1 -->
    <bp-picker ref="picker1" v-model="value1" :visible.sync="visible1" @confirm="onConfirm1"  @change="onChange1" :datasource="[{label:'1',value:1}, {label:'2',value:2}, {label:'2',value:2}, {label:'2',value:2}, {label:'2',value:2}]" />
    
    <bp-picker forcePhoneStyle="true" v-model="value1" :visible.sync="visible3" @confirm="onConfirm1"  @change="onChange1" :datasource="[{label:'1',value:1}, {label:'2',value:2}, {label:'2',value:2}, {label:'2',value:2}, {label:'2',value:2}]" />

    <!-- picker2 -->
    <!-- <bp-picker ref="picker2" v-model="value2" :visible.sync="visible2" @confirm="onConfirm2" @change="onChange2" :datasource="[{label:'1',value:1, children:[{label:'22',value:2}]}, {label:'2',value:2}, {label:'2',value:2}]" /> -->
    <bp-picker ref="picker2" v-model="value2" :visible.sync="visible2" @confirm="onConfirm2" @change="onChange2" :datasource="PickerTimeDatasource" />
    <!-- <bp-picker ref="picker2" v-model="value2" :visible.sync="visible2" @confirm="onConfirm2" @change="onChange2" :datasource="PickerDateDatasource" /> -->

    <button @click="value2=[4,2,2]">set time</button>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Watch,
    Provide,
    Emit,
    Ref
  } from "vue-property-decorator";
  import {
    State,
    Mutation
  } from "vuex-class";

  import bpui from 'bpui.js';

  @Component({
    components: {
      bpPicker: bpui.bpPicker as any,
    }
  })
  export default class extends Vue {
    
    @Ref()
    picker1: bp.Picker;

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
    @Provide() value1 = null;
    @Provide() value2 = [];
    @Provide() PickerTimeDatasource = new bpui.PickerTimeDatasource({hourText:'h', minuteText:'m', min:{hour:3, minute:1, second:5}, max:{hour:5, minute:2, second:2}});
    @Provide() PickerDateDatasource = new bpui.PickerDateDatasource({yearText:'n', min:{year:2000, month:10, date: 5}, max:{year:2020, month:8, date: 10}});
    
 
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
      this.$timer.sleep(10000).then(()=>{
        // this.value1 = 2;
        // this.$refs.picker1.setSelect(0, 2, false);
      });
    }

    onConfirm2() {
      console.log('confirm', this.value2);
      // @ts-ignore
      this.$bpWidget.showAlert( JSON.stringify(this.value2));
    }
    onChange2(value) {
      console.log('change', value);
      // @ts-ignore
      // this.$bpWidget.showToast(JSON.stringify(value));
    }
    onConfirm1() {
      console.log('confirm', this.value1, this.picker1.getValue());
      // @ts-ignore
      this.$bpWidget.showAlert(this.value1);
    }
    onChange1(value) {
      console.log('change', value);
      // @ts-ignore
      this.$bpWidget.showToast(value);
    }
  }
</script>

<style lang="scss">
</style>
