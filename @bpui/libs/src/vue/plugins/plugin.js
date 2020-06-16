'use strict';

/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-08-16 18:06
* Desc: 
*/

import * as smoothscroll from './smoothscroll';
import * as timer from './timer';
import bpLibs from '../../bpLibs';

import icon from '../icon';

export let _Vue

function makeInstall() {
  return function install(vue, options) {
    if (install.installed && _Vue === vue) return
    install.installed = true
    _Vue = vue;
    
    let g = window||window;
    smoothscroll.install(vue, this, g);

    vue.mixin({
      mounted() {
      },
      beforeCreate() {
        timer.beforeCreate(vue, this);
      },
      created() {
      },
      beforeDestroy() {
        timer.beforeDestroy(vue, this);
      },
    });

    Object.defineProperty(vue.prototype, '$bpLibs', {
      get: function() { return bpLibs; }
    })

    vue.component('bpIcon', icon);
  }
}

export default function() {
  bpLibs.icons.registerDefault();
  
  return {
    install: makeInstall()
  }
}
