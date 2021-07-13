<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

方法:
// 隐藏.
- hide();
// 显示.
- show();

 -->

<template>
  <div class="bp-picker__item" :class="{
    'bp-picker__item-disabled': disabled
  }" :data-value="value">
    <slot name="default"/>
    <template v-if="multiple">
      <bp-icon v-if="check" class="bp-picker__item_check" name="bp-picker_check"/>
      <i v-else class="bp-picker__item_uncheck"/>
    </template>
  </div>
</template>

<script>
  import bpLibs from '@bpui/libs';

  export default {
    name: 'bpPickerCell',
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
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
    data() {
      return {
        // 仅对一维数据源有效.
        multiple: false,
        // 仅对一维数据源有效.
        check: false,
      };
    }
  };
</script>