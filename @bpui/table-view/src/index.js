'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/

import bpLibs from '@bpui/libs';

import bpTableView from './tableView.vue';
import bpTableCell from './tableCell.vue';
import bpTableCellCenter from './tableCellCenter.vue';
import bpTableCellLeft from './tableCellLeft.vue';
import bpTableCellRight from './tableCellRight.vue';
import bpTableCellEditor from './tableCellEditor.vue';

// register alias icon.
function init() {
  bpLibs.icons.registerFontIcon('none', 'none');
  bpLibs.icons.registerAliasIcon('bp-tableView_next', 'arrowRight');
}
init();

const bpTableViewComponents = {
  bpTableView,
  bpTableCell,
  bpTableCellCenter,
  bpTableCellLeft,
  bpTableCellRight,
  bpTableCellEditor,
};

export default {
  init,
  bpTableViewComponents,
  bpTableView,
  bpTableCell,
  bpTableCellCenter,
  bpTableCellLeft,
  bpTableCellRight,
  bpTableCellEditor,
}
