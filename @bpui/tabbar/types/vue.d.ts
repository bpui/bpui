/// <reference path="./ITabbar.d.ts" />

import Vue from 'vue';
import '@bpui/libs/types';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * tabbar组件.
     */
    $bpTabbar: bp.Tabbar;
  }
}