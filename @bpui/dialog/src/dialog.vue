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
  <widget ref="widget" class="bp-dialog" 
    :visible.sync="visibleReal" 
    :maskClose="maskClose" 
    :mask="mask" 
    :pageClass="pageClass" 
    :pageStyle="pageStyle"
    :appendToBody="appendToBody"
    :preventEvent="true">
    <div v-if="$slots['title']" class="bp-dialog__title bp-ellipsis"  @click.stop>
      <slot name="title" />
    </div>
    <div v-else-if="title" class="bp-dialog__title bp-ellipsis"  @click.stop>{{title}}</div>

    <div class="bp-dialog__main" @click.stop>
      <slot name="default" />
    </div>
    
    <div v-if="$slots['foot']" class="bp-dialog__foot" :class="footClass"  @click.stop>
      <slot name="foot" />
    </div>

    <bp-icon v-if="showClose" class="bp-dialog__close" name="bp-dialog_close" @click.stop="hide().then(res=>{})"/>
  </widget>
</template>

<script>
  import bpLibs from '@bpui/libs';
  import widget from './widget.vue';

  export default {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      widget
    },
    props: {
      visible: Boolean,
      mask: {
        default: true,
        type: Boolean,
      },
      maskClose: Boolean,
      pageClass: String|Array,
      pageStyle: String|Array|Object,
      appendToBody: {
        default: false,
        type: Boolean|String,
        validator: function(value) { return typeof value === 'boolean' || value === 'true' || value === 'false'; }
      },

      showClose: {
        default: true,
        type: Boolean,
      },
      title: String,
    },
    data() {
      return {
        visibleReal: false,
        footClass: null,
      };
    },
    watch: {
      visible(v) {
        this.visibleReal = v;
      },
      visibleReal(v) {
        this.$emit('update:visible', v);
      },
    },
    beforeMount() {
      this.visibleReal = this.visible;

      let foot = this.$slots['foot'];
      if (foot && foot[0] && foot[0].children) {

        let n = 0;
        for (let i = 0; i < foot[0].children.length; i++) {
          if (foot[0].children[i].tag) {
            n++;
          }
        }

        if (n == 1) {
          this.footClass = 'bp-dialog__footOneButton';
        }
        else if (n == 2) {
          this.footClass = 'bp-dialog__footTwoButton';
        }
        else if (n == 3) {
          this.footClass = 'bp-dialog__footThreeButton';
        }
      }
    },
    beforeDestroy() {
    },
    mounted() {
    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function () {
        return this.$refs.widget.show();
      },

      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function () {
        return this.$refs.widget.hide();
      },
    },
  };
</script>
