'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 13:31
* Desc: 
*/

import * as febs from 'febs-browser';
// const GlobalDialogComponents = Symbol('$BpGlobalDialogComponents');
// const GlobalDialogCustoms = Symbol('$BpGlobalDialogCustoms');
const GlobalDialogComponents = ('$BpGlobalDialogComponents');
const GlobalDialogCustoms = ('$BpGlobalDialogCustoms');

/**
* @desc: 注册警告框等组件.
*/
export function registerDialogComponents(cfg/*:{
  alert:any,
  confirm:any,
  loading:any,
}*/) {
  window[GlobalDialogComponents] = febs.utils.mergeMap(window[GlobalDialogComponents], cfg);
}


export function getComponents() {
  return window[GlobalDialogComponents];
}


/**
* @desc: 注册自定义模式对话框组件.
* @param name 组件名称, 如果已经存在则覆盖
* @return 表明注册的名称是否不存在; 如果已经存在则覆盖, 并返回false.
*/
export function registerDialogCustom(name, component) {
  let g = window[GlobalDialogCustoms] = window[GlobalDialogCustoms] || {};
  
  if (g.hasOwnProperty(name)) {
    g[name] = component;
    return false;
  }

  g[name] = component;
  return true;
}

export function getCustomComponent(name) {
  let g = window[GlobalDialogCustoms];
  return g ? g[name] : null;
}
