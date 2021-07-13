'use strict';

/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-08-16 18:06
* Desc: 
*/

import * as tabbarInstance from '../../tabbarInstance';

export let _Vue

function install(vue) {
  if (install.installed && _Vue === vue) return
  install.installed = true
  _Vue = vue;

  Object.defineProperty(vue.prototype, '$bpTabbar', {
    get: function() { return tabbarInstance.getInstance(); }
  })
}

export default function() {
  return {
    install
  };
}
