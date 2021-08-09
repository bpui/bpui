'use strict';

/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-07-18 21:29
* Desc: picker日期类型数据源.
*/


/**
* @desc: 获得年数据源. 参数不指定默认当前时间前后80年.
* @param from: 从哪一年开始.
* @param to:   到哪一年结束.
* @return: picker数据源.
*         [{label:'1984', value:1984}, ...]
*/
function ds_years(from, to, yearText) {
  let now = new Date();
  if (!from) {
    from = now.getFullYear()-80;
  }
  if (!to) {
    to = now.getFullYear()+80;
  }

  if (from > to) {
    let x = from;
    from = to;
    to = x;
  }

  let ds = [];
  for (let i = from; i <= to; i++) {
    ds.push({label:i+(yearText?yearText:''), value:i});
  }
  return ds;
}


/**
* @desc: 获得月数据源.
* @return: picker数据源.
*         [{label:'1月', value:0}, {label:'2月', value:1}, ...]
*/
function ds_months(monthText) {
  let ds = [];
  for (let i = 0; i < 12; i++) {
    ds.push({label:(i+1)+(monthText?monthText:''), value:i});
  }
  return ds;
}

/**
* @desc: 获得日数据源.
* @param year: 指定的年.
* @param month: 指定的月份. (从0开始)
* @return: picker数据源.
*         [{label:'1日', value:1}, {label:'2日', value:2}, ...]
*/
function ds_days(year, month, dateText) {
  let date = new Date(year, month+1, 1, 0, 0, 0, 0);
  date.setTime(date.getTime()-1000*60*60*23);

  let maxDate = date.getDate();
  let ds = [];
  for (let i = 1; i <= maxDate; i++) {
    ds.push({label:i+(dateText?dateText:''), value:i});
  }
  return ds;
}


export default class {

  /**
  * @param ds: [{label:'', value:0, children:[]}, ],  // 数据源.
  */
  constructor(cfg) {
    cfg = cfg||{};
    this.yearText = cfg.yearText||'年';
    this.monthText = cfg.monthText||'月';
    this.dateText = cfg.dateText||'日';
    this.yearFrom = cfg.yearFrom;
    this.yearTo = cfg.yearTo;
  }

  /**
  * @desc: 返回数据源组数(最多4个)
  */
  picker_datasource_groups(callback) {
    callback(3);
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
    if (groupIndex == 0) {
      let now = new Date();
      callback({
        datasource: ds_years(this.yearFrom, this.yearTo, this.yearText),
        value: now.getFullYear(),
      });
      return;
    } else if (groupIndex == 1) {
      let now = new Date();
      callback({
        datasource: ds_months(this.monthText),
        value: now.getMonth()
      });
      return;

    } else if (groupIndex == 2) {

      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let value2 = picker.getSelect(2).value;
      let now = new Date();
      let ds = ds_days(value0?value0:now.getFullYear(), (null===value1||undefined===value1)?now.getMonth():value1, this.dateText);
      callback({
        datasource: ds,
        value: value2?value2:now.getDate()
      });
      return;
    }
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
    if (groupIndex == 0) {
      picker.refreshDatasource(2).then((value)=>{});
    } else if (groupIndex == 1) {
      picker.refreshDatasource(2).then((value)=>{});
    }
  }
}
