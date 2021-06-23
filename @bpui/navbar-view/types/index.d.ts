/// <reference types="@bpui/libs" />

import './vue'
import { NavbarView, Navbar } from './navbarView'

/**
 * @desc: Vue plugin.
 */
export function VuePlugin(): any

/**
 * set navbarview default config.
 * @param cfg.retainPageInPush: default retain page dom in `push` method.
 */
export function setNavbarDefaultCfg(cfg: {
  retainPageInPush: boolean
}): void;

export const bpNavbarView: NavbarView
export const bpNavbar: Navbar
