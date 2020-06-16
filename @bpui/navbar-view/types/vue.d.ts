/// <reference path="./INavbarView.d.ts" />

import Vue from 'vue';
import '@bpui/libs/types';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 导航组件.
     */
    $navbar: bp.NavbarView;

    $route: bp.Location;
    $router: bp.Router;
  }
}