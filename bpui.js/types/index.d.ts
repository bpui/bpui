import '@bpui/libs';
export * from '@bpui/navbar-view';
export * from '@bpui/checkbox';
export * from '@bpui/radio';
export * from '@bpui/switch';
export * from '@bpui/input';
export * from '@bpui/dialog';
export * from '@bpui/picker';
export * from '@bpui/actionsheet';
export * from '@bpui/popover';

export enum ComponentName {
  navbarView = 'navbarView',
  checkbox = 'checkbox',
  radio = 'radio',
  switch = 'switch',
  input = 'input',
  dialog = 'dialog',
  picker = 'picker',
  actionsheet = 'actionsheet',
  popover = 'popover',
}

export const libs: typeof bp.bpLibs;


/**
 * @desc: 注册app.
 * @param routes: 此app所需的routes结构.
 *      path='*' 的路由为404路由.
 * @param App: 传递Vue.
 * @param components: 按需加载指定的组件. 不提供则加载所有组件.
 *                    会自动加载所指定的组件的插件.
 */
export function registerApp(
  routes: {
    routePath: Array< {path:string,component:any,[key:string]:any} >,
    basePath?: string,
  },
  App:any,
  components?:ComponentName[]
): void;


export interface Hook {
  /**
   * @desc: 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo:(paddingRight:number)=>void):void;

  /**
   * @desc: 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void):void;
}
export const hook:Hook;