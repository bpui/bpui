/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  interface GestureListener {
    (event:any): void
  }


  /**
  * @desc: 手势.
  */
  interface GestureRecognizer {
    /**
     * 与指定手势同时发生. 在需要同时识别多个手势时使用.
     */
    recognizeWith(otherGes:GestureRecognizer):GestureRecognizer;
    /**
     * @desc: 在指定手势识别失败后才识别到.
     */
    requireFailure(otherGes:GestureRecognizer):GestureRecognizer;
  }

  /**
  * @desc: 事件对象.
  */
  interface GestureEvent {
    isFirst: boolean; // true when the first input.
    isFinal: boolean; // true when the final (last) input.

    /**
    * @desc: 事件类型, 如: pan, swipe等.
    */
    type: string;
    /**
    * @desc: 对type事件的附加信息, 如: panstart, panmove, panend等.
    *   - pan事件对应为:    panstart,panmove,panend,pancancel,panleft,panright,panup,pandown
    *   - pinch事件对应为:  pinchstart,pinchmove,pinchend,pinchcancel,pinchin,pinchout
    *   - rotate事件对应为: rotatestart,rotatemove,rotateend,rotatecancel
    *   - swipe事件对应为:  swipeleft,swiperight,swipeup,swipedown
    */
    additionalEvent?: string;
    /**
     * @desc: 时间戳.
     */
    timeStamp: number;
    /**
     * @desc: 多点手势的中心或单点手势的位置.
     */
    center:{x:number, y:number,};
    /**
     * @desc: 触摸触控的点数.
     */
    pointers: number;

    /**
     * @desc: preventDefault method.
     */
    preventDefault: ()=>void;
  }

  type GestureTapEvent = GestureEvent;
  type GesturePressEvent = GestureEvent;

  interface GesturePanEvent extends GestureEvent {
    velocity: number;
    velocityX: number;
    velocityY: number;
    direction: number;
    distance: number; // Distance moved.
    angle: number;  // Angle moved.
  }
  type GestureSwipeEvent = GesturePanEvent;

  interface GestureRotateEvent extends GestureEvent {
    rotation: number;
  }

  interface GesturePinchEvent extends GestureEvent {
    scale: number;
  }

  /**
  * @desc: 手势对象.
  *       只提供默认的手势, 不提供自定义手势的添加方法.
  */
  interface Gesture {

    /**
     * dom 默认为 window.document.body
     */
    new(dom?: HTMLElement | SVGElement): Gesture;
    
    /**
     * 清理所有设置.
     */
    dispose(): void;

    /**
    * @desc: 添加tap手势识别.
    *         只能识别 tapCount=1,2,3 的情景.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    * @return: 对同一个tapCount值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
    */
    enableTapRecognizer(cfg?:{
      tapCount:1|2|3
    }):GestureRecognizer;
    /**
    * @desc: 取消tap手势识别.
    */
    disableTapRecognizer(cfg:{
      tapCount:1|2|3
    }): void;

    /**
    * @desc: 添加pan手势识别.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    * @return: 对同一个direction值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
    */
    enablePanRecognizer(cfg:{
      pointers: 1|2|3,
    }):GestureRecognizer;
    /**
    * @desc: 取消pan手势识别.
    */
    disablePanRecognizer(cfg:{
      pointers: 1|2|3,
    }): void;

    /**
    * @desc: 添加pinch手势识别.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    */
    enablePinchRecognizer(): GestureRecognizer;
    /**
    * @desc: 取消pinch手势识别.
    */
    disablePinchRecognizer(): void;

    /**
    * @desc: 添加rotate手势识别.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    */
    enableRotateRecognizer(): GestureRecognizer;
    /**
    * @desc: 取消rotate手势识别.
    */
    disableRotateRecognizer(): void;

    /**
    * @desc: 添加press手势识别. 允许设置按压时间等.
    *         只能有一个press手势识别.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    * @param duration: 按压时间. ms
    */
    enablePressRecognizer(cfg:{
      duration:number
    }): GestureRecognizer;
    /**
    * @desc: 取消rotate手势识别.
    */
    disablePressRecognizer(): void;

    /**
    * @desc: 添加swipe手势识别.
    *         - 相同的pointers值, 只能有一个swipe手势识别.
    *         - 桌面端pointers无效.
    * @description 默认手势enable操作会重置默认手势的requireFailure关系.
    */
    enableSwipeRecognizer(cfg?:{
      velocity?:number,  // (default: 0.3) Minimal velocity required before recognizing, unit is in px per ms.
      distance?:number,  // (default: 10) Minimal distance required before recognizing
      pointers?:1|2|3,  // (default: 1)
    }): GestureRecognizer;
    /**
    * @desc: 取消swipe手势识别.
    */
    disableSwipeRecognizer(cfg?:{
      pointers: 1|2|3,
    }): void;

    /**
    * @desc: 事件监听.
    */
    on(event:'tap'|'pan'|'pinch'|'rotate'|'press'|'swipe', handler:GestureListener):Gesture;
    /**
    * @desc: 移除事件监听.
    * @param handler: 不传递时, 移除指定类型的所有监听.
    */
    off(event:'tap'|'pan'|'pinch'|'rotate'|'press'|'swipe', handler?:GestureListener):Gesture;
  }
}
