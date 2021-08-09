<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 显示一个tableview.
*/

<tableView tableTitle="标题">
  <tableViewCell></tableViewCell>
</tableView>

属性
- tableTitle: table标题.
- tableStyle: 列表样式.

 -->

<template>
  <div class="bp-tableView">
    <div class="bp-tableView__title">{{tableTitle}}&nbsp;</div>
    <div class="bp-tableView__cells" :style="tableStyle">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableTitle: {
        type: String,
      },
      /**
       * @desc: 列表样式
       */
      tableStyle: {
        type: Object,
      },
    },
    data() {
      return {
      };
    },
    beforeMount() {},
    mounted() {
    },
    methods: {},
  };
</script>
