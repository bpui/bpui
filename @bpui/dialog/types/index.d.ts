
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