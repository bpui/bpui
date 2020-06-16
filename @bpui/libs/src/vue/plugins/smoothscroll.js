'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 16:28
* Desc: 
*/

import smoothscroll from 'smoothscroll-polyfill';

export function install(Vue, ctx, g) {
  // kick off the polyfill!
  
  // eslint-disable-next-line
  if (!(!!g.navigator.userAgent.toLowerCase().match(/chrome/)) && !g.$srcScrollTo) {
    g.$srcScrollTo = (window||window).scrollTo;
    smoothscroll.polyfill();
  }
}