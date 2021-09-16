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
function ds_hours(hourText) {
  let ds = [];
  for (let i = 0; i < 24; i++) {
    ds.push({label:(i<10?'0'+i:i) + (hourText?' '+hourText:''), value:i});
  }
  return ds;
}


/**
* @desc: .
* @return: picker数据源.
*         [{label:'00', value:0}, {label:'01', value:1}, ...]
*/
function ds_mins(minuteText) {
  let ds = [];
  for (let i = 0; i < 60; i++) {
    ds.push({label:(i<10?'0'+i:i) + (minuteText?' '+minuteText:''), value:i});
  }
  return ds;
}

/**
* @desc: .
* @return: picker数据源.
*         [{label:'00', value:0}, {label:'01', value:1}, ...]
*/
function ds_sec(secondText) {
  let ds = [];
  for (let i = 0; i < 60; i++) {
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
    this.secondText = cfg.secondText||'秒';
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
      callback({
        datasource: ds_hours(this.hourText),
        value: now.getHours(),
      });
    } else if (groupIndex == 1) {
      let now = new Date();
      callback({
        datasource: ds_mins(this.minuteText),
        value: now.getMinutes()
      });
    } else if (groupIndex == 2) {
      let now = new Date();
      callback({
        datasource: ds_sec(this.secondText),
        value: now.getSeconds()
      });
    }
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
  }
}