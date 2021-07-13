'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
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
  
  utils.setBasePath(basePath);

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

/**
* @desc: 获得路由.
*/
export function getMatchedComponent( 
  location: bp.Location, 
  onLoad:(component:{name: string, component: any}, onLoaded?:(component: {name?: string, component: any})=>void)=>void,
  onError:(err:Error)=>void
): void|false {
  if (!window[GlobalRouter]) {
    window[GlobalRouter] = [];
  }

  let noFileRouter = utils.getRoutePathNoFile(utils.getBasePath(), location.path);

  for (let i = 0; i < window[GlobalRouter].length; i++) {
    let routes = window[GlobalRouter][i];

    for (let j = 0; j < routes.length; j++) {
      if (routes[j].path == noFileRouter) {
        if (routes[j].component || routes[j].name) {
          if (onLoad) {
            onLoad({ name: routes[j].name, component: routes[j].component }, (component) => {
              if (component) {
                if (component.component) {
                  routes[j].component = component.component;
                }
                if (component.name) {
                  routes[j].name = component.name;
                }
              }
            });
          }
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
    if (onLoad) {
      onLoad({ component: window[GlobalRouter404], name: null }, (component) => {
        if (component) {
          if (component.component) {
            window[GlobalRouter404] = component.component;
          }
        }
      });
    }
    return;
  }

  return false;
}