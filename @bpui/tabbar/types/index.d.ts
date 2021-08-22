


import './vue'
import Vue, { VueConstructor } from 'vue'

export interface Tabbar extends VueConstructor, bp.Tabbar { }
export const bpTabbar: Tabbar;

export interface TabbarItem extends VueConstructor, bp.TabbarItem { }
export const bpTabbarItem: TabbarItem;

export const bpTabbarItemTitle: VueConstructor;

export const bpTabbarComponents: {
  bpTabbar,
  bpTabbarItem,
  bpTabbarItemTitle,
}