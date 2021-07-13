

/// <reference path="./ISelect.d.ts" />

import Vue, {VueConstructor} from 'vue';

export interface Select extends VueConstructor, bp.Select {}

export const bpSelect: Select;
