/**
 * Copyright (c) 2020 Copyright bpui All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-02-17 14:42
 * Desc:
 */

declare namespace bp {
  interface Widget {
    /**
     * @desc 是否显示.
     */
    visible: boolean;

    /**
     * @desc 显示时震动; (safari等不支持的浏览器, 需适配bplibs.device.vibrate方法)
     * 
     * default: false.
     */
    vibrateWhenShow: boolean;

    /**
     * @desc 是否显示掩码.
     */
    mask: boolean;

    /**
     * @desc 是否允许点击掩码关闭.
     */
    maskClose: boolean;

    /**
     * @desc 是否阻挡事件传递.
     */
    preventEvent: boolean;

    /**
     * @desc 显示时隐藏body的滚动条.
     */
    hideBodyScroll: boolean;

    /**
     * @desc 显示时是否附带到body上.
     */
    appendToBody: boolean | "true" | "false";

    /**
     * @desc dialog的css样式.
     */
    pageClass: string | string[] | Directory<string>;

    /**
     * @desc dialog的样式.
     */
    pageStyle: string | string[] | Directory<string>;

    /**
     * @desc: 显示
     * @return promise.
     */
    show(): Promise<void>;

    /**
     * @desc: 隐藏.
     * @return promise.
     */
    hide(): Promise<void>;
  }
}
