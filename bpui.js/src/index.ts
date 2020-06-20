
import libs from '@bpui/libs';
import vuePlugins from './vuePlugins';
import { ComponentName } from '../types';
import { getComponent } from './componentInstance';
var pkg = require('../package.json');

function registerApp(
  routes: {
    routePath: Array< {path:string,component:any,[key:string]:any} >,
    basePath?: string,
  },
  App:any,
  components?:ComponentName[]
): void {

  // vue.
  vuePlugins(App, components);

  // register app.
  libs.registerApp(routes.routePath, routes.basePath);

  // Thank the user in console.
  console.log('%c[bpui v' + pkg.version + '] Thanks for visited! 😊', 'color: #e95420;');
}

class Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo:(paddingRight:number)=>void):void {
    getComponent('dialog').default.hook.addWidgetShake(foo);
  }

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void):void {
    getComponent('dialog').default.hook.removeWidgetShake(foo);
  }
}

export default class Instance {
  static registerApp = registerApp;
  static libs = libs;

  // 
  static get hook() { return new Hook(); }

  //
  static get bpNavbarView() { return getComponent('navbarView').default.bpNavbarView; }
  //
  static get bpCheckbox() { return getComponent('checkbox').default.bpCheckbox }
  //
  static get bpRadio() { return getComponent('radio').default.bpRadio }
  static get bpRadioGroup() { return getComponent('radio').default.bpRadioGroup }
  //
  static get bpSwitch() { return getComponent('switch').default.bpSwitch }
  //
  static get bpInput() { return getComponent('input').default.bpInput }
  //
  static get bpDialog() { return getComponent('dialog').default.bpDialog }
  static get bpWidget() { return getComponent('dialog').default.bpWidget }
  static get registerDialogComponents() { return getComponent('dialog').default.registerDialogComponents }
  //
  static get bpPicker() { return getComponent('picker').default.bpPicker }
  static get PickerDateDatasource() { return getComponent('picker').default.PickerDateDatasource }
  static get PickerDoubleDatasource() { return getComponent('picker').default.PickerDoubleDatasource }
  static get PickerSingleDatasource() { return getComponent('picker').default.PickerSingleDatasource }
  static get PickerThreeDatasource() { return getComponent('picker').default.PickerThreeDatasource }
  static get PickerTimeDatasource() { return getComponent('picker').default.PickerTimeDatasource }
  //
  static get bpActionsheet() { return getComponent('actionsheet').default.bpActionsheet }
  //
  static get bpPopover() { return getComponent('popover').default.bpPopover }
}
