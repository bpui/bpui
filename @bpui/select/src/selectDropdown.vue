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
    <div class="bp-selectDropdown__arrow" :style="{
      }"></div>
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

