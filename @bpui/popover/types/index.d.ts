/// <reference types="@bpui/dialog" />

import Vue, {VueConstructor} from 'vue';

export interface Popover extends VueConstructor<Vue>, bp.Widget {
  /**
  * @desc: 方向.
  */
  direction: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  /**
  * @desc: 触发类型. 
  */
  trigger: 'hover' | 'click';
  /**
  * @desc: 绑定显示的元素.
  */
  bind: any; /*VueConstructor*/
}
export const bpPopover: Popover;
