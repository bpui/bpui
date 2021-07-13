'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-18 23:50
* Desc: 
*/

import * as febs from 'febs-browser';

export function parseUrl(search: string): bp.Directory<string> {
  if (search.length > 0 && search[0] == '?') {
    search = search.substr(1);
  }

  let query = {} as any;
  let searchs = search.length == 0? []: search.split('&');
  for (let i=0; i < searchs.length; i++) {
    if (!febs.string.isEmpty(searchs[i])) {
      let v = searchs[i].split('=');
      if (!febs.string.isEmpty(v[0])) {
        let v0 = decodeURIComponent(v[0]);
        let v1 = febs.string.isEmpty(v[1])? '': decodeURIComponent(v[1]);
        query[v0] = v1;
      }
    }
  }

  return query;
}

export function stringifyUrl(pathname:string, query:bp.Directory<string>):string {
  if (query) {
    let q = '';
    for (const key in query) {
      if (febs.string.isEmpty(key)) {
        continue;
      }

      const element = query[key];
      if (q.length > 0) q += '&';
      q += encodeURIComponent(key) + '=' + encodeURIComponent(element||"");
    }

    if (q.length > 0) {
      let npos = pathname.indexOf('?');
      if (npos < 0) {
        pathname += '?' + q;
      } else if (npos == pathname.length-1) {
        pathname += q;
      } else {
        pathname += '&' + q;
      }
    }
  }

  return pathname;
}