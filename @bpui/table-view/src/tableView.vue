<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
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
- leftWidth: tableViewCellleft 统一宽度.

 -->

<template>
  <div class="bp-tableView">
    <div v-if="tableTitle" class="bp-tableView__title">{{tableTitle}}</div>
    <div class="bp-tableView__cells" :style="tableStyle">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableTitle: String,
      /**
       * @desc: 列表样式
       */
      tableStyle: {
        type: Object,
      },
      /**
       * @desc: tableViewCellleft 统一宽度
       */
      leftWidth: {
        type: String,
      }
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
