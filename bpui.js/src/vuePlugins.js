'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 22:46
* Desc: 
*/

import libs from '@bpui/libs';
import * as febs from 'febs-browser';
var Components = require('./dyn/bpui.components');
var componentInstance = require('./dyn/componentInstance');
var componentStore = require('./componentStore');

export default async function (Vue/*:any*/, components/*?:string[]*/) // :Promise<void>
{

  // 加载必须加载的库.
  (function() { require('@bpui/libs/style/class.scss') })();

  // 需要注册.
  Vue.use(libs.VuePlugin());
  let loadComponents = []/* as any[]*/;
  if (!components) {
    components = [];
    for (let i = 0; i < Components.length; i++) {
      let element/*:any*/ = Components[i];
      components.push(element.name);
    }
  } else {
    components = Array.from(new Set(components));
    if (components.indexOf('navbarView') < 0) {
      components.push('navbarView');
    }
  }
  
  for (let i = 0; i < components.length; i++) {
    let element/*: any*/ = components[i];

    let comm = componentStore.getComponent(element);
    if (!comm) {
      let cc = await febs.utils.promisify(componentInstance.getComponent, componentInstance)(element);
      if (cc) {
        loadComponents.push(cc);
        componentStore.setComponent(element, cc);
      }
    } else {
      loadComponents.push(comm);
    }
  }

  for (let i = 0; i < loadComponents.length; i++) {
    let _de = loadComponents[i].default || loadComponents[i];
    if (_de) {
      if (typeof _de.init === 'function') {
        _de.init();
      }
      if (typeof _de.VuePlugin === 'function') {
        Vue.use(_de.VuePlugin());
      }
    }
  }
}