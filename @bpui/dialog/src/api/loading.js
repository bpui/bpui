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
const GlobalLoadingCount = ('$BpGlobalLoadingCount');
const GlobalLoadingShowMark = ('$BpGlobalLoadingShowMark');
const GlobalTargetLoadings = ('$BpGlobalTargetLoadings');

const ApiClass = 'bp-apiClass';
const LoadingClass = 'bp-loadingClass';
const LoadingTargetClass = 'bp-loadingTargetClass';

/**
* @desc: 隐藏对话框
*/
export function hideLoading() {
  window[GlobalLoadingShowMark] = false;
  
  if (window[GlobalLoadingCount]) {
    return;
  }

  if (window[GlobalLoadingTimeout]) {
    clearTimeout(window[GlobalLoadingTimeout].tm);
    window[GlobalLoadingTimeout] = null;
  }

  if (window[GlobalLoading]) {
    try {
      window[GlobalLoading].vm.$children[0].hide();
    } catch (e) { }
  }
}

/**
 * @desc: 清理loading的计数; 设置为0.
 */
export function clearLoadingCount() {
  window[GlobalLoadingCount] = 0;
}


function onHandlerRouter(to, type) {
  clearLoadingCount();
  hideLoading();

  if (window[GlobalTargetLoadings]) {
    for (const key in window[GlobalTargetLoadings]) {
      let targetLoading = window[GlobalTargetLoadings][key];
      if (targetLoading.timeout) {
        clearTimeout(targetLoading.timeout);
        targetLoading.timeout = null;
      }
      if (targetLoading.dom) {
        $(targetLoading.dom).remove();
      }

      if (targetLoading.srcPosition && $(targetLoading.target).css('position') == 'relative') {
        $(targetLoading.target).css('position', targetLoading.srcPosition);
      }
    }
    window[GlobalTargetLoadings] = null;
  } // if.
}

export function isLoadingVisible() {
  let loading = $('.' + LoadingClass);
  if (loading.length > 0) {
    if (window[GlobalLoadingTimeout] || loading.hasClass('bp-widget__visible')) {
      return true;
    }
  }

  return false;
}

export function getLoadingCount() {
  return window[GlobalLoadingCount] || 0;
}

/**
* @desc: 显示警告框.
*/
export function showLoading(cfg/*:string|{
    content: 提示文本.
    delay: 延时显示, 默认为0.
}*/) {
  window[GlobalLoadingShowMark] = true;

  bpLibs.router.off('routeChanged', onHandlerRouter);
  bpLibs.router.on('routeChanged', onHandlerRouter);

  if (!cfg) cfg = '';

  let loading = register.getComponents().loading;
  if (!loading) {
    throw new Error('dialog loading component is null');
  }

  // 创建实例.
  if (!window[GlobalLoading] || $('.' + window[GlobalLoading].id).length == 0) {
    let id = 'c' + febs.crypt.uuid();
    $(`<div id="${id}"></div>`).appendTo($('body'));

    let vm = new Vue({
      render: h => h(loading, {class:[ApiClass, LoadingClass, id]})
    }).$mount(`#${id}`);

    window[GlobalLoading] = {
      vm: vm.$children[0],
      id: id,
    }
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
      return;
    }
  }

  {
    now = now + cfg.delay;

    let tm = setTimeout(()=>{
      let cfg1 = window[GlobalLoadingTimeout].cfg;
      window[GlobalLoadingTimeout] = null;

      cfg1 = febs.utils.mergeMap(loading.data(), cfg1);

      window[GlobalLoading].vm.$data.content = cfg1.content;
      window[GlobalLoading].vm.$children[0].show();
    }, cfg.delay);

    window[GlobalLoadingTimeout] = {tm, now, cfg: febs.utils.mergeMap(cfg)};
  }
}


/**
* @desc: 隐藏对话框; 并减少计数
*/
export function hideLoadingDecrease() {

  if (window[GlobalLoadingCount]) {
    window[GlobalLoadingCount] = window[GlobalLoadingCount] - 1;
    if (window[GlobalLoadingCount] > 0) {
      return;
    }
  }

  if (window[GlobalLoadingShowMark]) {
    return;
  }

  hideLoading();
}

/**
 * @desc: 显示; 增加内部的loading计数1. 如果已经存在loading, 则不改变loading的内容.
 */
export function showLoadingIncrease(cfg) {
  if (!window[GlobalLoadingCount]) {
    window[GlobalLoadingCount] = 0;
  }
  window[GlobalLoadingCount] = window[GlobalLoadingCount] + 1;

  if (!isLoadingVisible()) {

    let mark = window[GlobalLoadingShowMark];
    showLoading(cfg);
    window[GlobalLoadingShowMark] = mark;
  }
}



/**
* @desc: 隐藏对话框
*/
export function hideLoadingTarget(target) {
  if (!target) {
    throw new Error('Empty parameter target in function showLoadingTarget');
  }

  if (!window[GlobalTargetLoadings]) {
    window[GlobalTargetLoadings] = {};
  }

  let targetLoading = window[GlobalTargetLoadings][target];
  if (!targetLoading) {
    return;
  }

  if (targetLoading.timeout) {
    clearTimeout(targetLoading.timeout);
    targetLoading.timeout = null;
  }

  if (targetLoading.loading) {
    targetLoading.loading.$children[0].hide().then(() => {
      $(targetLoading.dom).remove();
      delete window[GlobalTargetLoadings][target];

      if (targetLoading.srcPosition && $(target).css('position') == 'relative') {
        $(target).css('position', targetLoading.srcPosition);
      }
    });
  } else {
    delete window[GlobalTargetLoadings][target];
  }
}

/**
* @desc: 显示警告框.
*/
export function showLoadingTarget(target, cfg/*:string|{
    content: 提示文本.
    delay: 延时显示, 默认为0.
}*/) {
  if (!target) {
    throw new Error('Empty parameter target in function showLoadingTarget');
  }

  bpLibs.router.off('routeChanged', onHandlerRouter);
  bpLibs.router.on('routeChanged', onHandlerRouter);

  if (!window[GlobalTargetLoadings]) {
    window[GlobalTargetLoadings] = {};
  }
  let targetLoadings = window[GlobalTargetLoadings];

  if (!cfg) cfg = '';

  let loading = register.getComponents().loading;
  if (!loading) {
    throw new Error('dialog loading component is null');
  }

  // 创建实例.
  if (!targetLoadings[target]) {

    let srcPosition = window.getComputedStyle(target).position;
    if (srcPosition == 'sticky'
      || srcPosition == 'relative'
      || srcPosition == 'absolute'
      || srcPosition == 'fixed') {
      srcPosition = null;
    }
    else {
      let tt = $(target);
      let pos = tt.css('position');
      if (!febs.string.isEmpty(pos)) {
        tt.css('position', '');
      }

      let style = tt.attr('style');
      style = style || '';
      style = febs.string.trim(style);
      if (style.length > 0 && style[style.length - 1] != ';') {
        style += '; '
      }
      style += 'position:relative !important;';
      tt.attr('style', style);
    }

    let id = 'c' + febs.crypt.uuid();
    $(`<div id="${id}"></div>`).appendTo($(target));

    let vm = new Vue({
      render: h => h(loading, {class:[ApiClass, LoadingClass, LoadingTargetClass, id]})
    }).$mount(`#${id}`);
    targetLoadings[target] = {
      loading: vm.$children[0],
      dom: $(`.${id}`)[0],
      srcPosition: srcPosition,
      target,
    }
  }

  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = {content: cfg.toString()};
  }
  cfg.delay = cfg.delay||0;
  if (cfg.delay < 0) cfg.delay = 0;

  let now = Date.now();

  // 判断是否已经存在.
  if (targetLoadings[target].timeout) {
    if (targetLoadings[target].now > now+cfg.delay) {
      clearTimeout(targetLoadings[target].timeout);
      targetLoadings[target].timeout = null;
    }
    else {
      targetLoadings[target].cfg = febs.utils.mergeMap(cfg);
      return;
    }
  }

  {
    now = now + cfg.delay;

    let tm = setTimeout(()=>{
      let cfg1 = targetLoadings[target].cfg;
      targetLoadings[target].timeout = null;

      cfg1 = febs.utils.mergeMap(loading.data(), cfg1);

      targetLoadings[target].loading.$data.content = cfg1.content;
      targetLoadings[target].loading.$children[0].show();
    }, cfg.delay);

    targetLoadings[target].now = now;
    targetLoadings[target].cfg = febs.utils.mergeMap(cfg);
    targetLoadings[target].timeout = tm;
  }
}
