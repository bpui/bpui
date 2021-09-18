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
  let f = Math.max(min.hour, 0);
  let t = Math.min(max.hour, 23);
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
function ds_mins(minuteText, min, max, hour) {
  let ds = [];
  let f1; let f2;

  if (hour > min.hour) {
    f1 = 0;
  } else {
    f1 = min.minute;
  }
  
  if (hour < max.hour) {
    f2 = 60;
  } else {
    f2 = max.minute + 1;
  }

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
function ds_sec(secondText, min, max, hour, minute) {
  let ds = [];
  let f1; let f2;
  
  if (hour > min.hour) {
    f1 = 0;
  } else if (minute > min.minute) {
    f1 = 0;
  } else {
    f1 = min.second;
  }
  
  if (hour < max.hour) {
    f2 = 60;
  } else if (minute < max.minute) {
    f2 = 60;
  } else {
    f2 = max.second + 1;
  }

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
    this.max = cfg.max || { hour: 23, minute: 59, second: 59 };
    
    this.min.hour = Number.isInteger(this.min.hour) ? this.min.hour : 0;
    this.min.minute = Number.isInteger(this.min.minute) ? this.min.minute : 0;
    this.min.second = Number.isInteger(this.min.second) ? this.min.second : 0;
    this.max.hour = Number.isInteger(this.max.hour) ? this.max.hour : 23;
    this.max.minute = Number.isInteger(this.max.minute) ? this.max.minute : 59;
    this.max.second = Number.isInteger(this.max.second) ? this.max.second : 59;
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
    if (groupIndex == 0) {
      let now = new Date();
      let h = now.getHours();
      h = Math.max(Math.min(h, this.max.hour), this.min.hour);
      
      callback({
        datasource: ds_hours(this.hourText, this.min, this.max),
        value: h,
      });
    } else if (groupIndex == 1) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let m;
      if (value0 > this.min.hour) {
        m = value1;
      }
      else {
        m = this.min.minute;
        m = Math.max(Math.min(m, this.max.minute), this.min.minute);
      }

      callback({
        datasource: ds_mins(this.minuteText, this.min, this.max, value0),
        value: m
      });
    } else if (groupIndex == 2) {
      let value0 = picker.getSelect(0).value;
      let value1 = picker.getSelect(1).value;
      let value2 = picker.getSelect(2).value;
      let s;
      if (value0 > this.min.hour) {
        s = value2;
      }
      else if (value1 > this.min.minute) {
        s = value2;
      }
      else if (value2 > this.min.second) {
        s = value2;
      }
      else if (value0 < this.max.hour) {
        s = this.min.second;
      }
      else if (value1 < this.max.minute) {
        s = this.min.second;
      }
      else {
        s = Math.max(Math.min(value2, this.max.second), this.min.second);
      }

      callback({
        datasource: ds_sec(this.secondText, this.min, this.max, value0, value1),
        value: s
      });
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
    }
    else if (groupIndex == 1) {
      picker.refreshDatasource(2).then((value)=>{});
    }
  }
}