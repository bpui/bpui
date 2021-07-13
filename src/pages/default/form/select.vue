<template>
  <div>
    <h4>example</h4>

    <h4>single</h4>
    <bpSelect v-model="singleValue" :datasource="singleDatasource"></bpSelect>

    <!-- <h4>single filerable</h4>
    <bpSelect v-model="singleFilerableValue" :datasource="singleFilerableDatasource" filterable></bpSelect> -->

    <!-- <h4>single remote</h4>
    <bpSelect v-model="singleRemoteValue" :datasource="singleRemoteDatasource" remote :remotehandler="singleRemoteHandler"></bpSelect> -->

    <!-- <h4>multiple</h4>
    <bpSelect v-model="multipleValue" :datasource="multipleDatasource" multiple></bpSelect> -->

    <!-- <h4>multiple filerable width filterhandler</h4>
    <bpSelect v-model="multipleFilterValue" :datasource="multipleFilterDatasource" multiple filterable></bpSelect> -->

    <!-- <h4>multiple remote</h4>
    {{multipleRemoteValue}}
    <bpSelect v-model="multipleRemoteValue" :datasource="multipleRemoteDatasource" multiple remote :remotehandler="multipleRemoteHandler"></bpSelect> -->

    <h4>cascader</h4>
    <bpSelect v-model="cascaderValue" :datasource="cascaderDatasource" cascader></bpSelect>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import bpui from 'bpui.js';

@Component({
  name: 'bpSelectExample',
  components: {
    bpSelect: bpui.bpSelect
  }
})
export default class App extends Vue {
  singleValue = '';
  singleDatasource = new Array(10).fill(1).map((o, i) => ({label: `label${i + 1}`, value: `value${i}`, id: i}));

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
    ]}
  ];

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
}
</script>

<style lang="scss">

</style><!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-09-15
* Desc:
*/
-->