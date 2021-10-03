<template>
  <div>
    <h4>example</h4>

    <h4>custom</h4>
    <bpSelect ref="selectc" @change="onChange" multiple>
      <bp-select-option value="1">
        <div style="align-items: center;display: inline-flex; width:auto"><bp-icon name="loading" width="20px"/>1 dsfds</div>
      </bp-select-option>
      <bpSelectOption value="2">label2</bpSelectOption>
      <bpSelectOption value="3" :disabled="true">3</bpSelectOption>
      <bpSelectOption value="4">label4</bpSelectOption>
      <bpSelectOption value="5">label5</bpSelectOption>
      <bpSelectOption value="6">label6</bpSelectOption>
      <bpSelectOption value="7">label7</bpSelectOption>
      <bpSelectOption value="8">label8</bpSelectOption>
    </bpSelect>
    
    <bpSelect>
      <bp-select-option value="1">
        <div style="align-items: center;display: flex; width:auto"><bp-icon name="loading" width="20px" style="margin-right:5px;"/>1 dsfds</div>
      </bp-select-option>
      <bpSelectOption value="2">
        <div style="align-items: center;display: flex; width:auto"><bp-icon name="loading" width="20px" style="margin-right:5px;"/>1 dsfds</div>
      </bpSelectOption>
      <bpSelectOption value="3" :disabled="true">
        <div style="align-items: center;display: flex; width:auto"><bp-icon name="loading" width="20px" style="margin-right:5px;"/>1 dsfds</div>
      </bpSelectOption>
      <bpSelectOption value="4">label4</bpSelectOption>
      <bpSelectOption value="5">label5</bpSelectOption>
      <bpSelectOption value="6">label6</bpSelectOption>
      <bpSelectOption value="7">label7</bpSelectOption>
      <bpSelectOption value="8">label8</bpSelectOption>
    </bpSelect>

    <h4>multiple</h4>
    <bpSelect ref="select1" v-model="singleValue" multiple :datasource="singleDatasource" @change="onChange"></bpSelect>
    <button @click="singleValue=['value3', 'value1']">修改value</button>
    <button @click="singleDatasource = [
    {label: `label1`, value: `value1`, disabled: false},
    {label: `label2`, value: `value2`, disabled: false},]">修改ds</button>
    <button @click="$bpWidget.showAlert(singleValue)">value</button>
    <button @click="$refs.select1.show()">show</button>
    <button @click="$refs.select1.hide()">hide</button>
    <button @click="$bpWidget.showAlert(JSON.stringify($refs.select1.getSelect(0)))">getSelect</button>

    <h4>single</h4>
    <bpSelect ref="selectSingle" disabled :datasource="singleDatasource"></bpSelect>
    <button @click="singleValue='value3'">修改value</button>
    <button @click="singleDatasource = [
    {label: `label1`, value: `value1`, disabled: false},
    {label: `label2`, value: `value2`, disabled: false},]">修改ds</button>
    <button @click="$refs.selectSingle.show()">show</button>
    <button @click="$refs.selectSingle.hide()">hide</button>
    <button @click="$bpWidget.showAlert(JSON.stringify($refs.selectSingle.getSelect(0)))">getSelect</button>

    <h4>cascader</h4>
    <bpSelect ref="select2" v-model="cascaderValue" multiple :datasource="cascaderDatasource"></bpSelect>
    <button @click="cascaderValue=['value01', 'value011', 'value0111']">修改value</button>
    <button @click="cascaderDatasource = [
    {label: 'lable01', value: 'value01', disabled:true, children: [
      {label: 'lable011', value: 'value011', children: [
        {label: 'lable0111', value: 'value0111'},
        {label: 'lable0112', value: 'value0112'},
      ]}
    ]},
    {label: 'lable02', value: 'value02'},]">修改ds</button>
    <button @click="$bpWidget.showAlert(JSON.stringify(cascaderValue))">value</button>
    <button @click="$refs.select2.show()">show</button>
    <button @click="$refs.select2.hide()">hide</button>
    <button @click="$bpWidget.showAlert(JSON.stringify($refs.select2.getSelect(0)))">getSelect</button>

    <h4>empty</h4>
    <bpSelect ref="select3" :datasource="[]"></bpSelect>

    <h4>PickerDatasource</h4>
    <bpSelect ref="select4" v-model="cascaderValue2" sepText="-" :datasource="PickerDatasource"></bpSelect>
    <button @click="cascaderValue2=['value01', 'value011', 'value0111']">修改value</button>
    <button @click="$bpWidget.showAlert(JSON.stringify(cascaderValue2))">value</button>
    <button @click="$refs.select4.show()">show</button>
    <button @click="$refs.select4.hide()">hide</button>
    

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import bpui from 'bpui.js';

@Component({
  name: 'bpSelectExample',
  components: {
    bpSelect: bpui.bpSelect,
    bpSelectOption: bpui.bpSelectOption
  }
})
export default class App extends Vue {
  JSON = JSON;
  singleValue = '';
  singleDatasource = [
    {label: `label1`, value: `value1`, disabled: false},
    {label: `label2`, value: `value2`, disabled: false},
    {label: `label3`, value: `value3`, disabled: true},
    {label: `label4`, value: `value4`, disabled: false},
    {label: `label5`, value: `value5`, disabled: false},
    {label: `label6`, value: `value6`, disabled: false},
    {label: `label7`, value: `value7`, disabled: false},
    {label: `label8`, value: `value8`, disabled: false},
  ];

  // singleFilerableValue
  singleFilerableValue = '';
  singleFilerableDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));

  singleRemoteValue = 'value1';
  singleRemoteDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));


  multipleValue = ['value2', 'value1'];
  multipleDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));

  multipleFilterValue = [];
  // multipleFilterValue = ['value2', 'value1'];
  multipleFilterDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));

  multipleRemoteValue = ['value1'];
  multipleRemoteDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));



  cascaderValue = ['value01'];
  cascaderValue2 = null;
  cascaderDatasource = [
    {label: 'lable01', value: 'value01', children: [
      {label: 'lable011', value: 'value011', children: [
        {label: 'lable0111', value: 'value0111'},
        {label: 'lable0112', value: 'value0112'},
      ]},
      {label: 'lable012', value: 'value012', children: [
        {label: 'lable0121', value: 'value0121'},
        {label: 'lable0122', value: 'value0122'},
      ]},
    ]},
    {label: 'lable02', value: 'value02', children: [
      {label: 'lable021', value: 'value021', children: [
        {label: 'lable0211', value: 'value0211'},
        {label: 'lable0212', value: 'value0212'},
      ]},
      {label: 'lable022', value: 'value022', children: [
        {label: 'lable0221', value: 'value0221'},
        {label: 'lable0222', value: 'value0222'},
      ]},
    ]},
    {label: 'lable03', value: 'value03'}
  ];

  @Provide() PickerDatasource = new bpui.PickerDateDatasource({
    yearText: ' 年',
    monthText: ' 月',
    dateText: ' 日',
    min: {
      // 默认为 null
      year: 2000,
      // 默认为 0
      month: 2,
      // 默认为 1
      date: 5,
    }
  });

  singleRemoteHandler (keyword) {
    const i = this.singleRemoteDatasource.length;
    const item = {label: `label${i + 1}`, value: `value${i}`, id: i}
    this.singleRemoteDatasource = this.singleRemoteDatasource.concat(item)
    console.log('keyword:', keyword);
  }

  multipleRemoteHandler (keyword) {
    const i = this.multipleRemoteDatasource.length;
    const item = {label: `label${i + 1}`, value: `value${i}`, id: i}
    this.multipleRemoteDatasource = this.multipleRemoteDatasource.concat(item)
    console.log('keyword:', keyword);
  }

  created() {}
  mounted() {}
  onChange(e) {
    this.$bpWidget.showToast(JSON.stringify(e));
  }
}
</script>

<style lang="scss">

</style><!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: qiahao
* Date: 2020-09-15
* Desc:
*/
-->