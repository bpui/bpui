'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 21:53
* Desc: 所有的组件.
*/

import Components from './bpui.components';
var componentStore = require('../componentStore');

export function getComponent(name, cb) {
  var com = componentStore.getComponent(name);
  if (com) {
    return com;
  }

  if (!cb) {
    throw new Error('Can\'t get module: ' + name);
  }

  for (var i = 0; i < Components.length; i++) {
    if (Components[i].name == name) {
      if (Components[i].lib) {
        Components[i].lib().then((module) => {
          componentStore.setComponent(name, module);
          cb(null, module);
        }).catch(e => {
          throw new Error('Can\'t get module: ' + name + ';\r' + (e?e.toString():''), e);
        });
        return;
      }
      else {
        cb(null)
        return;
      }
    }
  }

  throw new Error('Can\'t get module: ' + name);
}