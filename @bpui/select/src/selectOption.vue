<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/


 -->

<template>
  <div class="bp-ellipsis" :class="{
  }" :data-value="value"  v-bind="$attrs" v-on="$listeners">
    <slot name="default"/>
  </div>
</template>

<script>
  export default {
    name: 'bpSelectOption',
    components: {
    },
    props: {
      value: {
        validator: function (value) {
          let t = typeof value;
          return t === 'string' || t === 'number';
        },
        required: true,
      },
      disabled: {
        validator: function (value) {
          return !value || value === "disabled" || value === true;
        },
      },
    },
  };
</script>