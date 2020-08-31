/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 15:46
* Desc: 
*/

declare namespace bp {

  type Directory<T> = { [key: string]: T };
  type Location = {
    path: string,
    query?: Directory<string>,
    state?: Directory<any>,

    /**
     * It will container '#', if no empty.
     */
    hash?: string,
  };

  /**
   * router接口. (仅需提供如下接口)
   */
  interface Router {

    /**
     * 历史记录长度 (length名称在ie下不可重定义,故使用pageLength).
     */
    pageLength:number;

    /**
     * basePath
     */
    basePath: string;

    /**
     * 当前的路由信息.
     */
    currentRoute: bp.Location;

    /**
     * 路由控制. 可由trigger指定是否触发routeChanged通知.
     */
    push( path: string ) : void;
    push( path: string, trigger:boolean ) : void;
    push( location: Location ) : void;
    push( location: Location, trigger:boolean ) : void;
    replace( path: string ) : void;
    replace( path: string, trigger:boolean ) : void;
    replace( location: Location ) : void;
    replace( location: Location, trigger:boolean ) : void;
    back() : void;
    forward() : void;
    go(n: number) : void;

    /**
     * 获得对应location的一个页面组件. (返回的是组件类, 而非创建出来的实例)
     */
    getMatchedComponent( 
      location: Location, 
      /** 
       *  加载完成. 
       *  如果是异步加载,在生成完成时, 可以调用onLoaded将加载完成的组件回传, 下次加载时,将直接返回加载后的组件.
       */
      onLoad:(component:any, onLoaded?:(component:any)=>void)=>void,
      /** 匹配不到指定的路由组件. */
      onError:(err:Error)=>void
    ): void;

    /**
     * 路由改变事件.
     * type 表示路由切换的标记.
     *   1: 表示是replace.
     */
    on(eventType:'routeChanged', handler:(to:bp.Location, type?:number)=>void) : Router;
    off(eventType:'routeChanged', handler?:(to:bp.Location, type?:number)=>void) : Router;
  }
}