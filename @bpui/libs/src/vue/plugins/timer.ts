'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 16:28
* Desc: 
*/

import timer from '../../timer';

// const s_timer = Symbol('$BpTimer');
const s_timer = ('$BpTimer');

export function beforeCreate(Vue, ctx:any) {
  if (!ctx[s_timer]) {
    ctx[s_timer] = new timer();
    Object.defineProperty(ctx, '$timer', {
      get () { return ctx[s_timer]; }
    });
    Object.defineProperty(ctx, '$bpTimer', {
      get () { return ctx[s_timer]; }
    });
  }
}

export function beforeDestroy(Vue, ctx:any) {
  if (ctx[s_timer]) {
    ctx[s_timer].dispose();
    ctx[s_timer] = null;
  }
}
