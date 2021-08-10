<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: xieliangkai
* Date: 2020-02-22 00:24
* Desc:  bp-checkbox
*/

value属性优先, 会覆盖checked属性
 -->


<template>
  <label class="bp-checkbox" :class="{
      'bp-Checkbox__disabled':isDisabled
    }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span class="bp-checkbox__input">
      <span class="bp-checkbox__inner" :class="[hovering?'bp-checkbox__inner_hover':'',isChecked?'bp-checkbox__inner_checked':'']">
        <bp-icon v-if="isChecked" name='bp-checkbox_checked'/>
      </span>
      <input ref="input" type="checkbox" class="bp-checkbox__original" :checked="isChecked" @change="handleChange"
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
      },
      labelValue: {
        default: null,
        type: String,
      },
    },
    watch: {
      value: function (val, oldVal) {
        this.isChecked = val;
        this.isGroup && this.$parent.$emit("handleInput");
      },
      checked: function (val, oldVal) {
        if (this.value === true || this.value === false) {
          return;
        }

        this.isChecked = val;
        this.isGroup && this.$parent.$emit("handleChange");
      },
    },
    data() {
      return {
        bpNodeName: "bpCheckbox",
        isChecked: false,
        hovering: false
      };
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        if (parent.bpNodeName === "bpCheckboxGroup") {
          return true;
        }
        return false;
      },
      isDisabled() {
        return this.isGroup ? (this.$parent.disabled || this.disabled) : this.disabled;
      },
    },
    created() {
      if (this.value === true || this.value === false) {
        this.isChecked = this.value;
        return;
      }
      else if (this.checked === 'checked' || this.checked===true) {
        this.isChecked = true; 
      }
      else if (this.checked === false) {
        this.isChecked = false;
      }

      this.$emit('input', this.isChecked);
    },
    beforeDestroy() {},
    beforeMount() {},
    mounted() {
      this.$refs.input.checked = this.isChecked;
    },
    methods: {
      _initValue(val) {
        if (this.value === true || this.value === false) {
          this.$emit('input', !!val);
        } else {
          this.isChecked = !!val;
        }
      },
      handleChange(e) {
        this.isChecked = e.target.checked;
        this.$emit('input', this.isChecked);
        this.$emit("change", this.isChecked);
        this.isGroup && this.$parent.$emit("handleChange");
      }
    }
  };
</script>