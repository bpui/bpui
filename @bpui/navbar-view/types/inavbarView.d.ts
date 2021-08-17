
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
     * @desc: 用于导航的地址查询参数名.(只能指定一次,动态修改无效)
     * 
     * 默认为 '_'
     */
    seqName: string;


    /**
     * @desc: 最大的page层级 (初次设置之后修改无效).
     * 
     * 默认为 Number.MAX_SAFE_INTEGER
     */
    cacheSize: number;

    /**
     * @desc 表明是否为app模式, app模式路由的最上层为 {@link rootRoutePath}; 否则为浏览器正常history
     * 
     * (只能指定一次,动态修改无效)
     */
    appMode: boolean;

    /**
     * @desc navbar中所有页面的样式.
     */
    pageClass: string[] | string;

    /**
     * @desc: page背景色.
     */
    pageBgColor: string;
    /**
     * @desc: 默认的切换动画.
     * 
     * 默认为 none
     */
    pageAnimation: string;
    /**
     * @desc: 初始显示的隐藏状态.
     * 
     * 默认为 true
     */
    barHidden: boolean;

    /**
     * @desc: bar背景色.
     */
    barBgColor: string;

    /**
     * @desc: 标题颜色.
     */
    barTitleColor: string;

    /**
     * @desc: 按钮颜色.
     */
    barTextColor: string;

    /**
     * @desc: 是否包含状态栏. (ios webapp模式为true, 其他默认为false).
     */
    containStatusBar: boolean;
    
    /**
     * @desc 使用 router-link 或 方法跳转到 #xxx anchor时的页面滚动行为. 默认为 smooth.
     */
    scrollToAnchorBehavior: 'instant' | 'smooth';
    
    /**
     * @desc: 自动back按钮组件.
     */
    backIconComponent: Object;
    /**
     * @desc: 加载页面时显示的组件.
     */
    loadingComponent: Object;
    /**
     * @desc: 加载错误时显示的组件.
     */
    errorComponent: Object;
    /**
     * @desc: Delay before showing the loading component.
     * 
     * Default: 200ms.
     */
    loadingDelay: number;
    /**
     * @desc: load component timeout. 
     * 
     * Default: Infinity.
     */
    loadingTimeout: number;

    /**
     * @desc: 根页面route路径.
     * 
     * Default: /
     */
    rootRoutePath: string;
    /**
     * @desc: 根页面参数.
     */
    rootRouteParams: Object;

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
     * @param retainPage: 是否保留当前页面dom.
     */
    push(cfg:{
      path: string,
      query?: { [key: string]: any },
      animate?:NavbarViewAnimate,
      data?:any
    }, retainPage?:boolean):void;
    push(path:string, retainPage?:boolean):void;

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