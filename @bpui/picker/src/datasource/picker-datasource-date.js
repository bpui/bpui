'use strict';

/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-07-18 21:29
* Desc: picker日期类型数据源.
*/

/**
 * 获得最接近的月
 */
function getCompareMonth(min, max, year, month) {
  let mi = min.year * 12 + min.month;
  let mx = max.year * 12 + max.month;
  let n = year * 12 + month;
  if (n < mi) {
    return min.month;
  }
  else if (n > mx) {
    return max.month;
  }
  else {
    return month;
  }
}

/**
 * 获得最接近的天
 */
function getCompareDate(min, max, year, month, date) {
  let mi = min.year * 12 * 31 + min.month * 31 + min.date;
  let mx = max.year * 12 * 31 + max.month * 31 + max.date;
  let n = year * 12 * 31 + month * 31 + date;
  if (n < mi) {
    return min.date;
  }
  else if (n > mx) {
    return max.date;
  }
  else {
    return date;
  }
}

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
    this.showMonth = cfg.hasOwnProperty('showMonth') ? cfg.showMonth : true;
    this.showDate = cfg.hasOwnProperty('showDate') ? cfg.showDate : true;

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
    else {
      if (!this.min.year) {
        this.min.year = now - 80;
      }
      if (!this.max.year) {
        this.max.year = now + 80;
      }

      if (this.min.year > this.max.year) {
        let t = this.min.year;
        this.min.year = this.max.year;
        this.max.year = t;
      }
    }
  }

  /**
  * @desc: 返回数据源组数(最多4个)
  */
  picker_datasource_groups(callback) {
    if (this.showMonth) {
      callback(this.showDate ? 3 : 2);
    }
    else {
      callback(1);
    }
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
      let value0 = picker.getSelect(0).value;
      if (value0 < this.min.year || value0 > this.max.year) {
        let now = new Date();
        value0 = now.getFullYear();
        value0 = Math.max(Math.min(value0, this.max.year), this.min.year);
      }

      callback({
        datasource: ds_years(this.min.year, this.max.year, this.yearText),
        value: value0,
      });
      return;
    } else if (groupIndex == 1) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let m = value1;
      if (m < 0) {
        m = new Date().getMonth();
      }

      m = getCompareMonth(this.min, this.max, value0, m);

      callback({
        datasource: ds_months(value0, this.min, this.max, this.monthText),
        value: m
      });
      return;

    } else if (groupIndex == 2) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let value2 = picker.getSelect(2).value;
      
      let m = value2;
      if (m < 0) {
        m = new Date().getDate();
      }
      m = getCompareDate(this.min, this.max, value0, value1, m);

      let ds = ds_days(
        value0, value1,
        this.min, this.max, 
        this.dateText);
      callback({
        datasource: ds,
        value: m
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
