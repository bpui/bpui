'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 15:49
* Desc: 
*/

import * as febs from 'febs-browser';;
import * as dom from './dom';
import * as utils from './router/utils';

// const GlobalRouter = Symbol('$BpGlobalRouter');
// const GlobalRouterBase = Symbol('$BpGlobalRouterBase');
// const GlobalRouter404 = Symbol('$BpGlobalRouter404');
const GlobalRouter = ('$BpGlobalRouter');
const GlobalRouterBase = ('$BpGlobalRouterBase');
const GlobalRouter404 = ('$BpGlobalRouter404');


/**
* @desc: 注册app.
*/
export function registerApp(routes: Array< {path:string,component:any,[key:string]:any} >, basePath?:string) {
  if (!window[GlobalRouter]) {
    window[GlobalRouter] = [];
  }
  if (window[GlobalRouter].indexOf(routes) < 0) {
    window[GlobalRouter].push(routes);
  }

  if (!febs.string.isEmpty(basePath)) {
    if (basePath[0] != '/') {
      basePath = '/' + basePath;
    }
    if (basePath[basePath.length-1] != '/') {
      basePath = basePath + '/';
    }
  }
  else {
    basePath = '/';
  }
  window[GlobalRouterBase] = basePath;

  //
  // 404.
  for (let i = 0; i < window[GlobalRouter].length; i++) {
    let routes = window[GlobalRouter][i];

    for (let j = 0; j < routes.length; j++) {
      if (routes[j].path == '*') {
        window[GlobalRouter404] = routes[j].component;
        break;
      }
    }
  }
}


export function getBasePath():string {
  return window[GlobalRouterBase];
}

/**
* @desc: 获得路由.
*/
export function getMatchedComponent( 
  location: bp.Location, 
  onLoad:(component:any, onLoaded?:(component:any)=>void)=>void,
  onError:(err:Error)=>void
): Object {
  if (!window[GlobalRouter]) {
    window[GlobalRouter] = [];
  }

  let noFileRouter = utils.getRoutePathNoFile(getBasePath(), location.path);

  for (let i = 0; i < window[GlobalRouter].length; i++) {
    let routes = window[GlobalRouter][i];

    for (let j = 0; j < routes.length; j++) {
      if (routes[j].path == noFileRouter) {
        if (routes[j].component) {
          onLoad(routes[j].component, (component)=>{
            routes[j].component = component;
          });
        }
        else {
          if (onError)
            onError(new Error(`cannot find component: ${routes[j].path}`));
        }
        return;
      }
    }
  }
  
  // 404.
  if (window[GlobalRouter404]) {
    onLoad(window[GlobalRouter404], (component)=>{
            window[GlobalRouter404] = component;
          });
  }

  return null;
}