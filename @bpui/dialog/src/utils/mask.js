'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-28 17:07
* Desc: 
*/

// .bp-widget

import * as febs from 'febs-browser';
import bpLibs from '@bpui/libs';

const ApiClass = 'bp-apiClass';


function domGetDuration(el) {
  let d = window.getComputedStyle(el, null);
  d = d? d['transition-duration']: '0.1s';
  d = d.split(',')[0];
  d = febs.string.trim(d);
  d = febs.string.replace(d, 's', '');
  d = parseFloat(d);
  d = Math.ceil(d*1000) || 100;
  return d;
}

function maskPreventHandler(event){
  if (event.type == 'touchmove' || event.type == 'mousewheel') {

  }
  else {
     event.preventDefault();
  }
  return false;
}

// event.
function maskPreventEvent(ee) {
  if (ee && !febs.dom.isDom(ee)) {
    ee = ee[0];
  }
  if (!ee) {
    return;
  }

  if (febs.utils.browserIsMobile()) {
    febs.dom.removeEventListener(ee, 'touchmove', maskPreventHandler);
    febs.dom.addEventListener(ee, 'touchmove', maskPreventHandler);
    febs.dom.removeEventListener(ee, 'touchup', maskPreventHandler);
    febs.dom.addEventListener(ee, 'touchup', maskPreventHandler);
    febs.dom.removeEventListener(ee, 'touchdown', maskPreventHandler);
    febs.dom.addEventListener(ee, 'touchdown', maskPreventHandler);
  }
  else {
    febs.dom.removeEventListener(ee, 'mousewheel', maskPreventHandler);
    febs.dom.addEventListener(ee, 'mousewheel', maskPreventHandler);
    febs.dom.removeEventListener(ee, 'mouseover', maskPreventHandler);
    febs.dom.addEventListener(ee, 'mouseover', maskPreventHandler);
  }
  febs.dom.removeEventListener(ee, 'click', maskPreventHandler);
  febs.dom.addEventListener(ee, 'click', maskPreventHandler);
}

export function getWidgetLength() {
  let pageLen = $('.bp-navbarView_page').length;
  let dataMark = 'page' + pageLen;
  let masks = $(`.bp-widget[data-mark='${dataMark}']`);
  return masks.length;
}

/**
* @desc: 遮罩层当前的zindex.
*/
export function getWidgetZIndex(dataMark) {
  let zIndex = 2000;
  let mask = $(`.bp-widget[data-mark='${dataMark}']`);
  for (let i = 0; i < mask.length; i++) {
    let t = Number($(mask[i]).css('z-index'))||0;
    if (t > zIndex) {
      zIndex = t;
    }
  }

  return zIndex;
}

/**
* @desc: 显示遮罩层.
*/
export function showWidget(el, showMask, preventEvent, hideBodyScroll, cb) {

  let mask = $(el);

  if (preventEvent) {
    maskPreventEvent(mask);
  }

  if (mask.hasClass('bp-widget__visible')) {
    if (cb) cb();
    return;
  }
  
  // 防止scroll造成的页面抖动.
  // let body = $('body');
  // let html = $('html');

  let hidedScroll = false;

  let body = $('body');
  let html = $('html');

  if (hideBodyScroll) {
    let willFix = false;
    let scrollWidth = 0;

    // 桌面端判断垂直滚动条.
    if (!febs.utils.browserIsMobile()) {
      scrollWidth = window.innerWidth - febs.dom.getViewPort().width;
      if (scrollWidth > 0) {
        willFix = true;
      }
    }
    // 移动端
    else {
      if (showMask && febs.dom.getDocumentPort().height > febs.dom.getViewPort().height) {
        willFix = true;
      }
    }
    
    if (willFix) {
      body.addClass('bp-widget__fixscroll');
      if (scrollWidth > 0) {
        html.css('padding-right', scrollWidth + 'px');
      }
      hidedScroll = true;
    }
    else {
      hidedScroll = body.hasClass('bp-widget__fixscroll');
    }
  }

  //
  // polyfill firefox.
  if (hidedScroll) {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
      mask.css('overflow-y', 'scroll');
    }
  }
  else {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
      mask.css('overflow-y', '');
    }
  }

  // if (body.hasClass('bp-widget__fixscroll')) {
  //   mask.css('padding-right', html.css('padding-right'));
  // }
  // else {
  //   mask.css('padding-right', '');
  // }

  let pageLen = $('.bp-navbarView_page').length;
  let dataMark = 'page' + pageLen;

  let zindex = getWidgetZIndex(dataMark) + 2;
  mask.css('z-index', zindex);

  // 标记.
  if (body.hasClass('bp-widget__fixscroll')) {
    mask.addClass('bp-widget__bodyFixscroll');
  }
  let ss = html.css('padding-right');
  if (ss.length > 0) {
    mask.attr('data-htmlp', ss);
  }

  let dialogs = [];

  // zindex.
  let zIndex = 2000;
  let masks = $(`.bp-widget[data-mark='${dataMark}']`);
  for (let i = 0; i < masks.length; i++) {
    let el1 = $(masks[i]);
    let t = Number(el1.css('z-index'))||0;
    if (t > zIndex) {
      zIndex = t;
    }
    dialogs.push({zIndex:t, el:el1});
  }

  // only one mask.
  let preMask;
  if (showMask) {
    dialogs.sort((a, b)=>{
      if (a.zIndex == b.zIndex) return 0;
      return a.zIndex > b.zIndex? 1: -1;
    });

    // 寻找最大的zindex.
    for (let i = dialogs.length-1; i >= 0; i--) {
      let mask0 = dialogs[i].el;
      if (mask0.hasClass('bp-widget__mask') && !mask[0].isEqualNode(mask0[0])) {
        preMask = mask0;
        break;
      }
    }
  } // if.

  // mask.children('.bp-widget__content')

  bpLibs.dom.probeDom(200, ()=>{
    return 0 == window.innerWidth - febs.dom.getViewPort().width;
  }, ()=>{
    febs.utils.sleep(0)
      .then(()=>{
        mask.attr('data-mark', dataMark);
        mask.addClass('bp-widget__invisible');
        mask.removeClass('bp-widget__maskTmp');
        if (showMask) {
          if (!preMask) {
            mask.addClass('bp-widget__mask');
          }
        }
        mask.css('display', 'inherit');
      })
      .then(()=>febs.utils.sleep(10))
      .then(()=>{
        if (mask.hasClass('bp-widget__closing')) {
          if (cb) {
            cb();
          }
          return;
        }

        let duration = domGetDuration(mask[0])||100;
        mask.removeClass('bp-widget__invisible').addClass('bp-widget__visible');
        
        return duration;
      })
      .then((duration)=>febs.utils.sleep(duration))
      .then(()=>{
        if (mask.hasClass('bp-widget__closing')) {
          if (cb) {
            cb();
          }
          return;
        }
        
        if (showMask && preMask) {
          mask.addClass('bp-widget__mask').addClass('bp-widget__maskNoAminate');
        }
        else if (showMask) {
          mask.addClass('bp-widget__mask');
        }

        if (preMask) {
          preMask.removeClass('bp-widget__mask').addClass('bp-widget__maskTmp').addClass('bp-widget__maskNoAminate');
        }
        if (cb) {
          cb();
        }
      });
  });
}

/**
* @desc: 隐藏所有的api层.
*/
export function removeAllApiModal(elementSelector) {
  let pageLen = $('.bp-navbarView_page').length;
  let dataMark = 'page' + pageLen;

  let apis = $(`${elementSelector?elementSelector:'.'+ApiClass}`);

  if (apis.length > 0) {
    apis.remove();

    // zindex.
    let dialogs = [];
    let masks = $(`.bp-widget[data-mark='${dataMark}']`);
    for (let i = 0; i < masks.length; i++) {
      let el1 = $(masks[i]);
      let t = Number(el1.css('z-index'))||0;
      dialogs.push({zIndex:t, el:el1});
    }

    // only one mask.
    dialogs.sort((a, b)=>{
      if (a.zIndex == b.zIndex) return 0;
      return a.zIndex > b.zIndex? -1: 1;
    });
      
    // 寻找最大的zindex.
    for (let i = 0; i < dialogs.length; i++) {
      let mask0 = dialogs[i].el;

      if (mask0.hasClass('bp-widget__mask')) {
        return;
      }
      if (mask0.hasClass('bp-widget__maskTmp')) {
        mask0.removeClass('bp-widget__maskTmp').addClass('bp-widget__mask').removeClass('bp-widget__maskNoAminate');
        return;
      }
    }

  } // if.
}

/**
 * @desc: 隐藏遮罩层.
 */
export function hideWidget(el, cb) {
  let mask = $(el);

  if (mask.hasClass('bp-widget__invisible')) {
    if (cb) cb();
    return;
  }

  if (mask.hasClass('bp-widget__closing')) {
    if (cb) cb();
    return;
  }
  mask.addClass('bp-widget__closing');

  let pageLen = $('.bp-navbarView_page').length;
  let dataMark = 'page' + pageLen;
  let curZIndex = Number(mask.css('z-index'));
  let curMask = mask.hasClass('bp-widget__mask');
  let curMaskTmp = mask.hasClass('bp-widget__maskTmp');

  // zindex.
  let dialogs = [];
  let zIndex = 2000;
  let masks = $(`.bp-widget[data-mark='${dataMark}']`);
  // let curPageMaskLength = masks.length;
  for (let i = 0; i < masks.length; i++) {
    let el1 = $(masks[i]);
    let t = Number(el1.css('z-index'))||0;
    if (t > zIndex) {
      zIndex = t;
    }
    dialogs.push({zIndex:t, el:el1});
  }

  // only one mask.
  let preMask;    // 前一个带遮罩的dialog.
  let preWidget; // 前一个dialog.
  dialogs.sort((a, b)=>{
    if (a.zIndex == b.zIndex) return 0;
    return a.zIndex > b.zIndex? -1: 1;
  });

  // 寻找最大的zindex.
  if (!curMaskTmp && curMask) {
    for (let i = 0; i < dialogs.length; i++) {
      let mask0 = dialogs[i].el;
      if (Number(mask0.css('z-index')) < curZIndex) {
        if (!preWidget) preWidget = mask0;
        if (mask0.hasClass('bp-widget__maskTmp')) {
          preMask = mask0;
          break;
        }
      }
    }
  }


  mask.attr('data-mark', '');
  mask.removeClass('bp-widget__visible').addClass('bp-widget__invisible');
  let duration = domGetDuration(mask[0])||100;

  if (preMask) {
    preMask.removeClass('bp-widget__maskTmp').addClass('bp-widget__mask');
  }

  setTimeout(function(){
    mask.css('display', 'none');
    mask.removeClass('bp-widget__mask').removeClass('bp-widget__closing').removeClass('bp-widget__maskNoAminate');
    if (preMask) {
      preMask.removeClass('bp-widget__maskNoAminate');
    }

    if (cb) {
      cb();
    }

    if (curMask) {
      if (!preWidget) {
        $('body').removeClass('bp-widget__fixscroll');
        $('html').css('padding-right', '');
      }
      else {
        if (!preWidget.hasClass('bp-widget__bodyFixscroll')) {
          $('body').removeClass('bp-widget__fixscroll');
        }
        let ss = preWidget.attr('data-htmlp');
        if (ss.length <= 0) {
          $('html').css('padding-right', '');
        }
      }
    }
    
  }, duration+10);
}