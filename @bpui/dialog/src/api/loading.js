'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 13:09
* Desc: 
*/

import * as febs from 'febs-browser';;
import Vue from 'vue';
import bpLibs from '@bpui/libs';
import * as register from '../register';

// const GlobalLoadingTimeout = Symbol('$BpGlobalLoadingTimeout');
// const GlobalLoading = Symbol('$BpGlobalLoading');
const GlobalLoadingTimeout = ('$BpGlobalLoadingTimeout');
const GlobalLoading = ('$BpGlobalLoading');

const ApiClass = 'bp-apiClass';
const LoadingClass = 'bp-loadingClass';

function onHandlerRouter(to, type) {
  window[GlobalLoading] = null;
}

export function isLoadingVisible() {
  return $('.'+LoadingClass).length > 0;
}

/**
* @desc: 隐藏对话框
*/
export function hideLoading() {
  if (window[GlobalLoadingTimeout]) {
    clearTimeout(window[GlobalLoadingTimeout].tm);
    window[GlobalLoadingTimeout] = null;
  }

  if (window[GlobalLoading]) {
    window[GlobalLoading].$children[0].hide();
  }
}

/**
* @desc: 显示警告框.
*/
export function showLoading(cfg/*:string|{
    content: 提示文本.
    delay: 延时显示, 默认为0.
}*/) {
  bpLibs.router.off('routeChanged', onHandlerRouter);
  bpLibs.router.on('routeChanged', onHandlerRouter);

  if (!cfg) cfg = '';

  let loading = register.getComponents().loading;
  if (!loading) {
    throw new Error('dialog loading component is null');
  }

  // 创建实例.
  if (!window[GlobalLoading]) {
    let id = 'c' + febs.crypt.uuid();
    $(`<div id="${id}"></div>`).appendTo($('body'));

    let vm = new Vue({
      render: h => h(loading, {class:[ApiClass, LoadingClass, id]})
    }).$mount(`#${id}`);
    window[GlobalLoading] = vm.$children[0];
  }

  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = {content: cfg.toString()};
  }
  cfg.delay = cfg.delay||0;
  if (cfg.delay < 0) cfg.delay = 0;

  let now = Date.now();

  // 判断是否已经存在.
  if (window[GlobalLoadingTimeout]) {
    if (window[GlobalLoadingTimeout].now > now+cfg.delay) {
      clearTimeout(window[GlobalLoadingTimeout].tm);
      window[GlobalLoadingTimeout] = null;
    }
    else {
      window[GlobalLoadingTimeout].cfg = febs.utils.mergeMap(cfg);
    }
  }

  {
    now = now + cfg.delay;

    let tm = setTimeout(()=>{
      let cfg = window[GlobalLoadingTimeout].cfg;
      window[GlobalLoadingTimeout] = null;

      cfg = febs.utils.mergeMap(loading.data(), cfg);

      window[GlobalLoading].$data.content = cfg.content;
      window[GlobalLoading].$children[0].show();
    }, cfg.delay);

    window[GlobalLoadingTimeout] = {tm, now, cfg: febs.utils.mergeMap(cfg)};
  }
}
