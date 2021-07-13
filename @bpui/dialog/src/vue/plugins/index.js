'use strict';

/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-08-16 18:06
* Desc: 
*/

import apiWidget from '../../api';

export let _Vue

function install(vue) {
  if (install.installed && _Vue === vue) return
  install.installed = true
  _Vue = vue;

  Object.defineProperty(vue.prototype, '$bpWidget', {
    get: function() {
      return apiWidget;
    }
  });
}

export default function() {
  return {
    install
  };
}
