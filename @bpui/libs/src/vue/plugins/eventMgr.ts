'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 16:28
* Desc: 
*/

import * as febs from 'febs-browser';

// const s_eventMgr = Symbol('$BpEventMgr');
const s_eventMgr = ('$BpEventMgr');


class EventMgr {
  private events: {domElement: any, event: string, func: any, useCapture?: boolean}[];

  constructor() {
    this.events = [];
  }

  /**
   * @desc 现存监听数量.
   */
  listenerLength(): number {
    return this.events.length;
  }

  dispose(): EventMgr {
    for (let i = 0; i < this.events.length; i++) {
      let e = this.events[i];
      febs.dom.removeEventListener(e.domElement, e.event, e.func, e.useCapture);
    }
    this.events = [];

    return this;
  }

  /**
  * @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
  */
  addEventListener(domElement: any, event: string, func: any, useCapture?: boolean): EventMgr {
    let i = 0;
    for (; i < this.events.length; i++) {
      let e = this.events[i];
      if (e.domElement === domElement
        && e.event === event
        && e.func === func
        && e.useCapture === useCapture) {
        break;
      }
    }

    if (i >= this.events.length) {
      febs.dom.addEventListener(domElement, event, func, useCapture);
      this.events.push({
        domElement, event, func, useCapture
      });
    }

    return this;
  }

  /**
  * @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
  */
  removeEventListener(domElement: any, event: string, func: any, useCapture?: boolean): EventMgr {
    let i = 0;
    for (; i < this.events.length; i++) {
      let e = this.events[i];
      if (e.domElement === domElement
        && e.event === event
        && e.func === func
        && e.useCapture === useCapture) {
        febs.dom.removeEventListener(domElement, event, func, useCapture);
        this.events.splice(i, 1);
        return;
      }
    }

    return this;
  }
}


export function beforeCreate(Vue, ctx: any) {
  if (!ctx[s_eventMgr]) {
    ctx[s_eventMgr] = new EventMgr();
    Object.defineProperty(ctx, '$bpEventMgr', {
      get () { return ctx[s_eventMgr]; }
    });
  }
}

export function beforeDestroy(Vue, ctx:any) {
  if (ctx[s_eventMgr]) {
    ctx[s_eventMgr].dispose();
    ctx[s_eventMgr] = null;
  }
}
