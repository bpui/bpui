'use strict';

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-26 17:33
* Desc: 
*/

import * as febs from 'febs-browser';;


export {
  isVueObject,
  isVueComponent,
  isHtmlDom,
  getDomHtmlString,
  getViewPort,
  getDocumentPort,
  getDocumentOffset,
  getElementOffset,
  addEventListener,
  removeEventListener,
  probeDom,
}


/**
* @desc: 判断是否是vue对象.
* @return: 
*/
function isVueObject(obj) {
  if(obj && (typeof obj === 'object') && (obj._isVue))
    return true;
  else
    return false;
}

/**
* @desc: Component 是import的, 未创建.
* @return: 
*/
function isVueComponent(obj) {
  if (obj && typeof obj === 'object' && typeof obj.render === 'function' && obj._compiled) {
    return true;
  }
  return false;
}

/**
* @desc: 获得html字符串
* @param obj: vue对象, Dom对象 或字符串.
* @return: 
*/
function getDomHtmlString(obj) {
  if (obj) {
    // dom. 
    if (febs.dom.isDom(obj)) {
      obj = $('<div></div>').append(obj);
      obj = obj.html();
    }
    // vue. 
    else if (isVueObject(obj)) {
      obj = $(obj.$el);
      obj = $('div').append(obj);
      obj = obj.html();
    }
    // string.
    else if (typeof obj !== 'string') {
      throw new Error('getDomHtmlString obj only can be vue object, Dom or string');
    }
  }
  return obj;
}

const isHtmlDom = febs.dom.isDom;
const getViewPort = febs.dom.getViewPort;
const getDocumentPort = febs.dom.getDocumentPort;
const getDocumentOffset = febs.dom.getDocumentOffset;
const getElementOffset = febs.dom.getElementOffset;
const addEventListener = febs.dom.addEventListener;
const removeEventListener = febs.dom.removeEventListener;


// function probeDom(maxTime:Number, condition:()=>boolean) {
function probeDom(maxTime, condition, stop, start_at) {
  if (!start_at) {
    start_at = Date.now();
  }
  else if (Date.now()-start_at >= maxTime) {
    if (stop) {
      stop();
    }
    return;
  }

  if (condition) {
    requestAnimationFrame(function(){
      if (!condition()) {
        probeDom(maxTime, condition, stop, start_at);
      } else {
        if (stop) {
          stop();
        }
      }
    });
  }
}