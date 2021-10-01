'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 21:53
* Desc: 所有的组件.
*/

import Components from './bpui.components';
var componentStore = require('../componentStore');

export function getComponent(name) {
  var com = componentStore.getComponent(name);
  if (com) {
    return com;
  }

  for (var i = 0; i < Components.length; i++) {
    if (Components[i].name == name) {
      if (Components[i].lib) {
        var lib = Components[i].lib();
        componentStore.setComponent(name, lib);
        return lib;
      }
      else {
        return null;
      }
    }
  }

  throw new Error('Can\'t get module: ' + name);
}
