'use strict';

/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-08-20 16:37
* Desc: 
*/

import * as febs from 'febs-browser';
import * as tabbarInstance from '../tabbarInstance';

const GlobalStatusSupportSafeArea = '$BpGlobalStatusSupportSafeArea'
const GlobalEventSupportSafeArea = '$BpGlobalEventSupportSafeArea'

let status = 0; // 0:还没数据，-1:不支持，1:支持

function isSupportSafeArea() {
  let r = window[GlobalStatusSupportSafeArea];
  if (r !== null) {
    return r;
  }

  const div = document.createElement('div');
  const id = 'test-' + febs.crypt.uuid();
  const styles = [
    'position: fixed',
    'z-index: -1',
    'height: constant(safe-area-inset-top)',
    'height: env(safe-area-inset-top)',
  ];
  div.style.cssText = styles.join(';');
  div.id = id;
  document.body.appendChild(div);
  const areaDiv = document.getElementById(id);
  if (areaDiv) {
    status = areaDiv.offsetHeight > 0 ? true : false; // 该 div 的高度是否为 0
    areaDiv.parentNode?.removeChild(areaDiv);
  }
  window[GlobalStatusSupportSafeArea] = status;

  return status;
}

/**
 * @desc 处理安全边距变换事件.
 */
function handleSafeArea() {
  if (!isSupportSafeArea()) {
    const thresholdH = 70;
    let tabbar = tabbarInstance.getInstance();
    if (tabbar) {
      setTimeout(() => {
        if (febs.utils.browserIsMobile()) {
          if (febs.utils.browserIsPhone()) {
            if (window.innerHeight < window.innerWidth) {
              tabbar._changeFakeSafeArea(true);
            }
            else if (
              window.screen.height - window.innerHeight > thresholdH
            ) {
              tabbar._changeFakeSafeArea(false);
            }
            else {
              tabbar._changeFakeSafeArea(true);
            }
          }
          else {
            tabbar._changeFakeSafeArea(true);
          }
        }
      }, 100);
    }
  }
}

export function init() {
  if (!window[GlobalEventSupportSafeArea]) {
    if (!isSupportSafeArea()) {
      febs.dom.addEventListener(window, 'orientationchange', handleSafeArea, false);
      febs.dom.addEventListener(window, 'resize', handleSafeArea);
    }
    window[GlobalEventSupportSafeArea] = true;
  }

  handleSafeArea();
}
