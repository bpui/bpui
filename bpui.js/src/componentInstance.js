'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 21:53
* Desc: 所有的组件.
*/

import Components from './bpui.components';

// const SymComponent = Symbol('$BpSymCompon?ent');
var SymComponent = ('$BpSymComponent');

export function setComponent(name, com) {
  if (!window[SymComponent]) {
    window[SymComponent] = {};
  }
  window[SymComponent][name] = com;
}

export function getComponent(name) {
  if (!window[SymComponent]) {
    window[SymComponent] = {};
  }

  if (window[SymComponent][name]) {
    return window[SymComponent][name];
  }

  for (var i = 0; i < Components.length; i++) {
    if (Components[i].name == name) {
      // if (Components[i].style) Components[i].style();
      if (Components[i].lib) {
        var lib = Components[i].lib();
        setComponent(name, lib);
        return lib;
      }
      else {
        return null;
      }
    }
  }

  throw new Error('Can\'t get module: ' + name);
}


export function requireComponentStyle(names) {
  if (!names) {
    for (var i = 0; i < Components.length; i++) {
      if (Components[i].style) Components[i].style();
    }
  } else {
    for (var i = 0; i < Components.length; i++) {
      for (var j = 0; j < names.length; j++) {
        if (Components[i].name == names[j]) {
          if (Components[i].style) Components[i].style();
          break;
        }
      }
    }
  }
}
