/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  /**
  * @desc: device工具.
  */
  interface Device {
    /**
     * @desc: 震动.
     * @param pattern: 如果为number, 则为震动的持续毫秒数; 如果为number[],则奇数位为震动,偶数位为等待.
     */
    vibrate(pattern: number | number[]): void;

    /**
     * @desc: the browser is mobile.
     */
    browserIsMobile(): boolean;

    /**
     * @desc: the browser is ios.
     */
    browserIsIOS(): boolean;

    /**
     * @desc: the browser is phone.
     */
    browserIsPhone(): boolean;

    /**
     * @desc: the browser is weixin.
     */
    browserIsWeixin(): boolean;

    /**
     * @desc: 判断是否是ie.
     */
    browserIsIE(): boolean;

    /**
     * @desc: 判断ie版本号.
     * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
     */
    browserIEVer(): number;

    /**
     * @desc: the browser is support html5.
     */
    browserIsSupportHtml5(): boolean;

    /**
     * @desc: the browser is support safari.
     */
    browserIsSafari(): boolean;

    /**
     * @desc: the browser is support opera.
     */
    browserIsOpera(): boolean;

    /**
     * @desc: the browser is support firefox.
     */
    browserIsFirefox(): boolean;

    /**
     * @desc: the browser is support chrome.
     */
    browserIsChrome(): boolean;

    /**
     * @desc: the browser is support edge.
     */
    browserIsEdge(): boolean;
  }
}