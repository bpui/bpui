'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/
import bpLibs from '@bpui/libs';
import bpInput from './input.vue';

// register alias icon.
function init() {
  bpLibs.icons.registerFontIcon('none', 'none');
  bpLibs.icons.registerAliasIcon('bp-input_warn', 'none');
}
init();

export default {
  init,
  bpInput,
}
