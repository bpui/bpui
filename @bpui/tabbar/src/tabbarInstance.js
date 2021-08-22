'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-02-17 14:49
 * Desc:
 */

// const GlobalTabbar = Symbol('$BpGlobalTabbar');
// const GlobalTabbarPopData = Symbol('$BpGlobalTabbarPopData');
const GlobalTabbar = '$BpGlobalTabbar'
const GlobalTabbars = '$BpGlobalTabbars'
const GlobalTabbarPopData = '$BpGlobalTabbarPopData'

export function isMatchRoute(srcRoutePath/*: string*/, curRoutePath/*: string*/) {
  if (!srcRoutePath || srcRoutePath == '*') {
    return true;
  }

  if (srcRoutePath && curRoutePath.indexOf(srcRoutePath) == 0) {
    if (srcRoutePath[srcRoutePath.length - 1] == '/') {
      return true;
    }
    else if (curRoutePath.length > srcRoutePath.length) {
      let r = curRoutePath[srcRoutePath.length];
      if (r != '/' && r != '?' && r != '#') {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function getSubRoute(srcRoutePath/*: string*/, curRoutePath/*: string*/) {
  if (!srcRoutePath || srcRoutePath == '*') {
    return curRoutePath;
  }

  let r = curRoutePath.substring(srcRoutePath.length);
  if (r[0] != '/') {
    r = '/' + r;
  }
  return r;
}

export function setInstanceByRoute(instance/*: any*/, routePath/*: string*/) {
  if (!routePath) routePath = '*';
  let map = window[GlobalTabbars];
  if (!map) {
    map = window[GlobalTabbars] = {};
  }

  map[routePath] = instance;
}

export function getInstanceByRoute(routePath/*: string*/) {
  let map = window[GlobalTabbars];
  if (!map) {
    map = window[GlobalTabbars] = {};
  }
  for (const key in map) {
    if (isMatchRoute(key, routePath)) {
      return map[key];
    }
  }

  return null;
}

export function setInstance(instance/*: any*/) {
  console.debug("Tabbar set instance")

  if (window[GlobalTabbar] !== instance) {
    window[GlobalTabbar] = instance

    $('.bp-tabbar').css('display', 'none');
    if (instance) {
      $(instance.$el).css('display', '');
    }
  }
}

export function getInstance() {
  return window[GlobalTabbar]
}

export function setViewData(data/*: any*/) {
  window[GlobalTabbarPopData] = data
}

// 获取一次后清除.
export function getViewData() {
  let data = window[GlobalTabbarPopData]
  window[GlobalTabbarPopData] = null
  return data
}
