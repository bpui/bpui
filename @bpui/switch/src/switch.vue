<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
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
        ref="input"
        type="checkbox"
        class="bp-switch__original"
        :checked="checked"
        :disabled="isDisabled"
        @change="handleChange"
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
    checked: {
      default: null,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    value: {
      default: null,
      type: Boolean,
    }
  },
  data() {
    return {
      hovering: false,
      isChecked: false
    };
  },
  watch: {
    value: function (val, oldVal) {
      this.isChecked = val;
    },
    checked: function (val, oldVal) {
      if (this.value === true || this.value === false) {
        return;
      }

      this.isChecked = val;
    },
  },
  computed: {
    isDisabled() {
      return this.disabled || this.disabled !== false;
    }
  },
  created() {
    if (this.checked === 'checked' || this.checked===true) {
      this.isChecked = true; 
    }
    else if (this.checked !== false) {
      this.isChecked = this.value;
    }
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {
    this.$refs.input.checked = this.isChecked;
  },
  methods: {
    handleChange(e) {
      this.isChecked = e.target.checked;
      this.$emit('input', this.isChecked);
      this.$emit("change", this.isChecked);
    }
  }
};
</script>

