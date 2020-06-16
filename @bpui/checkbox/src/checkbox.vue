<!--
/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: xieliangkai
* Date: 2020-02-22 00:24
* Desc:  bp-checkbox
*/
 -->


<template>
  <label class="bp-checkbox" :class="{
      'bp-Checkbox__disabled':isDisabled
    }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span class="bp-checkbox__input">
      <span class="bp-checkbox__inner" :class="[hovering?'bp-checkbox__inner_hover':'',isChecked?'bp-checkbox__inner_checked':'']">
        <bp-icon v-if="isChecked" name='bp-checkbox_checked'/>
      </span>
      <input type="checkbox" class="bp-checkbox__original" :checked="checked" @change="handelChange"
        v-bind="$attrs" :disabled="isDisabled" />
    </span>
    <span class="bp-checkbox__label" v-if="$slots.default"><slot name="default" /></span>
  </label>
</template>

<script>
  export default {
    components: {},
    props: {
      checked: {
        default: false
      },
      disabled: {
        default: false,
        type: Boolean
      },
    },
    model: {
      prop: "checked",
      event: "change"
    },
    data() {
      return {
        isChecked: false,
        hovering: false
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