'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-09-17
* Desc:
*/

export function getCascaderItemsFromList(list, vals){
  let dsList = this.datasource;
  const items = vals.forEach((val, i) => {
    const map = this.getMapFromList(dsList);
    const dsObj = map[val];
    if (dsObj && dsObj.children && Array.isArray(dsObj.children)) {
      dsList = dsObj.children;
    } else {
      dsList = []
    }
    return this.getItemFromMap(map, val)
  });
  return items;
}

export function getMultipleItems(vals){
  const datasourceMap = this.datasourceMap;
  const items = vals.map((val) => {
    return this.getItemFromMap(datasourceMap, val);
  });
  return items;
}
getSingleItem(val){
  return this.getItemFromMap(this.datasourceMap, val);
}

getItemFromList(dsList, val){
  if (val == null) {
    return null;
  }
  // 生成Item对象
  // TODO: label的取值
  const {valueProperty, labelProperty} = this;
  const item = {
    value: val,
    label: val,
    _isFakeLabel: true
  }
  if (dsList && dsList.length) {
    for (let i = 0, l = dsList.length; i < l; i++) {
      const obj = dsList[i];
      if (obj && valueProperty && obj[valueProperty] === val) {
        if (labelProperty && obj[labelProperty]) {
          obj.label = obj[labelProperty];
          obj._isFakeLabel = false;
        }
        break;
      }
    }
  }
  return item;
},
// 优化getMultipleItems & getSingleItem
getItemFromMap(dsMap, val){
  if (val == null) {
    return null;
  }
  // debugger
  console.log('datasourceMap');
  const {labelProperty} = this;
  const item = {
    value: val,
    label: val,
    _isFakeLabel: true
  }
  const obj = dsMap[val];
  if (obj && isObject(obj)) {
    if (labelProperty && obj[labelProperty]) {
      item.label = obj[labelProperty];
      item._isFakeLabel = false;
    }
  }

  return item;
},
// this.datasource解析成map
getMapFromList(list, key) {
  key = key || this.valueProperty;
  return list.reduce((a, b) => {
    a[b[key]] = b;
    return a;
  }, {});
},
