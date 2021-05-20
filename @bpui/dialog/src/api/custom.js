'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 13:09
* Desc: 
*/

import * as febs from 'febs-browser';;
import Vue from 'vue';
import * as maskUtils from '../utils/mask';
import * as register from '../register';

const ApiClass = 'bp-apiClass';
const ModalCustomClass = 'bp-modalCustomClass';

/**
* @desc: 隐藏对话框
*/
export function hideCustom(id) /* :void*/ {
  if (id) {
    id.vm.hide().then(res=>{
      $(`.${id.id}`).remove();
    });
  }
  else {
    maskUtils.removeAllApiModal('.'+ModalCustomClass);
  }
}

/**
* @desc: 显示警告框.
*/
export function showCustom(name, cfg) {
  let c = register.getCustomComponent(name);
  if (!c) {
    throw new Error('dialog custom component is null: ' + name);
  }

  let id = 'c' + febs.crypt.uuid();
  $(`<div id="${id}"></div>`).appendTo($('body'));
  cfg = cfg || {};

  // 创建实例.
  let vm = new Vue({
    render: h => h(c, { class: [ApiClass, ModalCustomClass, id], ...cfg }),
  }).$mount(`#${id}`);
  vm.$children[0].$children[0].show().then(res=>{});

  // var vnode = render.call(vm._renderProxy, vm.$createElement);
  // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

  return {vm:vm.$children[0].$children[0], id};
}
