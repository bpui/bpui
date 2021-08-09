
/// <reference path="./ICheckbox.d.ts" />

import Vue, {VueConstructor} from 'vue';

export interface Checkbox extends VueConstructor, bp.Checkbox {}
export interface CheckboxGroup extends VueConstructor, bp.CheckboxGroup {}

export const bpCheckbox: Checkbox;
export const bpCheckboxGroup: CheckboxGroup;
