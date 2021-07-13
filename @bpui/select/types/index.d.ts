

/// <reference path="./ISelect.d.ts" />

import Vue, {VueConstructor} from 'vue';

export interface Select extends VueConstructor, bp.Select {}
export interface SelectOption extends VueConstructor, bp.SelectOption {}

export const bpSelect: Select;
export const bpSelectOption: SelectOption;
