'use strict';

/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-07-18 21:29
* Desc: 单列数据源picker.
*/

export default class {

  /**
  * @param ds: [{label:'', value:0}, ],  // 数据源.
  */
  constructor(ds) {
    ds = ds||[];
    if (!(ds && Array.isArray(ds))) {
      throw new Error('Picker datasource must is array & isnt null');
    }
    this.ds = ds;
  }

  /**
  * @desc: 返回数据源组数(最多4个)
  */
  picker_datasource_groups(callback) {
    callback(1);
  }

  /**
  * @desc: 返回指定组的数据源
  * @return: 
  *       {
            datasource: [{label:'', value:0}, ],  // 数据源.
            value:      0,  // 选择的值.
          }
  */
  picker_datasource(groupIndex, picker, callback) {
    callback({
      datasource: this.ds,
      value: this.ds.length > 0? this.ds[0].value: null,
    });
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
  }
}

