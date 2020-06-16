
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  type NavbarViewAnimate = 'slide'|'slideOut'|'fade'|'fadeOut'|'lift'|'liftOut'|''|string;

  interface NavbarView {
    /**
     * @desc: 设置可见度 (常规的setBarInfo方法中的hidden对微信无法起作用).
     */
    setBarHiddenForce(isHidden:boolean): NavbarView;

    /**
     * @desc: 设置导航条信息.
     */
    setBarInfo(cfg:{
      title?: string,
      /** 标题的文本颜色 */
      titleColor?: string,
      /** 背景色 */
      bgColor?: string,
      /** 是否隐藏(对微信h5无效) */
      hidden?: boolean,
    }): NavbarView;

    /**
     * @desc: 获取导航条基础信息.
     */
    getBarInfo(): {
      title?: string,
      /** 标题的文本颜色 */
      titleColor?: string,
      /** 背景色 */
      bgColor?: string,
      /** 是否隐藏 */
      hidden?: boolean,
    };

    /**
     * @desc: 设置bar左侧.
     * @param icon: 可以为 Dom, string, vue-obj, vue-component. 
     *              - ''  : 不显示图标;
     *              - null: 根据auto来自动判断是否显示返回图标.
     */
    setBarLeftItem(cfg:{
      text?: string,
      /**
       * 可以为 Dom, string, vue-obj, vue-component. 
       *  - ''  : 不显示图标;
       *  - null: 根据auto来自动判断是否显示返回图标.
       */
      icon?: any,
      textColor?: string,
    }): NavbarView;

    /**
     * @desc: 设置bar右侧.
     */
    setBarRightItem(cfg:{
      text?: string,
      /**
       * 可以为 Dom, string, vue-obj, vue-component. 
       *  - ''  : 不显示图标;
       *  - null: 根据auto来自动判断是否显示返回图标.
       */
      icon?: any,
      textColor?: string,
    }): NavbarView;


    /**
     * @desc: push a page.
     * @param animate: 所有允许的动画, 例如: slide, fade, lift
     *                 ''   - 无动画.
     *                 null - 默认动画
     */
    push(cfg:{
      path: string,
      query?: { [key: string]: any },
      animate?:NavbarViewAnimate,
      data?:any
    }):void;
    push(path:string):void;

    /**
     * @desc: pop a page.
     */
    pop():void;
    pop(cfg:{animate?:NavbarViewAnimate, data?:any}):void;

    /**
     * @desc: pop to top-page.
     */
    popToTop():void;
    popToTop(cfg:{animate?:NavbarViewAnimate, data?:any}):void;

    /**
     * @desc: pop to to route page.
     * @param n: 负值表示退后的步数.
     */
    popTo(n:number):void;
    popTo(n:number, cfg:{animate?:NavbarViewAnimate, data?:any}):void;

    /**
     * @desc: replace current route.
     *        root页面不可被replace; 如果当前是root页面, 则等同于push.
     * @param animate: 所有允许的动画, 例如: slide, fade, lift
     *                 ''   - 无动画.
     *                 null - 默认动画
     */
    replace(cfg:{
      path: string,
      query?: { [key: string]: string },
      animate?:NavbarViewAnimate,
      data?:any
    }):void;
    replace(path:string):void;
  }
}