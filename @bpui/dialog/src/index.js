'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/

import bpLibs from "@bpui/libs";
import VuePlugin from './vue/plugins';
import bpDialog from './dialog.vue';
import bpWidget from './widget.vue';
import * as hook from './utils/hooks';

import * as mask from './utils/mask';

import {registerDialogComponents} from './register';
import apiWidget from './api';
import defaultAlert from './components/alert.vue';
import defaultConfirm from './components/confirm.vue';
import defaultLoading from './components/loading.vue';
import defaultToast from './components/toast.vue';

function maskRouterChange(to, type) {
  mask.removeAllApiModal();

  setTimeout(()=>{
    // 查找
    let pageLen = $('.bp-navbarView_page').length;
    let dataMark = 'page' + pageLen;
    let masks = $(`.bp-widget[data-mark='${dataMark}']`);

    if (masks.length == 0) {
      $('body').removeClass('bp-widget__fixscroll');
      $('html').css('padding-right', '');
    }
    else {
      for (let i = 0; i < masks.length; i++) {
        let mask = $(masks[i]);
        if (mask.hasClass('bp-widget__mask') && mask.hasClass('bp-widget__visible')) {

          if (mask.hasClass('bp-widget__bodyFixscroll')) {
            $('body').addClass('bp-widget__fixscroll');
          }

          let ss = mask.attr('data-htmlp');
          if (ss.length > 0) {
            $('html').css('padding-right', ss);
          }
          return;
        }
      }
      
      $('body').removeClass('bp-widget__fixscroll');
      $('html').css('padding-right', '');
    }
  }, 800);
}

function init() {
  // register alias icon.
  bpLibs.icons.registerAliasIcon('bp-dialog_close', 'cancel');

  // register default components.
  registerDialogComponents({
    alert: defaultAlert,
    confirm: defaultConfirm,
    loading: defaultLoading,
    toast: defaultToast,
  });

  // scroll.
  bpLibs.router.off('routeChanged', maskRouterChange)
             .on('routeChanged', maskRouterChange);
}
init();


export default {
  init,
  VuePlugin,

  hook,

  registerDialogComponents,
  apiWidget,

  bpDialog,
  bpWidget,
}