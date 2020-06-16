
/// <reference path="./ICheckbox.d.ts" />

import Vue, {VueConstructor} from 'vue';

export interface Checkbox extends VueConstructor, bp.Checkbox {}

export const bpCheckbox: Checkbox;
