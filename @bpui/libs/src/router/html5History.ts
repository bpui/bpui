'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-18 23:43
* Desc: basePath 以 / 结尾, / 开头
*/

import * as febs from 'febs-browser';;
import * as url from '../utils/url';
import * as router from '../init';
import * as utils from './utils';

// const InstanceOnRoute = Symbol('$BpInstanceOnRoute');
const InstanceOnRoute = ('$BpInstanceOnRoute');


//--------------------------------------------------------
// class of Router
//--------------------------------------------------------
export default class Html5History {

  constructor() {
  }

  /**
   * 历史记录长度.
   */
  get pageLength():number {
    return window.history.length;
  }

  /**
   * basePath
   */
  get basePath():string {
    return router.getBasePath();
  }

  /**
   * 当前的路由信息.
   */
  get currentRoute(): bp.Location {
    let search = window.location.search||'';
    if (search[0] == '?') {
      search = search.substr(1);
    }

    let query = url.parseUrl(search);
    
    let path = utils.getRoutePathNoFile(this.basePath);

    return {
      path: path,
      query: query,
      state: window.history.state ? febs.utils.mergeMap(window.history.state) : null,
      hash: window.location.hash
    };
  }

  /**
   * 路由控制.
   */
  push( path: string|bp.Location, trigger:boolean = true ) : void {
    let l:bp.Location;
    if (typeof path === 'string') {
      l = utils.parsePathname(path) as bp.Location;
    }
    else {
      let p = utils.parsePathname(path.path) as bp.Location;
      l = febs.utils.mergeMap(path, p);
      l.query = febs.utils.mergeMap(p.query, path.query);
    }

    let rawPath = url.stringifyUrl(l.path, l.query);
    rawPath = utils.getPathname(this.basePath, rawPath);
    if (!febs.string.isEmpty(l.hash)) {
      rawPath += l.hash;
    }

    window.history.pushState(l.state, null, rawPath);
    
    if (trigger) {
      let lo = {
        path: l.path,
        query: l.query,
        state: l.state,
        hash: l.hash,
      };
      setTimeout(()=>{
        this._triggerRouteChanged(lo, null);
      }, 0);
    }
  }

  replace( path: string|bp.Location, trigger:boolean = true ) : void {
    let l:bp.Location;
    if (typeof path === 'string') {
      l = utils.parsePathname(path) as bp.Location;
    }
    else {
      let p = utils.parsePathname(path.path) as bp.Location;
      l = febs.utils.mergeMap(path, p);
      l.query = febs.utils.mergeMap(p.query, path.query);
    }

    let rawPath = url.stringifyUrl(l.path, l.query);
    rawPath = utils.getPathname(this.basePath, rawPath);
    if (!febs.string.isEmpty(l.hash)) {
      rawPath += l.hash;
    }

    window.history.replaceState(l.state, null, rawPath);

    if (trigger) {
      let lo = {
        path: l.path,
        query: l.query,
        state: l.state,
        hash: l.hash,
      };
      setTimeout(()=>{
        this._triggerRouteChanged(lo, 1);
      }, 0);
    }
  }

  back() : void {
    window.history.back();
  }
  forward() : void {
    window.history.forward();
  }

  go(n: number) : void {
    window.history.go(n);
  }

  /**
   * 获得对应location的一个页面组件. (返回的是组件类, 而非创建出来的实例)
   */
  getMatchedComponent( 
    location: bp.Location,
    /** 加载完成. */
    onLoad:(component:{name: string, component: any}, onLoaded?:(component: {name?: string, component: any})=>void)=>void,
    /** 匹配不到指定的路由组件. */
    onError:(err:Error)=>void 
  ): Object {
    let p = utils.parsePathname(location.path) as bp.Location;
    let l = febs.utils.mergeMap(location, p);
    l.query = febs.utils.mergeMap(p.query, location.query);

    return router.getMatchedComponent(l, onLoad, onError);
  }

  /**
   * 路由改变事件.
   */
  on(eventType:'routeChanged', handler:(to:bp.Location, type?:number)=>void) : bp.Router {
    if (eventType == 'routeChanged') {
      if (!window[InstanceOnRoute]) {
        window[InstanceOnRoute] = [];

        window.addEventListener('popstate', ()=>{
          let query = url.parseUrl(window.location.search);
          let location = {
            path: utils.getCurrentRoutePath(this.basePath),
            query: febs.utils.mergeMap(query),
            state: history.state,
            hash: window.location.hash
          }
          this._triggerRouteChanged(location, null);
        });
      }
      window[InstanceOnRoute].push(handler);
    }
    return this;
  }

  off(eventType:'routeChanged', handler?:(to:bp.Location, type?:number)=>void) : bp.Router {
    if (eventType == 'routeChanged') {
      if (window[InstanceOnRoute]) {
        let i = window[InstanceOnRoute].indexOf(handler);
        if (i >= 0) {
          window[InstanceOnRoute].splice(i, 1);
        }
      }
    }
    return this;
  }

  _triggerRouteChanged(location, type) {
    if (window[InstanceOnRoute]) {
      let listeners = window[InstanceOnRoute];

      for (let i = 0; i < listeners.length; i++) {
        listeners[i](
          {
            path: location.path,
            query: febs.utils.mergeMap(location.query),
            state: febs.utils.mergeMap(location.state),
            hash: location.hash,
          },
          type);
      }
    }
  }
}