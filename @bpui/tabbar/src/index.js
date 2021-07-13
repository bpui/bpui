'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/

import VuePlugin from './vue/plugins/plugin';

import bpTabbar from './tabbar.vue';
import bpTabbarItem from './tabbarItem.vue';
import bpTabbarItemTitle from './tabbarItemTitle.vue';

const bpTabbarComponents = {
  bpTabbar,
  bpTabbarItem,
  bpTabbarItemTitle
}


export default {
  VuePlugin,
  bpTabbarComponents,
  bpTabbar,
  bpTabbarItem,
  bpTabbarItemTitle,
}
