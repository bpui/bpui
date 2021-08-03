/// <reference types="@bpui/dialog" />

import Vue, {VueConstructor} from 'vue';

export interface Actionsheet extends VueConstructor<Vue>, bp.Widget {
  /**
   * @desc 强制按手机样式显示.
   * 
   * default: false
   */
  forcePhoneStyle: boolean | 'false' | 'true';
}
export const bpActionsheet: Actionsheet
