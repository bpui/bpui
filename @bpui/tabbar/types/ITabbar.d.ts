
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  interface Tabbar {
    /**
     * @desc: 初始选择的tabIndex; 默认为0;
     */
    tabIndex: number;

    /**
     * @desc 当前是否显示; 可双向绑定;
     * 
     * 显示状态的改变只会在当前页面有效; 路由改变后就会与初始设置的显示状态一致.
     */
    value: boolean;

    /**
     * @desc 指定一个路由路径, 当前路由是在指定值之下时, $bpTabbar表示当前tabbar实例.
     * 
     * 如果为空, 则所有路由页面下, $bpTabbar都是当前实例.
     */
    routePath: string;
    
    /**
    * @desc: 设置可见度.
    */
    setHidden(isHidden: boolean): void;
    /**
    * @desc: 是否隐藏.
    */
    isHidden(): boolean;
  }


  interface TabbarItem {
    /**
     * @desc 指定一个路由路径, 当前路由是在指定值之下时, $bpTabbar表示当前tabbar实例.
     * 
     * 如果为空, 则所有路由页面下, $bpTabbar都是当前实例.
     */
    routePath: string;
  }
}