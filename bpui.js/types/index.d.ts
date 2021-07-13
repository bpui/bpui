import "@bpui/libs/types";
export * from "@bpui/navbar-view/types";
export * from "@bpui/table-view/types";
export * from "@bpui/tabbar/types";
export * from "@bpui/checkbox/types";
export * from "@bpui/radio/types";
export * from "@bpui/switch/types";
export * from "@bpui/input/types";
export * from "@bpui/dialog/types";
export * from "@bpui/picker/types";
export * from "@bpui/actionsheet/types";
export * from "@bpui/popover/types";
export * from "@bpui/uploader/types";
export * from '@bpui/select/types';

export enum ComponentName {
  navbarView = "navbarView",
  tableView = "tableView",
  checkbox = "checkbox",
  tabbar = "tabbar",
  radio = "radio",
  switch = "switch",
  input = "input",
  dialog = "dialog",
  picker = "picker",
  actionsheet = "actionsheet",
  popover = "popover",
  uploader = "uploader",
  select = 'select',
}

export const libs: typeof bp.bpLibs;

/**
 * @desc: 注册动态组件.
 * @param App: 传递Vue.
 * @param components: 按需加载指定的组件. 不提供则加载所有组件.
 *                    会自动加载所指定的组件的插件.
 */
export function registerComponents(App: any, components?: ComponentName[]): Promise<void>;

/**
 * @desc: 注册app.
 * @param routes: 此app所需的routes结构.
 *      path='*' 的路由为404路由.
 */
export function registerApp(routes: {
  routePath: Array<{ path: string; component: any; [key: string]: any }>;
  basePath?: string;
}): void;

/**
 * 通过route来获得适合的layout组件.
 * @param layouts
 * @param newRoute
 * @param oldRoute
 */
export function getLayout(layouts: any, newRoute: bp.Location, oldRoute: bp.Location): any;

export interface Hook {
  /**
   * @desc: 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo: (paddingRight: number) => void): void;

  /**
   * @desc: 移除页面抖动hook.
   */
  removeWidgetShake(foo: (paddingRight: number) => void): void;
}
export const hook: Hook;
