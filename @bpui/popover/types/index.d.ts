/// <reference types="@bpui/dialog" />

import Vue, {VueConstructor} from 'vue';

export interface Popover extends VueConstructor, bp.Widget {}
export const bpPopover: Popover
