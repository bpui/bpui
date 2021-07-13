'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-06 16:28
* Desc: 
*/

import * as febs from 'febs-browser';
import Gesture from '../../gesture';

// const s_gestureMgr = Symbol('$BpGestureMgr');
const s_gestureMgr = ('$BpGestureMgr');


class GestureMgr {
  private gestures: { [name: string]: { dom: HTMLElement | SVGElement, gesture: bp.Gesture } };

  constructor() {
    this.gestures = {};
  }

  add(name: string, dom?: HTMLElement | SVGElement | any): bp.Gesture {
    if (!dom) dom = window.document.body;
    else {
      dom = $(dom)[0];
      if (!dom) {
        throw new Error('GestureMgr add func; cannot find dom selector');
      }
    }

    for (const key in this.gestures) {
      const ges = this.gestures[key];
      if (dom.isSameNode(ges.dom) || key == name) {
        throw new Error('the gesture is already existed!');
      }
    }

    let ges1 = (new Gesture(dom)) as any;
    
    this.gestures[name] = {
      dom,
      gesture: ges1,
    };

    return ges1;
  }

  get(name: string): bp.Gesture {
    let ges1 = this.gestures[name];
    return ges1?.gesture;
  }

  remove(name: string): void {
    let ges1 = this.gestures[name];
    ges1?.gesture.dispose();
    delete this.gestures[name];
  }

  dispose(): GestureMgr {
    for (const key in this.gestures) {
      const ges = this.gestures[key];
      ges.gesture.dispose();
    }

    this.gestures = {};
    return this;
  }
}


export function beforeCreate(Vue, ctx: any) {
  Object.defineProperty(ctx, '$bpGestureMgr', {
    get() {
      if (!ctx[s_gestureMgr]) {
        ctx[s_gestureMgr] = new GestureMgr();
      }
      return ctx[s_gestureMgr];
    }
  });
}

export function beforeDestroy(Vue, ctx:any) {
  if (ctx[s_gestureMgr]) {
    ctx[s_gestureMgr].dispose();
    ctx[s_gestureMgr] = null;
  }
}
