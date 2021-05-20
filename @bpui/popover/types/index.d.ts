/// <reference types="@bpui/dialog" />

import Vue, {VueConstructor} from 'vue';

export interface Popover extends VueConstructor<Vue>, bp.Widget {}
export const bpPopover: Popover
