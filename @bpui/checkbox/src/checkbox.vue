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
      <input ref="input" type="checkbox" class="bp-checkbox__original" :checked="isChecked" @change="handelChange"
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
      handelChange(e) {
        this.isChecked = e.target.checked;
        this.$emit('input', this.isChecked);
        this.$emit("change", this.isChecked);
      }
    }
  };
</script>