<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-11-10
* Desc:
*/
-->
<template>
  <div class="bp-selectDropdown" ref="popper" v-show="value">
    <slot></slot>
  </div>
</template>

<script>
import popperMixin from './popper/popperMixin.js'
export default {
  name: 'SelectDropdown',
  props: {},
  data() {
    return {}
  },
  mixins: [popperMixin],
  components: {},
  filters: {},
  computed: {},
  watch: {},
  methods: {
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.referenceElm = this.$parent.$refs.reference.$el || this.$parent.$el;
      this.popperElm = this.$refs.popper;
    })
  }
}
</script>

<style lang="scss" scoped>
  .bp-selectDropdown{
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
  }
</style>
