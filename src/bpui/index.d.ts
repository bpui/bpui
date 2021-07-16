
// @ts-nocheck

import '../../bpui.js';
import Vue, {VueConstructor} from 'vue';

declare module '../../bpui.js/types/index' {
  export const bpSelect: VueConstructor;
  export const bpOption: VueConstructor;
}

// @ts-check
