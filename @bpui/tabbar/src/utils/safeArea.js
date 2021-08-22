'use strict';

/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-08-20 16:37
* Desc: 
*/

import * as febs from 'febs-browser';

const GlobalStatusSupportSafeArea = '$BpGlobalStatusSupportSafeArea'

let status = 0; // 0:还没数据，-1:不支持，1:支持

export function isSupportSafeArea() {
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