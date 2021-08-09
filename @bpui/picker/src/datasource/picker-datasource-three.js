'use strict';

/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-07-18 21:29
* Desc: 双列数据源picker.
*/

export default class {

  /**
  * @param ds: [{label:'', value:0, children:[
  *                     {children:[]}
  *             ]}, ],  // 数据源.
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
      callback({
        datasource: this.ds,
        value: this.ds.length > 0? this.ds[0].value: null,
      });
    } else if (groupIndex == 1) {
      let select0 = picker.getSelect(0);
      if (select0) {
        for (let i = 0; i < this.ds.length; i++) {
          if (this.ds[i].value == select0.value) {
            if (this.ds[i].children) {
              callback({
                datasource: this.ds[i].children,
                value: this.ds[i].children.length > 0? this.ds[i].children[0].value: null,
              });
            } else {
              callback({
                datasource: [],
                value: null,
              });
            }
            return;
          }
        }
      }
      else {
        callback({
          datasource: [],
          value: null,
        });
      }
    } else if (groupIndex == 2) {
      let select0 = picker.getSelect(0);
      let select1 = picker.getSelect(1);
      if (select0 && select1) {
        for (let i = 0; i < this.ds.length; i++) {
          if (this.ds[i].value == select0.value) {
            let ds1 = this.ds[i].children;
            if (ds1) {
              for (let j = 0; j < ds1.length; j++) {
                if (ds1[j].value == select1.value) {
                  if (ds1[j].children) {
                    callback({
                      datasource: ds1[j].children,
                      value: ds1[j].children.length > 0? ds1[j].children[0].value: null,
                    });
                  }
                  else {
                    callback({
                      datasource: [],
                      value: null,
                    });
                  }
                  return;
                }
              }
            } else {
              callback({
                datasource: [],
                value: null,
              });
            }
            return;
          }
        }
      }
      else {
        callback({
          datasource: [],
          value: null,
        });
      }
    }
  }

  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex, picker) {
    if (groupIndex == 0) {
      picker.refreshDatasource(1)
            .then((value)=>picker.refreshDatasource(2))
            .then((value)=>{});
    }
    else if (groupIndex == 1) {
      picker.refreshDatasource(2).then((value)=>{});
    }
  }
}

