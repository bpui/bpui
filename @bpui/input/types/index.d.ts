

/// <reference path="./IInput.d.ts" />

import Vue, {VueConstructor} from 'vue';

export interface Input extends VueConstructor, bp.Input {}

export const bpInput: Input;
