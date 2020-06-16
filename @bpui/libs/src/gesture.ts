'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-08 00:40
* Desc: 
*/

import hammer from 'hammerjs';
import * as device from './device';

//--------------------------------------------------------
// class of bp.GestureRecognizer.
//--------------------------------------------------------
class GestureRecognizerImp implements bp.GestureRecognizer {
  recognizer:Recognizer;

  constructor(recognizer:Recognizer) {
    this.recognizer = recognizer;
  }

  /**
   * @desc: 在指定手势识别失败后才识别到.
   */
  requireFailure(ges:bp.GestureRecognizer):void {
    this.recognizer.requireFailure((ges as GestureRecognizerImp).recognizer);
  }
}

//--------------------------------------------------------
// class of bp.Gesture.
//--------------------------------------------------------
export default class GestureImp /*implements bp.Gesture*/ {
  ges:HammerManager;
  tapRecognizers:GestureRecognizerImp[];
  tapHandles:Map<bp.GestureListener, HammerListener>;
  panRecognizers:GestureRecognizerImp[];
  panHandles:Map<bp.GestureListener, HammerListener>;
  pinchRecognizer:GestureRecognizerImp;
  pinchHandles:Map<bp.GestureListener, HammerListener>;
  rotateRecognizer:GestureRecognizerImp;
  rotateHandles:Map<bp.GestureListener, HammerListener>;
  pressRecognizer:GestureRecognizerImp;
  pressHandles:Map<bp.GestureListener, HammerListener>;
  swipeRecognizers:GestureRecognizerImp[];
  swipeHandles:Map<bp.GestureListener, HammerListener>;

  constructor(dom:HTMLElement|SVGElement) {
    this.ges = new hammer.Manager(dom);
    this.tapHandles = new Map();
    this.tapRecognizers = [null, null, null];
    this.panHandles = new Map();
    this.panRecognizers = [null, null, null, null];
    this.pinchHandles = new Map();
    this.rotateHandles = new Map();
    this.pressHandles = new Map();
    this.swipeHandles = new Map();
    this.swipeRecognizers = [null, null, null];
  }

  /**
  * @desc: 事件监听.
  */
  on(event:'tap'|'pan'|'pinch'|'rotate'|'press'|'swipe', handler:bp.GestureListener):bp.Gesture {
    let handles:Map<bp.GestureListener, HammerListener>;
    switch (event) {
      case 'tap':
        handles = this.tapHandles;
        break;
      case 'pan':
        handles = this.panHandles;
        break;
      case 'pinch':
        handles = this.pinchHandles;
        break;
      case 'rotate':
        handles = this.rotateHandles;
        break;
      case 'press':
        handles = this.pressHandles;
        break;
      case 'swipe':
        handles = this.swipeHandles;
        break;
      default:
        throw new Error('bp.Gesture.on error param event');
    }

    if (handles.has(handler)) {
      return this as any;
    }

    let h:HammerListener = (e:any)=>{
      handler(e);
    };
    handles.set(handler, h);
    this.ges.on(event, h);
    return this as any;
  }

  /**
  * @desc: 移除事件监听.
  */
  off(event:'tap'|'pan'|'pinch'|'rotate'|'press'|'swipe', handler?:bp.GestureListener):bp.Gesture {
    let handles:Map<bp.GestureListener, HammerListener>;
    switch (event) {
      case 'tap':
        handles = this.tapHandles;
        break;
      case 'pan':
        handles = this.panHandles;
        break;
      case 'pinch':
        handles = this.pinchHandles;
        break;
      case 'rotate':
        handles = this.rotateHandles;
        break;
      case 'press':
        handles = this.pressHandles;
        break;
      case 'swipe':
        handles = this.swipeHandles;
        break;
      default:
        throw new Error('bp.Gesture.off error param event');
    }

    if (handler) {
      let listener = handles.get(handler);
      if (listener) {
        handles.delete(handler);
        this.ges.off(event, listener);
      }
    }
    else {
      this.ges.off(event);
      handles.clear();
    }

    return this as any;
  }

  /**
  * @desc: 添加tap手势识别.
  *         只能识别 tapCount=1,2,3 的情景.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  * @return: 对同一个tapCount值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
  */
  enableTapRecognizer(cfg?:{
    tapCount:1|2|3
  }): bp.GestureRecognizer {
    if (!cfg) cfg = {tapCount:1};
    if (!cfg.tapCount) {
      cfg.tapCount = 1;
    }

    if (cfg.tapCount < 1 || cfg.tapCount > 3) {
      throw new Error("bp.Gesture.addTapGesture error params: " + cfg.tapCount);
    }
    if (this.tapRecognizers[cfg.tapCount-1]) {
      return this.tapRecognizers[cfg.tapCount-1];
    }

    let recognizer = this.ges.add(new hammer.Tap({
      event: 'tap', taps: cfg.tapCount
    }));

    this.tapRecognizers[cfg.tapCount-1] = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();

    // 设置.触发条件以及并发.
    this._requireFailure(this.tapRecognizers);
    this._setupDefaultRequireFailure();

    return this.tapRecognizers[cfg.tapCount-1] as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消tap手势识别.
  */
  disableTapRecognizer(cfg:{
    tapCount:1|2|3
  }) {
    if (!cfg) cfg = {tapCount:1};
    if (!cfg.tapCount) {
      cfg.tapCount = 1;
    }

    if (this.tapRecognizers[cfg.tapCount-1]) {
      let ges = this.tapRecognizers[cfg.tapCount-1];
      this.tapRecognizers[cfg.tapCount-1] = null;
      this.ges.remove(ges.recognizer);
    }
  }

  /**
  * @desc: 添加pan手势识别.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  * @return: 对同一个pointers值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
  */
  enablePanRecognizer(cfg:{
    pointers: number,
  }): bp.GestureRecognizer {
    if (!cfg.pointers) {  cfg.pointers = 1; }
    let pointers = cfg.pointers;
    if (0 > pointers || pointers > 3) {
      throw new Error('bp.Gesture.enablePanRecognizer error param pointers, must in [1,3]');
    }

    if (!(device.browserIsMobile() || device.browserIsPhone())) {
      cfg.pointers = 1;
      pointers = 1;
    }

    let index = pointers-1;

    if (this.panRecognizers[index]) {
      return this.panRecognizers[index];
    }

    let recognizer = this.ges.add(new hammer.Pan({
      event: 'pan',
    }));

    this.panRecognizers[index] = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();
    
    // 设置.触发条件以及并发.
    this._requireFailure(this.panRecognizers);
    this._setupDefaultRequireFailure();

    return this.panRecognizers[index] as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消pan手势识别.
  */
  disablePanRecognizer(cfg:{
    pointers: number,
  }) {

    let pointers = cfg.pointers;
    if (!(device.browserIsMobile() || device.browserIsPhone())) {
      cfg.pointers = 1;
      pointers = 1;
    }

    if (this.panRecognizers[pointers-1]) {
      this.ges.remove(this.panRecognizers[pointers-1].recognizer);
      this.panRecognizers[pointers-1] = null;
    }
  }

  /**
  * @desc: 添加pinch手势识别.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  */
  enablePinchRecognizer(): bp.GestureRecognizer {
    if (this.pinchRecognizer) {
      return this.pinchRecognizer;
    }

    let recognizer = this.ges.add(new hammer.Pinch({
      event: 'pinch'
    }));

    this.pinchRecognizer = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();
    this._setupDefaultRequireFailure();
    return this.pinchRecognizer as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消pinch手势识别.
  */
  disablePinchRecognizer() {
    if (this.pinchRecognizer) {
      this.ges.remove(this.pinchRecognizer.recognizer);
      this.pinchRecognizer = null;
    }
  }

  /**
  * @desc: 添加rotate手势识别.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  */
  enableRotateRecognizer(): bp.GestureRecognizer {
    if (this.rotateRecognizer) {
      return this.rotateRecognizer;
    }

    let recognizer = this.ges.add(new hammer.Rotate({
      event: 'rotate'
    }));

    this.rotateRecognizer = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();
    this._setupDefaultRequireFailure();
    return this.rotateRecognizer as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消rotate手势识别.
  */
  disableRotateRecognizer() {
    if (this.rotateRecognizer) {
      this.ges.remove(this.rotateRecognizer.recognizer);
      this.rotateRecognizer = null;
    }
  }

  /**
  * @desc: 添加press手势识别. 允许设置按压时间等.
  *         只能有一个press手势识别.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  * @param duration: 按压时间. ms
  */
  enablePressRecognizer(cfg:{
    duration:number
  }): bp.GestureRecognizer {
    if (this.pressRecognizer) {
      return this.pressRecognizer;
    }

    let recognizer = this.ges.add(new hammer.Rotate({
      event: 'press', time: cfg.duration
    }));

    this.pressRecognizer = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();
    this._setupDefaultRequireFailure();
    return this.pressRecognizer as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消rotate手势识别.
  */
  disablePressRecognizer() {
    if (this.pressRecognizer) {
      this.ges.remove(this.pressRecognizer.recognizer);
      this.pressRecognizer = null;
    }
  }

  /**
  * @desc: 添加swipe手势识别.
  *         - 相同的pointers值, 只能有一个swipe手势识别.
  *         - 桌面端pointers无效.
  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
  */
  enableSwipeRecognizer(cfg?:{
    velocity?:number,  // (default: 0.3) Minimal velocity required before recognizing, unit is in px per ms.
    distance?:number,  // (default: 10) Minimal distance required before recognizing
    pointers?:number,  // (default: 1)
  }): bp.GestureRecognizer {

    if (!cfg) cfg = {} as any;
    if (!cfg.velocity) {  cfg.velocity = 0.3; }
    if (!cfg.distance) {  cfg.distance = 10; }
    if (!cfg.pointers) {  cfg.pointers = 1; }

    let pointers = cfg.pointers;
    if (0 > pointers || pointers > 3) {
      throw new Error('bp.Gesture.enableSwipeRecognizer error param pointers, must in [1,3]');
    }

    if (!(device.browserIsMobile() || device.browserIsPhone())) {
      cfg.pointers = 1;
      pointers = 1;
    }

    if (this.swipeRecognizers[pointers-1]) {
      this.swipeRecognizers[pointers-1].recognizer.set({
        velocity: cfg.velocity,
        threshold: cfg.distance,
        pointers: cfg.pointers,
      });
      return this.swipeRecognizers[pointers-1];
    }
    

    let recognizer = this.ges.add(new hammer.Swipe({
      event: 'swipe', velocity: cfg.velocity, threshold: cfg.distance, pointers: cfg.pointers
    }));

    this.swipeRecognizers[pointers-1] = new GestureRecognizerImp(recognizer);
    this._concurrenceRecognizers();
    this._setupDefaultRequireFailure();
    return this.swipeRecognizers[pointers-1] as bp.GestureRecognizer;
  }

  /**
  * @desc: 取消swipe手势识别.
  */
  disableSwipeRecognizer(cfg?:{
    pointers: number,
  }) {
    if (!cfg) cfg = {} as any;
    if (!cfg.pointers) {  cfg.pointers = 1; }

    let pointers = cfg.pointers;
    if (pointers > 0 && pointers < 4) {
      if (!(device.browserIsMobile() || device.browserIsPhone())) {
        cfg.pointers = 1;
        pointers = 1;
      }

      if (this.swipeRecognizers[pointers-1]) {
        this.ges.remove(this.swipeRecognizers[pointers-1].recognizer);
        this.swipeRecognizers[pointers-1] = null;
      }
    }


  }

  /**
  * @desc: 同步触发.
  */
  private _concurrenceRecognizers() {
    let recognizers = this.panRecognizers.concat(this.tapRecognizers)
                                         .concat(this.pinchRecognizer)
                                         .concat(this.pressRecognizer)
                                         .concat(this.rotateRecognizer)
                                         .concat(this.swipeRecognizers);

    let firstRecognizer:GestureRecognizerImp = null;
    for (let i = 0; i < recognizers.length; i++) {
      if (recognizers[i]) {
        if (firstRecognizer) {
          firstRecognizer.recognizer.recognizeWith(recognizers[i].recognizer);
          firstRecognizer = recognizers[i];
        }
        else {
          firstRecognizer = recognizers[i];
        }
      }
    }
  }

  /**
  * @desc: 对指定的手势识别数组进行 0->1->2 方式的requireFailure设置.
  */
  private _requireFailure(recognizers:bp.GestureRecognizer[]) {
    // 设置.触发条件以及并发.
    let firstRecognizer:GestureRecognizerImp = null;
    for (let i = 0; i < recognizers.length; i++) {
      if (recognizers[i]) {
        // 清理所有的设置.
        ((recognizers[i] as GestureRecognizerImp).recognizer as any).requireFail = [];

        if (firstRecognizer) {
          firstRecognizer.recognizer.requireFailure((recognizers[i] as GestureRecognizerImp).recognizer);
          firstRecognizer = (recognizers[i] as GestureRecognizerImp);
        }
        else {
          firstRecognizer = (recognizers[i] as GestureRecognizerImp);
        }
      }
    }
  }

  /**
  * @desc: 设置默认的requireFailure关系.
  *     
  */
  private _setupDefaultRequireFailure() {

  }
}
