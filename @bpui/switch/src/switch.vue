<!--
/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: xieliangkai
* Date: 2020-02-22 00:24
* Desc:  bp-switch
*/
 -->


<template>
  <label class="bp-switch" :class="{
      'bp-switch__disabled':isDisabled
    }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span class="bp-switch__input">
      <span
        class="bp-switch__inner"
        :class="[hovering?'bp-switch__inner_hover':'',isChecked?'bp-switch__inner_checked':'',
       ]"
      ></span>
      <input
        type="checkbox"
        class="bp-switch__original"
        :checked="checked"
        :disabled="isDisabled"
        @change="handelChange"
        v-bind="$attrs"
      />
    </span>
    <span class="bp-switch__label"><slot name="default" /></span>
  </label>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    checked: { default: false },
    disabled: { default: false, type: Boolean },
  },
  model: {
    prop: "checked",
    event: "change"
  },
  data() {
    return {
      hovering: false,
      isChecked: false
    };
  },
  computed: {
    isDisabled() {
      return this.disabled || this.disabled !== false;
    }
  },
  created() {
    this.isChecked = this.checked;
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  methods: {
    handelChange(e) {
      this.$emit("change", e.target.checked);
      this.isChecked = e.target.checked;
    }
  }
};
</script>

