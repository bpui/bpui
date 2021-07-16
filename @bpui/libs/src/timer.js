'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-28 16:22
* Desc: timer用于在一个component内进行setTimeout等延时操作, 并且在组件销毁时清理定时器, 避免出现错误.
*/

/**
* @desc 
*    可在组件释放时自动释放所有的timeout计时器.
*     - 在created中:             this.timer = new timer();
*     - 在beforeDestroy中:       this.timer.dispose();
*     - 在使用计时器的函数中调用:   
                                var t = this.timer.setTimeout(fn, tm);
                                this.timer.clearTimeout(t);
                                this.timer.clearAllTimeout();
*     - 在使用帧动画的函数中调用:   
                                var t = this.timer.requestAnimationFrame(fn);
                                this.timer.cancelAnimationFrame(t);
                                this.timer.clearAllAnimationFrame();
*     - 使用Promise方式启动计时器: (会在对象释放前安全停止)
                                this.timer.sleep(1000)
                                .then(()=>{
                                });
*/
export default class Timer {
  constructor() {
    this._timeoutList = [];
    this._requestAniList = [];
    this._intervalList = [];
  }

  dispose() {
    this.clearAll();
  }

  /**
  * @desc: Promise方式计时器.(会在对象释放前安全停止)
  * @return: Promise
  */
  sleep(ms) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
      try {
        if (ms >= 0) {
          let timer = setTimeout(function(){
            let i = ctx._timeoutList.indexOf(timer);
            if (i >= 0)
              ctx._timeoutList.splice(i, 1);
            resolve();
          }, ms);
          ctx._timeoutList.push(timer);
        } else {
          resolve();
        }
      } catch(err) {
        reject(err);
      }
    });
  }

  /**
  * @desc: 启动计时器.
  */
  setTimeout(fn, tm) {
    let ctx = this;
    let t = setTimeout(function() {
      fn();
      let i = ctx._timeoutList.indexOf(t);
      if (i >= 0)
        ctx._timeoutList.splice(i, 1);
    }, tm);
    if (t)
      this._timeoutList.push(t);
    return t;
  }

  /**
  * @desc: 清除计时器.
  */
  clearTimeout(t) {
    if (!t) return;
    clearTimeout(t);
    let i = this._timeoutList.indexOf(t);
    if (i >= 0)
      this._timeoutList.splice(i, 1);
  }

  /**
  * @desc: 启动计时器.
  */
  setInterval(fn, tm) {
    let ctx = this;
    let t = setInterval(function() {
      fn();
    }, tm);
    if (t)
      this._intervalList.push(t);
    return t;
  }

  /**
  * @desc: 清除计时器.
  */
  clearInterval(t) {
    if (!t) return;
    clearInterval(t);
    let i = this._intervalList.indexOf(t);
    if (i >= 0)
      this._intervalList.splice(i, 1);
  }

  /**
  * @desc: 启动帧动画.
  */
  requestAnimationFrame(fn) {
    if (!fn) return null;
    let ctx = this;
    let t = requestAnimationFrame(function(tm){
      fn(tm);
      let i = ctx._requestAniList.indexOf(t);
      if (i >= 0)
        ctx._requestAniList.splice(i, 1);
    });
    if (t)
      this._requestAniList.push(t);
    return t;
  }

  /**
  * @desc: 清除帧动画.
  */
  cancelAnimationFrame(t) {
    if (!t) return;
    cancelAnimationFrame(t);
    let i = this._requestAniList.indexOf(t);
    if (i >= 0)
      this._requestAniList.splice(i, 1);
  }

  /**
  * @desc: 清除所有计时器.
  */
  clearAllTimeout() {
    for(let t of this._timeoutList) {
      if (t) {
        clearTimeout(t);
      }
    }
    this._timeoutList = [];
  }

  /**
  * @desc: 清除所有计时器.
  */
  clearAllInterval() {
    for(let t of this._intervalList) {
      if (t) {
        clearInterval(t);
      }
    }
    this._intervalList = [];
  }
  
  /**
  * @desc: 清除所有帧动画.
  */
  clearAllAnimationFrame() {
    for(let t of this._requestAniList) {
      if (t) {
        cancelAnimationFrame(t);
      }
    }
    this._requestAniList = [];
  }
  
  /**
  * @desc: 清除所有计时器与帧动画.
  */
  clearAll() {
    this.clearAllTimeout();
    this.clearAllAnimationFrame();
    this.clearAllInterval();
  }
}
