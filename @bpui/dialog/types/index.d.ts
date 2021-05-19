
/// <reference path="./IWidget.d.ts" />
/// <reference path="./api.d.ts" />

import Vue, {VueConstructor} from 'vue';
import './vue';

/**
 * dialog.
 */
export interface Dialog extends VueConstructor, bp.Widget {}
export const bpDialog: Dialog;
export interface Widget extends VueConstructor, bp.Widget {}
export const bpWidget: Widget;

/**
 * api.
 */
export const apiWidget:bp.WidgetApi;

/**
* @desc: 注册警告框等组件.
*/
export function registerDialogComponents(cfg:{
  alert?:any,
  confirm?:any,
  loading?:any,
  toast?:any,
}):void;

/**
* @desc: 注册自定义模式对话框组件.
* @param name 组件名称, 如果已经存在则覆盖
* @return 表明注册的名称是否不存在; 如果已经存在则覆盖, 并返回false.
*/
export function registerDialogCustom(name: string, component: any): boolean;

export interface Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo:(paddingRight:number)=>void):void;

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void):void;
}
export const hook:Hook;