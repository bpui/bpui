'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/

import bpPicker from './picker.vue';
import bpPickerCell from './pickerCell.vue';

import PickerDateDatasource from './datasource/picker-datasource-date';
import PickerDoubleDatasource from './datasource/picker-datasource-double';
import PickerSingleDatasource from './datasource/picker-datasource-single';
import PickerThreeDatasource from './datasource/picker-datasource-three';
import PickerTimeDatasource from './datasource/picker-datasource-time';

// register alias icon.
function init() {
  bpLibs.icons.registerAliasIcon('bp-picker_check', 'ok');
}
init();

export default {
  init,
  bpPicker,
  bpPickerCell,

  PickerDateDatasource,
  PickerDoubleDatasource,
  PickerSingleDatasource,
  PickerThreeDatasource,
  PickerTimeDatasource,
}
