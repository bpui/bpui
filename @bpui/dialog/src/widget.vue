<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
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
  <div class="bp-widget" @click="onClickMask">
    <div class="bp-widget__content" :class="pageClass" :style="pageStyle">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
  import * as maskUtils from './utils/mask';
  import * as febs from 'febs-browser';
  import bpLibs from '@bpui/libs';

  export default {
    components: {
    },
    props: {
      visible: Boolean,
      vibrateWhenShow: {
        default: false,
        type: Boolean,
      },
      mask: {
        default: true,
        type: Boolean,
      },
      maskClose: {
        default: false,
        type: Boolean,
      },
      preventEvent: {
        default: true,
        type: Boolean,
      },
      hideBodyScroll: {
        default: true,
        type: Boolean,
      },
      appendToBody: {
        default: false,
        type: Boolean|String,
        validator: function(value) { return typeof value === 'boolean' || value === 'true' || value === 'false'; }
      },
      pageClass: String|Array,
      pageStyle: String|Array|Object,
      
    },
    data() {
      return {
        uuid: null,
      }
    },
    watch: {
      visible(val) {
        if (val) {
          this.show().then(()=>{});
        }
        else {
          this.hide().then(()=>{});
        }
      }
    },
    beforeMount() {
      if (this.appendToBody && this.appendToBody != 'false') {
        this.uuid = 'bp-widget-' + febs.crypt.uuid();
      }
    },
    mounted() {
      if (this.appendToBody && this.appendToBody != 'false') {
        $(this.$el).attr('id', this.uuid);
        $('body').append(this.$el);
      }
      if (this.visible) {
        this.show().then(()=>{});
      }
    },
    beforeDestroy() {
      if (this.visible) {
        this.hide().then(()=>{
          if (this.uuid) {
            $('#'+this.uuid).remove();
          }
        });
      }
      else {
        if (this.uuid) {
          $('#'+this.uuid).remove();
        }
      }
    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function () {
        return new Promise((resolve)=>{
          maskUtils.showWidget(this.$el, this.mask, this.preventEvent, this.hideBodyScroll, ()=>{
            this.$emit('update:visible', true);
            resolve();

            if (this.vibrateWhenShow) {
              bpLibs.device.vibrate(10);
            }
          });
        })
      },

      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function () {
        return new Promise((resolve)=>{
          maskUtils.hideWidget(this.$el, ()=>{
            this.$emit('update:visible', false);
            resolve();
          });
        })
      },

      onClickMask() {
        if (this.maskClose) {
          this.hide().then(res=>{});
        }
      }
    },
  };
</script>
