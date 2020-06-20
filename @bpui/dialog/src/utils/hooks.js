'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-06-20 15:56
* Desc: 
*/

// const GlobalWidgetHook = Symbol('$BpGlobalWidgetHook');
const GlobalWidgetHook = ('$BpGlobalWidgetHook');

/**
 * 添加页面抖动hook.
 * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
 */
export function addWidgetShake(foo/*:(paddingRight:number)=>void*/) {
  if (!window[GlobalWidgetHook]) {
    window[GlobalWidgetHook] = [];
  }

  let hooks = window[GlobalWidgetHook];

  if (hooks.indexOf(foo) < 0) {
    hooks.push(foo);
  }
}

/**
 * 移除页面抖动hook.
 */
export function removeWidgetShake(foo/*:(paddingRight:number)=>void*/) {
  let hooks = window[GlobalWidgetHook];
  if (hooks) {
    let i = hooks.indexOf(foo);
    if (i >= 0) hooks.splice(0, 1);
  }
}

export function callWidgetShake(paddingRight/*:number*/) {
  let hooks = window[GlobalWidgetHook];
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) {
      hooks[i] && hooks[i](paddingRight);
    }
  }
}