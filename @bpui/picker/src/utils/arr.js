'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-04 16:18
* Desc: 
*/

export function isArrayEqual(v1, v2) {
  if (!v1 && !v2) {
    return true;
  }

  if (Array.isArray(v1) && Array.isArray(v2) && v1.length == v2.length) {
    for (let i = 0; i < v1.length; i++) {
      if (v1[i] != v2[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
}


export function isArrayEqualByKey(v1, v2, keys) {
  if (!v1 && !v2) {
    return true;
  }

  if (Array.isArray(v1) && Array.isArray(v2) && v1.length == v2.length) {
    for (let i = 0; i < v1.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (Array.isArray(v1[i][keys[j]])) {
          if (!isArrayEqualByKey(v1[i][keys[j]], v2[i][keys[j]], keys)) {
            return false;
          }
        }
        else if (v1[i][keys[j]] != v2[i][keys[j]]) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}