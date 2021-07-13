<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: xieliangkai
* Date: 2020-02-22 00:24
* Desc:  bp-radio
*/
 -->
<template>
  <label class="bp-radio" :class="{
          'bp-radio__disabled':isDisabled
        }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span
      class="bp-radio__input"
      :class="{
          'bp-radio__checked':model == value,
        }"
    >
      <span class="bp-radio__inner" :class="[hovering?'bp-radio__inner_hover':'']"></span>
      <input
        ref="radio"
        type="radio"
        class="bp-radio__original"
        :value="value"
        :disabled="isDisabled"
        v-model="model"
        v-bind="$attrs"
        @change="handleChange"
      />
    </span>
    <span class="bp-radio__label">
      <slot name="default" />
    </span>
  </label>
</template>

<script>

export default {
  components: {},
  props: {
    value: {},
    disabled: Boolean
  },
  data() {
    return {
      hovering: false,
      radioGroup: ""
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      if (parent.bpNodeName === "bpRadioGroup") {
        return true;
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this.$parent.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.$parent.$emit("handleInput", val);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model == this.value);
      }
    },
    isDisabled() {
      return this.isGroup ? (this.$parent.disabled || this.disabled) : this.disabled;
    }
  },
  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup && this.$parent.$emit("handleChange", this.model);
      });
    }
  }
};
</script>
