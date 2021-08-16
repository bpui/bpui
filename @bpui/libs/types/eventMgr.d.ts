/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  /**
  * @desc: 事件管理器.
  */
  interface EventMgr {

    /**
     * @desc 清理所有的事件监听.
     */
    dispose(): EventMgr;
    /**
     * @desc 现存监听数量.
     */
    listenerLength(): number;
    /**
    * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
    */
    on(domElement:any, event:string, func:any, useCapture?:boolean):EventMgr;

    /**
    * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
    */
    off(domElement:any, event:string, func:any, useCapture?:boolean):EventMgr;
  }
}