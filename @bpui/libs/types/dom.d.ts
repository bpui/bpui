/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  /**
  * @desc: dom工具.
  */
  interface Dom {
    /**
    * @desc: 判断是否是vue对象.
    * @return: 
    */
    isVueObject(obj:any):boolean;

    /**
    * @desc: Component 是import的, 未创建.
    * @return: 
    */
    isVueComponent(obj:any):boolean;

    /**
    * @desc: 判断是否是html dom对象.
    * @return: boolean.
    */
    isHtmlDom(e: any): boolean;
    /**
    * @desc: 获得html字符串
    * @param obj: vue对象, Dom对象 或字符串.
    * @return: 
    */
    getDomHtmlString(obj: any): string;

    /**
    * @desc: 获得视口大小.
    * @return: {width, height}
    */
    getViewPort(): { width: number, height: number };

    /**
    * @desc: 获得文档大小.
    * @return: {width, height}
    */
    getDocumentPort(): { width: number, height: number };

    /**
    * @desc: 获得document scroll offset.
    * @return: {top, left}
    */
    getDocumentOffset(): { top: number, left: number };

    /**
    * @desc: 获取指定元素相对于视口的的offset
    * @return: 
    */
    getElementOffset(e: any): { left: number, top: number };

    /**
    * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
    */
    addEventListener(domElement:any, event:string, func:any, useCapture?:boolean):void;

    /**
    * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
    */
    removeEventListener(domElement:any, event:string, func:any, useCapture?:boolean):void;

    /**
     * @desc 可以用于实时循环检测dom上的元素是否存在.
     * @param maxTime (ms)超过此时间如果未满足条件则停止.
     * @param condition 探测停止的条件. 返回true则停止探测.
     * @param stop 停止前会调用一次此方法.
     */
    probeDom(maxTime:Number, condition:()=>boolean, stop:()=>void):void;
  }
}