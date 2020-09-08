
import libs from '@bpui/libs';
import vuePlugins from './vuePlugins';
import { ComponentName } from '../types';
var componentInstance = require('./componentInstance');
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

  // // register css
  // componentInstance.requireComponentStyle(components);

  // Thank the user in console.
  console.log('%c[bpui v' + pkg.version + '] Thanks for visited! 😊', 'color: #e95420;');
}

class Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo:(paddingRight:number)=>void):void {
    componentInstance.getComponent('dialog').default.hook.addWidgetShake(foo);
  }

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void):void {
    componentInstance.getComponent('dialog').default.hook.removeWidgetShake(foo);
  }
}

export default class Instance {
  static registerApp = registerApp;
  static libs = libs;

  // 
  static get hook() { return new Hook(); }

  //
  static get bpNavbarView() { return componentInstance.getComponent('navbarView').default.bpNavbarView; }
  static get bpNavbar() { return componentInstance.getComponent('navbarView').default.bpNavbar; }
  //
  static get bpCheckbox() { return componentInstance.getComponent('checkbox').default.bpCheckbox }
  //
  static get bpRadio() { return componentInstance.getComponent('radio').default.bpRadio }
  static get bpRadioGroup() { return componentInstance.getComponent('radio').default.bpRadioGroup }
  //
  static get bpSwitch() { return componentInstance.getComponent('switch').default.bpSwitch }
  //
  static get bpInput() { return componentInstance.getComponent('input').default.bpInput }
  //
  static get bpDialog() {
    return componentInstance.getComponent('dialog').default.bpDialog
  }
  static get apiWidget() { return componentInstance.getComponent('dialog').default.apiWidget }
  static get bpWidget() { return componentInstance.getComponent('dialog').default.bpWidget }
  static get registerDialogComponents() { return componentInstance.getComponent('dialog').default.registerDialogComponents }
  //
  static get bpPicker() { return componentInstance.getComponent('picker').default.bpPicker }
  static get PickerDateDatasource() { return componentInstance.getComponent('picker').default.PickerDateDatasource }
  static get PickerDoubleDatasource() { return componentInstance.getComponent('picker').default.PickerDoubleDatasource }
  static get PickerSingleDatasource() { return componentInstance.getComponent('picker').default.PickerSingleDatasource }
  static get PickerThreeDatasource() { return componentInstance.getComponent('picker').default.PickerThreeDatasource }
  static get PickerTimeDatasource() { return componentInstance.getComponent('picker').default.PickerTimeDatasource }
  //
  static get bpActionsheet() { return componentInstance.getComponent('actionsheet').default.bpActionsheet }
  //
  static get bpPopover() { return componentInstance.getComponent('popover').default.bpPopover }
}


class InstanceAgent {
  static get libs() { return Instance.libs; }
  static get hook() { return Instance.hook; }
  static get apiWidget() { return Instance.apiWidget; }
}

((window||window) as any).bp = InstanceAgent;