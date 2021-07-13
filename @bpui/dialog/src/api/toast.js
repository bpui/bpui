'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 13:09
* Desc: 
*/

import * as febs from 'febs-browser';;
import Vue from 'vue';
import * as register from '../register';

const ApiClass = 'bp-apiClass';
// const GlobalToastTimeout = Symbol('$BpGlobalToastTimeout');
// const GlobalToast = Symbol('$BpGlobalToast');
// const GlobalToastTimeout = ('$BpGlobalToastTimeout');
// const GlobalToast = ('$BpGlobalToast');

/**
* @desc: 显示警告框.
*/
export function showToast(cfg/*:string|{
    customClass?: string,
    content: 提示文本.
    durable: 持续时间, 默认为0.
    pos: 显示位置, 默认为 'top',
    icon: 显示的图标名称.
}*/) {

  if (!cfg) cfg = '';

  let toast = register.getComponents().toast;
  if (!toast) {
    throw new Error('dialog toast component is null');
  }

  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = {content: cfg.toString()};
  }
  cfg.durable = cfg.durable||0;
  cfg.pos = cfg.pos||'top';

  if (cfg.durable < 0) cfg.durable = 0;
  if (cfg.durable == 0) cfg.durable = 4000;

  // 创建实例.
  let id = 'c' + febs.crypt.uuid();
  let classes = cfg.customClass || [];

  if (cfg.pos == 'top') {
    if (!$('.bp-toast-wrap')[0]) {
      $(`<div class="bp-toast-wrap"></div>`).appendTo($('body'));
    }
    $(`<div id="${id}"></div>`).appendTo($('.bp-toast-wrap'));
  }
  else {
    $(`<div id="${id}"></div>`).appendTo($('body'));
  }

  // if (window[GlobalToastTimeout]) {
  //   clearTimeout(window[GlobalToastTimeout].tm);
  //   let _id = window[GlobalToastTimeout].id;
  //   let _vm = window[GlobalToast];
  //   window[GlobalToastTimeout] = null;
  //   if (_vm) {
  //     window[GlobalToast] = null;
  //     _vm.hide().then(res=>{
  //       $('.' + _id).remove();
  //     });
  //   }
  // }

  let vm = new Vue({
    render: h => h(toast, {class:[ApiClass, id, cfg.pos == 'center'? 'bp-toast__center': ''].concat(classes)})
  }).$mount(`#${id}`);
  vm.$children[0].$data.content = cfg.content;
  vm.$children[0].$data.icon = cfg.icon;
  vm.$children[0].$children[0].show().then(res=>{});
  // window[GlobalToast] = vm.$children[0].$children[0];
  let toastCom = vm.$children[0].$children[0];

  let tm = setTimeout(()=>{
    // let tt = window[GlobalToastTimeout];
    // window[GlobalToastTimeout] = null;
    // if (tt) {
      let _vm = toastCom;
      if (_vm) {
        _vm.hide().then(res=>{
          if (id && id.length > 0) {
            $('.' + id).remove();
          }
        });
      }
    // }
  }, cfg.durable);

  // window[GlobalToastTimeout] = {tm, id};
}
