'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: qiahao
* Date: 2020-09-14
* Desc:
*/

import bpLibs from "@bpui/libs";
import bpSelect from './select.vue';
import bpSelectOption from './selectOption.vue';

// register alias icon.
function init() {
  bpLibs.icons.registerAliasIcon('bp-select_arrowDown', 'arrowDown');
  bpLibs.icons.registerAliasIcon('bp-select_close', 'cancel');
}
init();

export default {
  init,
  bpSelect,
  bpSelectOption,
}
