'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-24 21:53
* Desc: 所有的组件.
*/

module.exports = [
  {
    name: 'navbarView',
    style: function() { return require('@bpui/navbar-view/style/_index.scss') },
    lib: function () { return require('@bpui/navbar-view') },
  },
  {
    name: 'tableView',
    style: function() { return require('@bpui/table-view/style/_index.scss') },
    lib: function () { return require('@bpui/table-view') },
  },
  {
    name: 'tabbar',
    style: function() { return require('@bpui/tabbar/style/_index.scss') },
    lib: function () { return require('@bpui/tabbar') },
  },
  {
    name: 'checkbox',
    style: function() { return require('@bpui/checkbox/style/_index.scss') },
    lib: function () { return require('@bpui/checkbox') },
  },
  {
    name: 'radio',
    style: function() { return require('@bpui/radio/style/_index.scss') },
    lib: function () { return require('@bpui/radio') },
  },
  {
    name: 'switch',
    style: function () { return require('@bpui/switch/style/_index.scss') },
    lib: function () { return require('@bpui/switch') },
  },
  {
    name: 'input',
    style: function() { return require('@bpui/input/style/_index.scss') },
    lib: function () { return require('@bpui/input') },
  },
  {
    name: 'dialog',
    style: function() { return require('@bpui/dialog/style/_index.scss') },
    lib: function () { return require('@bpui/dialog') },
  },
  {
    name: 'picker',
    style: function() { return require('@bpui/picker/style/_index.scss') },
    lib: function () { return require('@bpui/picker') },
  },
  {
    name: 'actionsheet',
    style: function() { return require('@bpui/actionsheet/style/_index.scss') },
    lib: function () { return require('@bpui/actionsheet') },
  },
  {
    name: 'popover',
    style: function() { return require('@bpui/popover/style/_index.scss') },
    lib: function () { return require('@bpui/popover') },
  },
  {
    name: 'uploader',
    style: function() { return require('@bpui/uploader/style/_index.scss') },
    lib: function () { return require('@bpui/uploader') },
  },
  {
    name: 'button',
    style: function () { return require('@bpui/button/style/_index.scss') },
  },
]
