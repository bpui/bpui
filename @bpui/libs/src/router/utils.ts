'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-04-03 16:05
* Desc: 
*/

import * as febs from 'febs-browser';


/**
* @desc: 获得无文件名的path.
* @description 
            如 /xxx/index.html -> /xxx/
            如 /xxx/ -> /xxx/
            如 /xxx -> /xxx
*/
export function getCurrentPathnameNoFile() {
  let path = window.location.pathname;
  let paths = path.split('/');
  let n = paths[paths.length-1];
  if (n.indexOf('.') >= 0) {
    return path.substr(0, path.length-n.length);
  }
  else {
    return path;
  }
}

/**
* @desc: 获得有文件名的path.
*/
export function getCurrentPathname() {
  return window.location.pathname;
}

/**
* @desc: 获得pathname.
*/
export function getPathname(basePath:string, routerPath:string) {
  if (routerPath.indexOf('./') == 0) {
    return basePath + routerPath.substr(2);
  }
  else if (routerPath[0] == '/') {
    return basePath + routerPath.substr(1);
  }
  else {
    return basePath + routerPath;
  }
}

/**
* @desc: 获得无文件名(location.pathname上的文件名)路由
* @description 
            如 /base/xxx/index.html -> /xxx
            如 /base/xxx/ -> /xxx
            如 /base/xxx -> /xxx
*/
export function getRoutePathNoFile(basePath:string, routerPath?:string) {
  if (!febs.string.isEmpty(routerPath)) {
    if (routerPath[0] == '/') {
      return routerPath;
    }
    else if (routerPath.indexOf('./') == 0) {
      routerPath = routerPath.substr(2);
    }
  }
  else {
    routerPath = '';
  }

  let path = getCurrentPathnameNoFile();
  if (routerPath.length > 0) {
    if (path[path.length-1] == '/') {
      path += routerPath;
    }
    else {
      path += '/' + routerPath;
    }
  }

  if (path[path.length-1] != '/') path += '/';

  if (basePath != '/' && path.indexOf(basePath) == 0) {
    path = path.substr(basePath.length);
    path = '/' + path;
  }
  
  if (path.length > 1 && path[path.length-1] == '/') {
    path = path.substr(0, path.length-1);
  }
  return path;
}

/**
* @desc: 获得有文件名路由
* @description 
            如 /base/xxx/index.html -> /xxx/index.html
            如 /base/xxx/ -> /xxx
            如 /base/xxx -> /xxx
*/
export function getCurrentRoutePath(basePath:string) {
  let path = getCurrentPathname();
  if (basePath != '/' && path.indexOf(basePath) == 0) {
    path = '/' + path.substr(basePath.length);
  }
  
  if (path.length > 1 && path[path.length-1] == '/') {
    path = path.substr(0, path.length-1);
  }
  return path;
}