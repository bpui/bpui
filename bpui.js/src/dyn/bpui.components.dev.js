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
    // lib: function() { return import('../../@bpui/navbar-view') },
    lib: function() { return import('../../../../navbar-view') },
  },
  {
    name: 'tableView',
    lib: function() { return import('../../../@bpui/table-view') },
  },
  {
    name: 'tabbar',
    lib: function() { return import('../../../@bpui/tabbar') },
  },
  {
    name: 'checkbox',
    lib: function() { return import('../../../@bpui/checkbox') },
  },
  {
    name: 'radio',
    lib: function() { return import('../../../@bpui/radio') },
  },
  {
    name: 'switch',
    lib: function() { return import('../../../@bpui/switch') },
  },
  {
    name: 'input',
    lib: function() { return import('../../../@bpui/input') },
  },
  {
    name: 'dialog',
    lib: function() { return import('../../../@bpui/dialog') },
  },
  {
    name: 'picker',
    lib: function() { return import('../../../@bpui/picker') },
  },
  {
    name: 'actionsheet',
    lib: function() { return import('../../../@bpui/actionsheet') },
  },
  {
    name: 'popover',
    lib: function() { return import('../../../@bpui/popover') },
  },
  {
    name: 'uploader',
    lib: function() { return import('../../../@bpui/uploader') },
  },
  {
    name: 'select',
    lib: function() { return import('../../../@bpui/select') },
  },
]
