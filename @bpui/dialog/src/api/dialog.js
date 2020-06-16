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
import libs from '@bpui/libs';
import * as register from '../register';

const ApiClass = 'bp-apiClass';
const AlertClass = 'bp-alertClass';

/**
* @desc: 隐藏对话框
*/
export function hideDialog(id) /* :void*/ {
  if (id) {
    id.vm.hide().then(res=>{
      $(`.${id.id}`).remove();
    });
  }
  else {
    maskUtils.removeAllApiModal('.'+AlertClass);
  }
}

export const hideAlert = hideDialog;
export const hideConfirm = hideDialog;

/**
* @desc: 显示警告框.
*/
export function showAlert(cfg/*:string|{
  title?: string,
  content: string,
  okText?: string,
  confirm?: ()=>void,
}*/) {
  let alert = register.getComponents().alert;
  if (!alert) {
    throw new Error('dialog alert component is null');
  }

  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = {content: cfg.toString()};
  }
  cfg.title = cfg.title||'';
  cfg = febs.utils.mergeMap(alert.data(), cfg);
  let c = febs.utils.mergeMap(alert, {data:()=>cfg});

  let id = 'c' + febs.crypt.uuid();
  $(`<div id="${id}"></div>`).appendTo($('body'));

  // 创建实例.
  let vm = new Vue({
    render: h => h(c, {class:[ApiClass, AlertClass, id], on:{
      confirm: ()=>{
        if (cfg.confirm) {
          cfg.confirm({vm:vm.$children[0].$children[0], id});
        } else {
          vm.$children[0].$children[0].hide().then(res=>{
            $(`.${id}`).remove();
          });
        }
      },
    }})
  }).$mount(`#${id}`);
  vm.$children[0].$children[0].show().then(res=>{});

  // var vnode = render.call(vm._renderProxy, vm.$createElement);
  // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

  return {vm:vm.$children[0].$children[0], id};
}

/**
* @desc: 显示确认框.
*/
export function showConfirm(cfg/*:string|{
  title?: string,
  content: string,
  okText?: string,
  cancelText?: string,
  confirm?: ()=>void,
  cancel?: ()=>void,
}*/) {
  let confirm = register.getComponents().confirm;
  if (!confirm) {
    throw new Error('dialog confirm component is null');
  }

  if (typeof cfg === 'string') {
    cfg = {content: cfg};
  }
  cfg.title = cfg.title||'';
  cfg = febs.utils.mergeMap(confirm.data(), cfg);
  let c = febs.utils.mergeMap(confirm, {data:()=>cfg});

  let id = 'c' + febs.crypt.uuid();
  $(`<div id="${id}"></div>`).appendTo($('body'));

  // 创建实例.
  let vm = new Vue({
    render: h => h(c, {class:[ApiClass, AlertClass, id], on:{
      confirm: ()=>{
        if (cfg.confirm) {
          cfg.confirm({vm:vm.$children[0].$children[0], id});
        } else {
          vm.$children[0].$children[0].hide().then(res=>{
            $(`.${id}`).remove();
          });
        }
      },
      cancel: ()=>{
        if (cfg.cancel) {
          cfg.cancel({vm:vm.$children[0].$children[0], id});
        } else {
          vm.$children[0].$children[0].hide().then(res=>{
            $(`.${id}`).remove();
          });
        }
      },
    }})
  }).$mount(`#${id}`);
  vm.$children[0].$children[0].show().then(res=>{});

  return {vm:vm.$children[0].$children[0], id};
}


/**
* @desc: 在body中appendwidget而非父元素中.
*/
export function showWidget(
  component/*:any*/
) {
  if (!component || !libs.dom.isVueComponent(component)) {
    throw new Error('component is null or not a Component');
  }

  let id = 'c' + febs.crypt.uuid();
  $(`<div id="${id}"></div>`).appendTo($('body'));

  // 创建实例.
  let vm = new Vue({
    render: h => h(component, {
      'update:visible': (v)=>{
        if (!v) {
          $(`.${id}`).remove();
        }
      },
    })
  }).$mount(`#${id}`);
  vm.$children[0].$children[0].show().then(res=>{});

  // var vnode = render.call(vm._renderProxy, vm.$createElement);
  // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

  return {vm:vm.$children[0].$children[0], id};
}