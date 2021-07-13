<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: xieliangkai
* Date: 2020-02-23 01:00
* Desc: bp-raido-group
*/
 -->

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bpRadioGroup",
  components: {},
  props: {
    value: {},
    disabled: { default: false, type: Boolean }
  },
  data() {
    return {
      bpNodeName: "bpRadioGroup"
    };
  },
  computed: {},
  created() {
    this.$on("handleChange", value => {
      this.$emit("change", value);
    });
    this.$on("handleInput", value => {
      this.$emit("input", value);
    });
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>
