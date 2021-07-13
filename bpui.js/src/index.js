
import libs from '@bpui/libs';
import vuePlugins from './vuePlugins';
var componentInstance = require('./dyn/componentInstance');
var pkg = require('../package.json');
var componentEnum = require('./componentEnum');

function registerComponents(App/*:any*/, components/*?:string[]*/) //:Promise<void> 
{
  // vue.
  return vuePlugins(App, components);
}

function registerApp(
  routes/*: {
    routePath: Array< {path:string,component:any,[key:string]:any} >,
    basePath?: string,
  }*/,
) {

  // register app.
  libs.registerApp(routes.routePath, routes.basePath);

  // Thank the user in console.
  console.log('%c[bpui v' + pkg.version + '] Thanks for visited! 😊', 'color: #e95420;');
}

function getLayout(layouts/*:any*/, newRoute/*:any*/, oldRoute/*:any*/) {
  let newRoutePath = newRoute.path;
  if (newRoutePath[0] == '/') newRoutePath = newRoutePath.substring(1);
  for (let p in layouts) {
    if (p[0] == '/') p = p.substring(1);
    if (newRoutePath == p || newRoutePath.indexOf(p + '/') >= 0) {
      return (layouts /*as any*/)[p];
    }
  }

  // 默认值.
  return (layouts /*as any*/)['default'];
}

class Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo/*:(paddingRight:number)=>void*/) {
    componentInstance.getComponent('dialog').default.hook.addWidgetShake(foo);
  }

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo/*:(paddingRight:number)=>void*/) {
    componentInstance.getComponent('dialog').default.hook.removeWidgetShake(foo);
  }
}

var Instance = {
}

Object.defineProperty(Instance, 'registerComponents', {
  get: function () { return registerComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'registerApp', {
  get: function () { return registerApp; },
  enumerable: true
});
Object.defineProperty(Instance, 'libs', {
  get: function () { return libs; },
  enumerable: true
});
Object.defineProperty(Instance, 'ComponentName', {
  get: function () { return componentEnum.ComponentName; },
  enumerable: true
});
Object.defineProperty(Instance, 'getLayout', {
  get: function () { return getLayout; },
  enumerable: true
});

Object.defineProperty(Instance, 'hook', {
  get: function () { return new Hook(); },
  enumerable: true
});

Object.defineProperty(Instance, 'bpTableViewComponents', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableViewComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableView', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableView; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCell', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableCell; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellCenter', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableCellCenter; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellLeft', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableCellLeft; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellRight', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableCellRight; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellEditor', {
  get: function () { return componentInstance.getComponent('tableView').default.bpTableCellEditor; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarComponents', {
  get: function () { return componentInstance.getComponent('tabbar').default.bpTabbarComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbar', {
  get: function () { return componentInstance.getComponent('tabbar').default.bpTabbar; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarItem', {
  get: function () { return componentInstance.getComponent('tabbar').default.bpTabbarItem; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarItemTitle', {
  get: function () { return componentInstance.getComponent('tabbar').default.bpTabbarItemTitle; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpNavbarView', {
  get: function () { return componentInstance.getComponent('navbarView').default.bpNavbarView; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpNavbar', {
  get: function () { return componentInstance.getComponent('navbarView').default.bpNavbar; },
  enumerable: true
});
Object.defineProperty(Instance, 'setNavbarDefaultCfg', {
  get: function () { return componentInstance.getComponent('navbarView').default.setNavbarDefaultCfg; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpCheckbox', {
  get: function () { return componentInstance.getComponent('checkbox').default.bpCheckbox; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpCheckboxGroup', {
  get: function () { return componentInstance.getComponent('checkbox').default.bpCheckboxGroup; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpRadio', {
  get: function () { return componentInstance.getComponent('radio').default.bpRadio; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpRadioGroup', {
  get: function () { return componentInstance.getComponent('radio').default.bpRadioGroup; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSwitch', {
  get: function () { return componentInstance.getComponent('switch').default.bpSwitch; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpInput', {
  get: function () { return componentInstance.getComponent('input').default.bpInput; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpDialog', {
  get: function () { return componentInstance.getComponent('dialog').default.bpDialog; },
  enumerable: true
});
Object.defineProperty(Instance, 'apiWidget', {
  get: function () { return componentInstance.getComponent('dialog').default.apiWidget; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpWidget', {
  get: function () { return componentInstance.getComponent('dialog').default.bpWidget; },
  enumerable: true
});
Object.defineProperty(Instance, 'registerDialogComponents', {
  get: function () { return componentInstance.getComponent('dialog').default.registerDialogComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'registerDialogCustom', {
  get: function () { return componentInstance.getComponent('dialog').default.registerDialogCustom; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPicker', {
  get: function () { return componentInstance.getComponent('picker').default.bpPicker; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPickerCell', {
  get: function () { return componentInstance.getComponent('picker').default.bpPickerCell; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerDateDatasource', {
  get: function () { return componentInstance.getComponent('picker').default.PickerDateDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerDoubleDatasource', {
  get: function () { return componentInstance.getComponent('picker').default.PickerDoubleDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerSingleDatasource', {
  get: function () { return componentInstance.getComponent('picker').default.PickerSingleDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerThreeDatasource', {
  get: function () { return componentInstance.getComponent('picker').default.PickerThreeDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerTimeDatasource', {
  get: function () { return componentInstance.getComponent('picker').default.PickerTimeDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpActionsheet', {
  get: function () { return componentInstance.getComponent('actionsheet').default.bpActionsheet; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPopover', {
  get: function () { return componentInstance.getComponent('popover').default.bpPopover; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpFileUploader', {
  get: function () { return componentInstance.getComponent('uploader').default.bpFileUploader; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropUploader', {
  get: function () { return componentInstance.getComponent('uploader').default.bpImageCropUploader; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreviewMobile', {
  get: function () { return componentInstance.getComponent('uploader').default.bpImageCropPreviewMobile; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreviewTablet', {
  get: function () { return componentInstance.getComponent('uploader').default.bpImageCropPreviewTablet; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreview', {
  get: function () { return componentInstance.getComponent('uploader').default.bpImageCropPreview; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSelect', {
  get: function () { return componentInstance.getComponent('select').default.bpSelect; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSelectOption', {
  get: function () { return componentInstance.getComponent('select').default.bpSelectOption; },
  enumerable: true
});


class InstanceAgent {
  static get libs() { return Instance.libs; }
  static get hook() { return Instance.hook; }
  static get apiWidget() { return Instance.apiWidget; }
}

(window/* as any*/).bp = InstanceAgent;

export default Instance;