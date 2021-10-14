
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

function getComponentInstance(name) {
  let c = componentInstance.getComponent(name);
  return c.default || c;
}

class Hook {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo/*:(paddingRight:number)=>void*/) {
    getComponentInstance('dialog').hook.addWidgetShake(foo);
  }

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo/*:(paddingRight:number)=>void*/) {
    getComponentInstance('dialog').hook.removeWidgetShake(foo);
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
  get: function () { return getComponentInstance('tableView').bpTableViewComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableView', {
  get: function () { return getComponentInstance('tableView').bpTableView; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCell', {
  get: function () { return getComponentInstance('tableView').bpTableCell; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellCenter', {
  get: function () { return getComponentInstance('tableView').bpTableCellCenter; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellLeft', {
  get: function () { return getComponentInstance('tableView').bpTableCellLeft; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellRight', {
  get: function () { return getComponentInstance('tableView').bpTableCellRight; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTableCellEditor', {
  get: function () { return getComponentInstance('tableView').bpTableCellEditor; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarComponents', {
  get: function () { return getComponentInstance('tabbar').bpTabbarComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbar', {
  get: function () { return getComponentInstance('tabbar').bpTabbar; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarItem', {
  get: function () { return getComponentInstance('tabbar').bpTabbarItem; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpTabbarItemTitle', {
  get: function () { return getComponentInstance('tabbar').bpTabbarItemTitle; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpNavbarView', {
  get: function () { return getComponentInstance('navbarView').bpNavbarView; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpNavbar', {
  get: function () { return getComponentInstance('navbarView').bpNavbar; },
  enumerable: true
});
Object.defineProperty(Instance, 'setNavbarDefaultCfg', {
  get: function () { return getComponentInstance('navbarView').setNavbarDefaultCfg; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpCheckbox', {
  get: function () { return getComponentInstance('checkbox').bpCheckbox; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpCheckboxGroup', {
  get: function () { return getComponentInstance('checkbox').bpCheckboxGroup; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpRadio', {
  get: function () { return getComponentInstance('radio').bpRadio; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpRadioGroup', {
  get: function () { return getComponentInstance('radio').bpRadioGroup; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSwitch', {
  get: function () { return getComponentInstance('switch').bpSwitch; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpInput', {
  get: function () { return getComponentInstance('input').bpInput; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpDialog', {
  get: function () { return getComponentInstance('dialog').bpDialog; },
  enumerable: true
});
Object.defineProperty(Instance, 'apiWidget', {
  get: function () { return getComponentInstance('dialog').apiWidget; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpWidget', {
  get: function () { return getComponentInstance('dialog').bpWidget; },
  enumerable: true
});
Object.defineProperty(Instance, 'registerDialogComponents', {
  get: function () { return getComponentInstance('dialog').registerDialogComponents; },
  enumerable: true
});
Object.defineProperty(Instance, 'registerDialogCustom', {
  get: function () { return getComponentInstance('dialog').registerDialogCustom; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPicker', {
  get: function () { return getComponentInstance('picker').bpPicker; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPickerCell', {
  get: function () { return getComponentInstance('picker').bpPickerCell; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerDateDatasource', {
  get: function () { return getComponentInstance('picker').PickerDateDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerDoubleDatasource', {
  get: function () { return getComponentInstance('picker').PickerDoubleDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerSingleDatasource', {
  get: function () { return getComponentInstance('picker').PickerSingleDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerThreeDatasource', {
  get: function () { return getComponentInstance('picker').PickerThreeDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'PickerTimeDatasource', {
  get: function () { return getComponentInstance('picker').PickerTimeDatasource; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpActionsheet', {
  get: function () { return getComponentInstance('actionsheet').bpActionsheet; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpPopover', {
  get: function () { return getComponentInstance('popover').bpPopover; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpFileUploader', {
  get: function () { return getComponentInstance('uploader').bpFileUploader; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropUploader', {
  get: function () { return getComponentInstance('uploader').bpImageCropUploader; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreviewMobile', {
  get: function () { return getComponentInstance('uploader').bpImageCropPreviewMobile; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreviewTablet', {
  get: function () { return getComponentInstance('uploader').bpImageCropPreviewTablet; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpImageCropPreview', {
  get: function () { return getComponentInstance('uploader').bpImageCropPreview; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSelect', {
  get: function () { return getComponentInstance('select').bpSelect; },
  enumerable: true
});
Object.defineProperty(Instance, 'bpSelectOption', {
  get: function () { return getComponentInstance('select').bpSelectOption; },
  enumerable: true
});


class InstanceAgent {
  static get libs() { return Instance.libs; }
  static get hook() { return Instance.hook; }
  static get apiWidget() { return Instance.apiWidget; }
}

(window/* as any*/).bp = InstanceAgent;

export default Instance;