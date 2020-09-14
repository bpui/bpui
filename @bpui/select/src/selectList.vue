<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-11-10
* Desc:
*/
-->
<template>
  <div class="bp-selectList">
    <div class="bp-selectList__scroller">
      <div class="bp-selectList__inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectList',
  props: {},
  data() {
    return {}
  },
  components: {},
  filters: {},
  computed: {},
  watch: {},
  methods: {
  },
  created() {},
  mounted() { }
}
</script>

<style lang="scss" scoped>
  .bp-selectList{
    width: 200px;
    height: 220px;
    &:not(:last-child){
      border-right: 1px solid #dcdfe6;
    }
    &__scroller{
      margin-right: -17px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &__inner{
      width: 200px;
    }
  }
</style>
