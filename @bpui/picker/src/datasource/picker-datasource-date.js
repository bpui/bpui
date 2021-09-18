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
function ds_months(year, min, max, monthText) {
  let f1; let f2;

  if (year > min.year) {
    f1 = 0;
  } else {
    f1 = min.month;
  }
  
  if (year < max.year) {
    f2 = 12;
  } else {
    f2 = max.month + 1;
  }
  
  let ds = [];
  for (let i = f1; i < f2; i++) {
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
function ds_days(year, month, min, max, dateText) {
  let f1; let f2;
  
  if (year > min.year) {
    f1 = 1;
  } else if (month > min.month) {
    f1 = 1;
  } else {
    f1 = min.date;
  }
  
  if (year < max.year) {
    f2 = 31;
  } else if (month < max.month) {
    f2 = 31;
  } else {
    f2 = max.date;
  }

  let date = new Date(year, month+1, 1, 0, 0, 0, 0);
  date.setTime(date.getTime()-1000*60*60*23);

  let maxDate = date.getDate();
  f2 = Math.min(f2, maxDate);

  let ds = [];
  for (let i = f1; i <= f2; i++) {
    ds.push({label:i+(dateText?dateText:''), value:i});
  }
  return ds;
}


export default class {

  /**
  * @param ds: [{label:'', value:0, children:[]}, ],  // 数据源.
  */
  constructor(cfg) {
    cfg = cfg || {};
    this.yearText = cfg.yearText || '年';
    this.monthText = cfg.monthText || '月';
    this.dateText = cfg.dateText || '日';
    this.min = cfg.min || { year: null, month: 0, date: 1 };
    this.max = cfg.max || { year: null, month: 11, date: 31 };
    
    this.min.month = Number.isInteger(this.min.month) ? this.min.month : 0;
    this.min.date = Number.isInteger(this.min.date) ? this.min.date : 1;
    this.max.month = Number.isInteger(this.max.month) ? this.max.month : 11;
    this.max.date = Number.isInteger(this.max.date) ? this.max.date : 31;

    let now = new Date().getFullYear();
    if (!(this.min.year) && !(this.max.year)) {
      this.min.year = now - 80;
      this.max.year = now + 80;
    }
    else if (!this.min.year) {
      this.min.year = now - 80;
      this.min.year = Math.min(this.min.year, this.max.year);
    }
    else if (!this.max.year) {
      this.max.year = now + 80;
      this.max.year = Math.max(this.min.year, this.max.year);
    }
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
      now = Math.max(Math.min(now.getFullYear(), this.max.year), this.min.year);
      callback({
        datasource: ds_years(this.min.year, this.max.year, this.yearText),
        value: now,
      });
      return;
    } else if (groupIndex == 1) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let m;
      
      let now = new Date();
      if (value0 > this.min.year) {
        m = value1;
      }
      else {
        m = now.getMonth();
        m = Math.max(Math.min(m, this.max.month), this.min.month);
      }

      callback({
        datasource: ds_months(value0, this.min, this.max, this.monthText),
        value: m?m:now.getMonth()
      });
      return;

    } else if (groupIndex == 2) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let value2 = picker.getSelect(2).value;
      let s;
      if (value0 > this.min.year) {
        s = value2;
      }
      else if (value1 > this.min.month) {
        s = value2;
      }
      else if (value2 > this.min.date) {
        s = value2;
      }
      else if (value0 < this.max.year) {
        s = this.min.date;
      }
      else if (value1 < this.max.month) {
        s = this.min.date;
      }
      else {
        s = Math.max(Math.min(value2, this.max.date), this.min.date);
      }

      let now = new Date();
      let ds = ds_days(
        value0, value1,
        this.min, this.max, 
        this.dateText);
      callback({
        datasource: ds,
        value: s?s:now.getDate()
      });
      return;
    }
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
    if (groupIndex == 0) {
      picker.refreshDatasource(1).then((value) => {
        picker.refreshDatasource(2).then((value)=>{});
      });
    } else if (groupIndex == 1) {
      picker.refreshDatasource(2).then((value)=>{});
    }
  }
}
