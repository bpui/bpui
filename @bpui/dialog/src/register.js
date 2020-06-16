'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 13:31
* Desc: 
*/

import * as febs from 'febs-browser';
// const GlobalDialogComponents = Symbol('$BpGlobalDialogComponents');
const GlobalDialogComponents = ('$BpGlobalDialogComponents');

/**
* @desc: 注册警告框等组件.
*/
export function registerDialogComponents(cfg/*:{
  alert:any,
  confirm:any,
  loading:any,
}*/) {
  window[GlobalDialogComponents] = febs.utils.mergeMap(cfg);
}


export function getComponents() {
  return window[GlobalDialogComponents];
}