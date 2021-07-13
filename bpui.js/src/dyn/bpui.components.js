'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 21:53
* Desc: 所有的组件.
*/

module.exports = [
  {
    name: 'navbarView',
    style: function() { require(['@bpui/navbar-view/style/_index.scss']) },
    lib: function () { return import('@bpui/navbar-view') },
  },
  {
    name: 'tableView',
    style: function() { require(['@bpui/table-view/style/_index.scss']) },
    lib: function () { return import('@bpui/table-view') },
  },
  {
    name: 'tabbar',
    style: function() { require(['@bpui/tabbar/style/_index.scss']) },
    lib: function () { return import('@bpui/tabbar') },
  },
  {
    name: 'checkbox',
    style: function() { require(['@bpui/checkbox/style/_index.scss']) },
    lib: function () { return import('@bpui/checkbox') },
  },
  {
    name: 'radio',
    style: function() { require(['@bpui/radio/style/_index.scss']) },
    lib: function () { return import('@bpui/radio') },
  },
  {
    name: 'switch',
    style: function () { require(['@bpui/switch/style/_index.scss']) },
    lib: function () { return import('@bpui/switch') },
  },
  {
    name: 'input',
    style: function() { require(['@bpui/input/style/_index.scss']) },
    lib: function () { return import('@bpui/input') },
  },
  {
    name: 'dialog',
    style: function() { require(['@bpui/dialog/style/_index.scss']) },
    lib: function () { return import('@bpui/dialog') },
  },
  {
    name: 'picker',
    style: function() { require(['@bpui/picker/style/_index.scss']) },
    lib: function () { return import('@bpui/picker') },
  },
  {
    name: 'actionsheet',
    style: function() { require(['@bpui/actionsheet/style/_index.scss']) },
    lib: function () { return import('@bpui/actionsheet') },
  },
  {
    name: 'popover',
    style: function() { require(['@bpui/popover/style/_index.scss']) },
    lib: function () { return import('@bpui/popover') },
  },
  {
    name: 'uploader',
    style: function() { require(['@bpui/uploader/style/_index.scss']) },
    lib: function () { return import('@bpui/uploader') },
  },
  {
    name: 'select',
    style: function() { require(['@bpui/select/style/_index.scss']) },
    lib: function () { return import('@bpui/select') },
  },
  {
    name: 'button',
    style: function () { return require(['@bpui/button/style/_index.scss']) },
  },
]
