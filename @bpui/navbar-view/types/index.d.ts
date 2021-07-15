/// <reference types="@bpui/libs" />

import './vue'
import { NavbarView, Navbar } from './navbarView'

/**
 * @desc: Vue plugin.
 */
export function VuePlugin(): any

/**
 * set navbarview default config.
 */
export function setNavbarDefaultCfg(cfg: {
  /**
   * default retain page dom in `push` method.
   */
  retainPageInPush?: boolean,
  /**
   * It will refresh page when change routes between different layouts.
   */
  allLayouts?: string[],
}): void;

export const bpNavbarView: NavbarView
export const bpNavbar: Navbar
