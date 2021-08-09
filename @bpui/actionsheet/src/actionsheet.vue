<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

 -->

<template>
  <div class="bp-widget bp-actionsheet" :class="tabletClass" @click="onClickMask">
    <div class="bp-widget__content">
      <div class="bp-widget__contentWrap">
        <div class="bp-actionsheet__main" :class="pageClass" :style="pageStyle" @click.stop>
          <slot name="default" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bpDialog from '@bpui/dialog';
  import * as febs from 'febs-browser';

  export default {
    mixins: [bpDialog.bpWidget],
    components: {
      // bpWidget: bpDialog.bpWidget
    },
    props: {
      maskClose: {
        default: true,
        type: Boolean,
      },
      preventEvent: {
        default: true,
        type: Boolean,
      },
      forcePhoneStyle: {
        default: false,
        type: Boolean|String,
        validator: function(value) { return typeof value === 'boolean' || value === 'true' || value === 'false'; }
      },
      appendToBody: {
        default: true,
        type: Boolean|String,
        validator: function(value) { return typeof value === 'boolean' || value === 'true' || value === 'false'; }
      },
    },
    data() {
      return {
        tabletClass: null,
      }
    },
    watch: {
    },
    created() {
    },
    beforeMount() {
      let forcePhoneStyle = this.forcePhoneStyle === true || this.forcePhoneStyle === 'true';
      if (!febs.utils.browserIsPhone() && !forcePhoneStyle) {
        this.tabletClass = 'bp-actionsheet__tablet';
      }
    },
    beforeDestroy() {
    },
    mounted() {
    },
    methods: {
      onClickMask() {
        if (this.maskClose) {
          this.hide().then(res=>{});
        }
      }
    },
  };
</script>
