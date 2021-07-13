<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

<tableViewCell>
  <tableViewCellLeft>这是标题</tableViewCellLeft>
  <tableViewCellRight>右侧的说明文字</tableViewCellRight>
</tableViewCell>

 -->

<template>
  <div class="bp-tableView__cell__right bp-ellipsis">
    <slot>&nbsp;</slot>
  </div>
</template>

<script>

  export default {
    props: {
    },
    data() {
      return {
      };
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
    },
  };
</script>