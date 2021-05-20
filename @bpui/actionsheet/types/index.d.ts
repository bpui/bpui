/// <reference types="@bpui/dialog" />

import Vue, {VueConstructor} from 'vue';

export interface Actionsheet extends VueConstructor<Vue>, bp.Widget {}
export const bpActionsheet: Actionsheet
