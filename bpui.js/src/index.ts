
import libs from '@bpui/libs';
import vuePlugins from './vuePlugins';
var componentInstance = require('./componentInstance');
var pkg = require('../package.json');
var componentEnum = require('./componentEnum');

function registerComponents(App:any, components?:string[]):Promise<void> {
  // vue.
  return vuePlugins(App, components);
}

function registerApp(
  routes: {
    routePath: Array< {path:string,component:any,[key:string]:any} >,
    basePath?: string,
  },
): void {

  // register app.
  libs.registerApp(routes.routePath, routes.basePath);

  // // register css
  // componentInstance.requireComponentStyle(components);

  // Thank the user in console.
  console.log('%c[bpui v' + pkg.version + '] Thanks for visited! 😊', 'color: #e95420;');
}

function getLayout(layouts:any, newRoute:any, oldRoute:any):any {
  let newRoutePath = newRoute.path;
  if (newRoutePath[0] == '/') newRoutePath = newRoutePath.substring(1);
  for (let p in layouts) {
    if (p[0] == '/') p = p.substring(1);
    if (newRoutePath == p || newRoutePath.indexOf(p + '/') >= 0) {
      return (layouts as any)[p];
    }
  }

  // 默认值.
  return (layouts as any)['default'];
}

class Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo:(paddingRight:number)=>void):void {
    componentInstance.getComponent('dialog', (err, ms) => {
      ms.default.hook.addWidgetShake(foo);
    })
  }

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void):void {
    componentInstance.getComponent('dialog', (err, ms) => {
      ms.default.hook.removeWidgetShake(foo);
    })
  }
}

export default class Instance {
  static registerComponents = registerComponents;
  static registerApp = registerApp;
  static libs = libs;
  static ComponentName = componentEnum.ComponentName;
  static getLayout = getLayout;

  // 
  static get hook() { return new Hook(); }

  //
  static get bpTableViewComponents() { return componentInstance.getComponent('tableView').default.bpTableViewComponents; }
  static get bpTableView() { return componentInstance.getComponent('tableView').default.bpTableView; }
  static get bpTableCell() { return componentInstance.getComponent('tableView').default.bpTableCell; }
  static get bpTableCellCenter() { return componentInstance.getComponent('tableView').default.bpTableCellCenter; }
  static get bpTableCellLeft() { return componentInstance.getComponent('tableView').default.bpTableCellLeft; }
  static get bpTableCellRight() { return componentInstance.getComponent('tableView').default.bpTableCellRight; }
  static get bpTableCellEditor() { return componentInstance.getComponent('tableView').default.bpTableCellEditor; }
  
  
  //
  static get bpTabbarComponents() { return componentInstance.getComponent('tabbar').default.bpTabbarComponents; }
  static get bpTabbar() { return componentInstance.getComponent('tabbar').default.bpTabbar; }
  static get bpTabbarItem() { return componentInstance.getComponent('tabbar').default.bpTabbarItem; }
  static get bpTabbarItemIcon() { return componentInstance.getComponent('tabbar').default.bpTabbarItemIcon; }
  static get bpTabbarItemTitle() { return componentInstance.getComponent('tabbar').default.bpTabbarItemTitle; }
  
  //
  static get bpNavbarView() {
    return componentInstance.getComponent('navbarView').default.bpNavbarView;
  }
  static get bpNavbar() { return componentInstance.getComponent('navbarView').default.bpNavbar; }
  static get setNavbarDefaultCfg():any { return componentInstance.getComponent('navbarView').default.setNavbarDefaultCfg; }

  //
  static get bpCheckbox() { return componentInstance.getComponent('checkbox').default.bpCheckbox }
  static get bpCheckboxGroup() { return componentInstance.getComponent('checkbox').default.bpCheckboxGroup }
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
  static get registerDialogComponents(): any { return componentInstance.getComponent('dialog').default.registerDialogComponents }
  static get registerDialogCustom(): any { return componentInstance.getComponent('dialog').default.registerDialogCustom }

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
  //
  static get bpFileUploader() { return componentInstance.getComponent('uploader').default.bpFileUploader }
  static get bpImageCropUploader() { return componentInstance.getComponent('uploader').default.bpImageCropUploader }
  static get bpImageCropPreviewMobile() { return componentInstance.getComponent('uploader').default.bpImageCropPreviewMobile }
  static get bpImageCropPreviewTablet() { return componentInstance.getComponent('uploader').default.bpImageCropPreviewTablet }
  static get bpImageCropPreview() { return componentInstance.getComponent('uploader').default.bpImageCropPreview }
}


class InstanceAgent {
  static get libs() { return Instance.libs; }
  static get hook() { return Instance.hook; }
  static get apiWidget() { return Instance.apiWidget; }
}

((window||window) as any).bp = InstanceAgent;