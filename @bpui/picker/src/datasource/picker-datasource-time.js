'use strict';

/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-07-18 21:29
* Desc: picker 时间类型数据源.
*/


/**
* @return: picker数据源.
*         [{label:'00', value:0}, ...]
*/
function ds_hours(hourText, min, max) {
  let ds = [];
  let f = Math.max(min, 0);
  let t = Math.min(max, 23);
  let f1 = Math.min(f, t);
  let f2 = Math.max(f, t)+1;
  for (let i = f1; i < f2; i++) {
    ds.push({label:(i<10?'0'+i:i) + (hourText?' '+hourText:''), value:i});
  }
  return ds;
}


/**
* @desc: .
* @return: picker数据源.
*         [{label:'00', value:0}, {label:'01', value:1}, ...]
*/
function ds_mins(minuteText, min, max) {
  let ds = [];
  let f = Math.max(min, 0);
  let t = Math.min(max, 59);
  let f1 = Math.min(f, t);
  let f2 = Math.max(f, t)+1;
  for (let i = f1; i < f2; i++) {
    ds.push({label:(i<10?'0'+i:i) + (minuteText?' '+minuteText:''), value:i});
  }
  return ds;
}

/**
* @desc: .
* @return: picker数据源.
*         [{label:'00', value:0}, {label:'01', value:1}, ...]
*/
function ds_sec(secondText, min, max) {
  let ds = [];
  let f = Math.max(min, 0);
  let t = Math.min(max, 59);
  let f1 = Math.min(f, t);
  let f2 = Math.max(f, t)+1;
  for (let i = f1; i < f2; i++) {
    ds.push({label:(i<10?'0'+i:i) + (secondText?' '+secondText:''), value:i});
  }
  return ds;
}



export default class {

  constructor(cfg) {
    cfg = cfg || {};
    this.showSecond = cfg.hasOwnProperty('showSecond') ? cfg.showSecond : true;
    this.hourText = cfg.hourText||'时';
    this.minuteText = cfg.minuteText||'分';
    this.secondText = cfg.secondText || '秒';
    this.min = cfg.min || {hour:0, minute:0, second:0};
    this.max = cfg.max || {hour:23, minute:59, second:59};
  }

  /**
  * @desc: 返回数据源组数(最多4个)
  */
  picker_datasource_groups(callback) {
    callback(this.showSecond ? 3 : 2);
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
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    h = Math.max(Math.min(h, this.max.hour), this.min.hour);
    m = Math.max(Math.min(m, this.max.minute), this.min.minute);
    s = Math.max(Math.min(s, this.max.second), this.min.second);

    if (groupIndex == 0) {
      callback({
        datasource: ds_hours(this.hourText, this.min.hour, this.max.hour),
        value: h,
      });
    } else if (groupIndex == 1) {
      callback({
        datasource: ds_mins(this.minuteText, this.min.minute, this.max.minute),
        value: m
      });
    } else if (groupIndex == 2) {
      callback({
        datasource: ds_sec(this.secondText, this.min.second, this.max.second),
        value: s
      });
    }
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
  }
}