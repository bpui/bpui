
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-09 20:25
* Desc: 
*/

declare namespace bp {
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
  interface Timer {
    new():Timer;

    /**
     * @desc 注销计时器, 停止并删除所有在运行中的timer.
     */
    dispose():void;

    /**
    * @desc: Promise方式计时器.(会在对象释放前安全停止)
    * @return: Promise
    */
    sleep(ms:number):Promise<void>;

    /**
    * @desc: 启动计时器.
    */
    setTimeout(fn:()=>void, tm:number):NodeJS.Timeout;

    /**
    * @desc: 清除计时器.
    */
    clearTimeout(t:NodeJS.Timeout):void;

    /**
    * @desc: 启动计时器.
    */
    setInterval(fn:()=>void, tm:number):NodeJS.Timeout;

    /**
    * @desc: 清除计时器.
    */
    clearInterval(t:NodeJS.Timeout):void;

    /**
    * @desc: 启动帧动画.
    */
    requestAnimationFrame(fn:(tm:number)=>void):number;

    /**
    * @desc: 清除帧动画.
    */
    cancelAnimationFrame(t:number):void;

    /**
    * @desc: 清除所有计时器.
    */
    clearAllTimeout():void;

    /**
    * @desc: 清除所有计时器.
    */
    clearAllInterval():void;
    
    /**
    * @desc: 清除所有帧动画.
    */
    clearAllAnimationFrame():void;
    
    /**
    * @desc: 清除所有计时器与帧动画.
    */
    clearAll():void;
  }
}