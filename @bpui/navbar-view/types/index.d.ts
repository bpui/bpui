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
}): void;

export const bpNavbarView: NavbarView
export const bpNavbar: Navbar
