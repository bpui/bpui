'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-26 17:33
* Desc: 
*/

import * as febs from 'febs-browser';;

export {
  vibrate,
  browserIsMobile,
  browserIsIOS,
  browserIsPhone,
  browserIsWeixin,
  browserIsIE,
  browserIEVer,
  browserIsSupportHtml5,
}

/**
* @desc: 震动.
*/
function vibrate(pattern) {
  if (navigator) {
    let vibrate = navigator.vibrate ||
                    navigator.webkitVibrate ||
                    navigator.mozVibrate ||
                    navigator.msVibrate;
  
    if(!vibrate && __debug) {
      console.log("vibrate not supported");
    }

    navigator.vibrate(pattern);
  }
}

/**
 * @desc: the browser is mobile.
 */
const browserIsMobile = febs.utils.browserIsMobile;

/**
 * @desc: the browser is ios.
 */
const browserIsIOS = febs.utils.browserIsIOS;


/**
 * @desc: the browser is phone.
 */
const browserIsPhone = febs.utils.browserIsPhone;


/**
 * @desc: the browser is weixin.
 */
const browserIsWeixin = febs.utils.browserIsWeixin;


/**
 * @desc: 判断是否是ie.
 */
const browserIsIE = febs.utils.browserIsIE;

/**
 * @desc: 判断ie版本号.
 * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
 *        如果是 edge 返回 'edge'
 */
const browserIEVer = febs.utils.browserIEVer;


/**
 * @desc: the browser is support html5.
 */
const browserIsSupportHtml5 = febs.utils.browserIsSupportHtml5;