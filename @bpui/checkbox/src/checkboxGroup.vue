<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
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
  name: "bpCheckboxGroup",
  components: {},
  props: {
    value: {
      validator: function(value) {
        return !value || Array.isArray(value);
      }
    },
    disabled: { default: false, type: Boolean }
  },
  data() {
    return {
      bpNodeName: "bpCheckboxGroup"
    };
  },
  computed: {},
  created() {
    this.$on("handleChange", () => {
      let values = this._getValues();
      this.$emit("input", values);
      this.$emit("change", values);
    });
    this.$on("handleInput", () => {
      this.$emit("input", this._getValues());
    });
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {
    if (this.value) {
      for (let i = 0, j = 0; i < this.$children.length && j < this.value.length; i++) {
        let child = this.$children[i];
        if (child.bpNodeName == 'bpCheckbox') {
          child._initValue(this.value[j].isChecked);
          j++;
        }
      }
    }
    else {
      this.$emit('input', this._getValues());
    }
  },
  methods: {
    _getValues() {
      let values = []; 
      for (let i = 0; i < this.$children.length; i++) {
        let child = this.$children[i];
        let label = child.labelValue;

        if (child.bpNodeName == 'bpCheckbox') {
          values.push({
            isChecked: child.isChecked,
            labelValue: label,
          });
        }
      }
      return values;
    }
  }
};
</script>
