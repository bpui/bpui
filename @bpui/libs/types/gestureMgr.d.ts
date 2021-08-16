/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  /**
  * @desc: 手势管理器.
  */
  interface GestureMgr {

    /**
     * @desc 清理所有的手势对象.
     */
    dispose(): GestureMgr;

    /**
     * @desc 添加手势对象.
     * @param gestureName 手势对象名称.
     * @param dom 作用的dom.
     */
    add(gestureName: string, dom?: HTMLElement | SVGElement | any): bp.Gesture;

    /**
     * @desc 通过手势名称获取手势对象. 
     */
    get(gestureName: string): bp.Gesture;

    /**
     * @desc 通过手势名称移除手势对象. 
     */
    remove(gestureName: string): void;
  }
}