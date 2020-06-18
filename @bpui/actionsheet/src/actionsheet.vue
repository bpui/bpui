<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

 -->

<template>
  <div class="bp-widget bp-actionsheet" @click="onClickMask">
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
    },
    data() {
      return {
      };
    },
    watch: {
    },
    created() {
    },
    beforeMount() {
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
