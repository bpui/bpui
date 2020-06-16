/// <reference path="./api.d.ts" />

import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $bpWidget:  bp.WidgetApi;
  }
}
