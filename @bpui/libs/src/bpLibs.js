'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 15:50
* Desc: 
*/

import router from './router';
import * as init from './init';
import * as dom from './dom';
import * as device from './device';
import timer from './timer';
import gesture from './gesture';
import icons from './icons';

const bpLibs = {
};

Object.defineProperty(bpLibs, 'router', {
  get () { return router; }
})
Object.defineProperty(bpLibs, 'dom', {
  get () { return dom; }
})
Object.defineProperty(bpLibs, 'device', {
  get () { return device; }
})
Object.defineProperty(bpLibs, 'icons', {
  get () { return icons; }
})
Object.defineProperty(bpLibs, 'registerApp', {
  get () { return init.registerApp; }
})
Object.defineProperty(bpLibs, 'Timer', {
  get () { return timer; }
})
Object.defineProperty(bpLibs, 'Gesture', {
  get () { return gesture; }
})

export default bpLibs;