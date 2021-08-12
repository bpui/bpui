'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 21:26
* Desc: 
*/

import bpLibs from '@bpui/libs';
import * as febs from 'febs-browser';
import * as apiDialog from './dialog';
import * as apiLoading from './loading';
import * as apiToast from './toast';
import * as apiCustom from './custom';


function rightTop(dialog) {
  if (bpLibs.dom.isVueObject(dialog)) {
    dialog = dialog.$el;
  }

  dialog = $(dialog);

  // 修正居中显示, 超出造成的偏移.
  let content = (dialog.children('.bp-widget__content')[0]);
  let clientHeight = content.clientHeight;
  if (clientHeight > febs.dom.getViewPort().height) {
    clientHeight = (clientHeight - febs.dom.getViewPort().height) / 2 + 20;
    $(content).css('top', clientHeight + 'px');
  }
}

export default {
  rightTop,
  ...apiDialog,
  ...apiLoading,
  ...apiToast,
  ...apiCustom,
}