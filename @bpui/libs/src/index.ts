'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 15:50
* Desc: 
*/


import bpLibs from './bpLibs';
import VuePlugin from './vue/plugins/plugin';
import bpIcon from './vue/icon';

// store at window.
// if (process.env.NODE_ENV == 'development') {
  ((window||window) as any).bpLibs = bpLibs;
// }

bpLibs.VuePlugin = VuePlugin;
bpLibs.VueObject = { bpIcon: bpIcon };

export default bpLibs;