"use strict";

/**
 * Copyright (c) 2020 Copyright bpui All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-02-28 17:07
 * Desc:
 */

// .bp-widget

import * as febs from "febs-browser";
import bpLibs from "@bpui/libs";
import * as hooks from "./hooks";

const ApiClass = "bp-apiClass";

function domGetDuration(el) {
  let d = window.getComputedStyle(el, null);
  d = d ? d["transition-duration"] : "0.1s";
  d = d.split(",")[0];
  d = febs.string.trim(d);
  d = febs.string.replace(d, "s", "");
  d = parseFloat(d);
  d = Math.ceil(d * 1000) || 100;
  return d;
}

function maskPreventHandler(event) {
  if (event.type == "touchmove" || event.type == "mousewheel") {
  } else {
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
    febs.dom.removeEventListener(ee, "touchmove", maskPreventHandler);
    febs.dom.addEventListener(ee, "touchmove", maskPreventHandler);
    febs.dom.removeEventListener(ee, "touchup", maskPreventHandler);
    febs.dom.addEventListener(ee, "touchup", maskPreventHandler);
    febs.dom.removeEventListener(ee, "touchdown", maskPreventHandler);
    febs.dom.addEventListener(ee, "touchdown", maskPreventHandler);
  } else {
    febs.dom.removeEventListener(ee, "mousewheel", maskPreventHandler);
    febs.dom.addEventListener(ee, "mousewheel", maskPreventHandler);
    febs.dom.removeEventListener(ee, "mouseover", maskPreventHandler);
    febs.dom.addEventListener(ee, "mouseover", maskPreventHandler);
  }
  febs.dom.removeEventListener(ee, "click", maskPreventHandler);
  febs.dom.addEventListener(ee, "click", maskPreventHandler);
}

export function getWidgetLength() {
  let pageLen = $(".bp-navbarView_page").length;
  let dataMark = "page" + pageLen;
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
    let t = Number($(mask[i]).css("z-index")) || 0;
    if (t > zIndex) {
      zIndex = t;
    }
  }

  return zIndex;
}

function hack(el) {
  var sUserAgent = navigator.userAgent.toLowerCase();
  if (sUserAgent.indexOf("baidu") >= 0) {
    el.css("backdrop-filter", "none");
  }
}

/**
 * 根据widget来还原body上的fixed
 */
export function restoreFixedScroll(widget) {
  if (widget.hasClass("bp-widget__bodyFixscroll")) {
    $("body").addClass("bp-widget__fixscroll");
  }

  let ss = widget.attr("data-htmlp");
  if (ss.length > 0) {
    let sss = febs.string.replace(ss, "px", "");
    sss = parseInt(sss) || 0;
    hooks.callWidgetShake(sss);
    $("html").css("padding-right", ss);
  }
}
/**
 * 根据前一个widget来移除body上的fixed
 */
export function removeFixedScrollByWidget(preWidget) {
  if (!preWidget.hasClass("bp-widget__bodyFixscroll")) {
    $("body").removeClass("bp-widget__fixscroll");
  }

  let ss = preWidget.attr("data-htmlp");
  if (ss.length <= 0) {
    hooks.callWidgetShake(0);
    $("html").css("padding-right", "");
  }
}

function removeFixedScroll() {
  $("body").removeClass("bp-widget__fixscroll");
  let pr = $("html").css("padding-right");
  if (pr && pr.length > 0) {
    hooks.callWidgetShake(0);
    $("html").css("padding-right", "");
  }
}

/**
 * @desc: 显示遮罩层.
 */
export function showWidget(el, showMask, preventEvent, hideBodyScroll, cb) {
  let mask = $(el);

  if (preventEvent) {
    maskPreventEvent(mask);
  }

  // 防止多次调用
  // bp-widget__showing只是标示 正在显示的的样式名，没有实际样式
  if (mask.hasClass("bp-widget__visible") || mask.hasClass("bp-widget__showing")) {
    if (cb) cb();
    return;
  }
  hack(mask);

  const pageLen = $(".bp-navbarView_page").length;
  const dataMark = "page" + pageLen;
  const zindex = getWidgetZIndex(dataMark) + 2;

  mask.css("z-index", zindex);
  mask.attr("data-mark", dataMark);
  mask.addClass("bp-widget__showing").removeClass("bp-widget__closing");
  if (showMask) {
    // 在hideWidget用来辅助判断 是否是显示showMask的widget
    mask.addClass("bp-widget__maskTmp");
  }

  let hidedScroll = false;
  const body = $("body");
  const html = $("html");
  if (hideBodyScroll) {
    let willFix = false;
    let scrollWidth = 0;

    if (showMask || preventEvent) {
      // 桌面端判断垂直滚动条.
      if (!febs.utils.browserIsMobile()) {
        scrollWidth = window.innerWidth - febs.dom.getViewPort().width;
        // if (scrollWidth > 0) {
        //   willFix = true;
        // }
        if (febs.dom.getDocumentPort().height > febs.dom.getViewPort().height) {
          willFix = true;
        }
      }
      // 移动端
      else {
        if (febs.dom.getDocumentPort().height > febs.dom.getViewPort().height) {
          willFix = true;
        }
      }
    }

    if (willFix) {
      body.addClass("bp-widget__fixscroll");
      if (scrollWidth > 0) {
        hooks.callWidgetShake(scrollWidth);
        html.css("padding-right", scrollWidth + "px");
      }
      hidedScroll = true;
      mask.addClass("bp-widget__willFix");
    } else {
      hidedScroll = body.hasClass("bp-widget__fixscroll");
    }
  }

  // polyfill firefox.
  if (hidedScroll) {
    if (navigator.userAgent.indexOf("Firefox") >= 0) {
      mask.css("overflow-y", "scroll");
    }
  } else {
    if (navigator.userAgent.indexOf("Firefox") >= 0) {
      mask.css("overflow-y", "");
    }
  }

  // 标记.
  if (body.hasClass("bp-widget__fixscroll")) {
    mask.addClass("bp-widget__bodyFixscroll");
  }
  let ss = html.css("padding-right");
  if (ss && ss.length > 0) {
    mask.attr("data-htmlp", ss);
  }

  let preMask;

  // only one mask.
  if (showMask) {
    let _widgets = _getSortWidget(dataMark);
    // 寻找最大的zindex的preMask
    for (let i = _widgets.length - 1; i >= 0; i--) {
      let mask0 = _widgets[i].el;
      if (mask0.hasClass("bp-widget__mask") && !mask[0].isEqualNode(mask0[0])) {
        preMask = mask0;
        break;
      }
    }
  }

  mask.attr("data-display", '');
  bpLibs.dom.probeDom(
    200,
    () => {
      return 0 == window.innerWidth - febs.dom.getViewPort().width;
    },
    () => {
      febs.utils
        .sleep(0)
        .then(() => {
          mask.addClass("bp-widget__invisible");
          mask.removeClass("bp-widget__maskTmp");
          if (showMask) {
            if (!preMask) {
              mask.addClass("bp-widget__mask");
            }
          }
          mask.css("display", "inherit");
        })
        .then(() => {
          if (mask.hasClass("bp-widget__closing")) {
            return Promise.reject();
          }
          let duration = domGetDuration(mask[0]) || 100;
          mask.removeClass("bp-widget__invisible").addClass("bp-widget__visible");
          return duration;
        })
        .then(duration => {
          return febs.utils.sleep(10).then(() => {
            // 修正居中显示, 超出造成的偏移.
            let content = (mask.children('.bp-widget__content')[0]);
            let clientHeight = content.clientHeight;
            if (clientHeight > febs.dom.getViewPort().height) {
              clientHeight = (clientHeight - febs.dom.getViewPort().height) / 2 + 20;
              $(content).css('top', clientHeight + 'px');
            }

            return febs.utils.sleep(duration-10);
          });
        })
        .then(() => {
          mask.removeClass("bp-widget__showing");
          if (mask.hasClass("bp-widget__closing") || mask.hasClass("bp-widget__invisible")) {
            return Promise.reject();
          }

          if (showMask && preMask) {
            mask.addClass("bp-widget__mask").addClass("bp-widget__maskNoAminate");
          } else if (showMask) {
            mask.addClass("bp-widget__mask");
          }

          if (preMask) {
            preMask
              .removeClass("bp-widget__mask")
              .addClass("bp-widget__maskTmp")
              .addClass("bp-widget__maskNoAminate");
          }

          if (cb) {
            cb();
          }
          
          let maskHide = mask.attr("data-display");
          if (maskHide == 'hide') {
            hideWidget(el);
          }
        })
        .catch(() => {});
    }
  );
}

/**
 * @desc: 隐藏所有的api层.
 */
export function removeAllApiModal(elementSelector) {
  let pageLen = $(".bp-navbarView_page").length;
  let dataMark = "page" + pageLen;

  let apis = $(`${elementSelector ? elementSelector : "." + ApiClass}`);

  if (apis.length > 0) {
    apis.remove();

    // zindex.

    let _widgets = _getSortWidget(dataMark);

    // 寻找最大的zindex.
    for (let i = 0; i < _widgets.length; i++) {
      let mask0 = _widgets[i].el;

      if (mask0.hasClass("bp-widget__mask")) {
        return;
      }
      if (mask0.hasClass("bp-widget__maskTmp")) {
        mask0
          .removeClass("bp-widget__maskTmp")
          .addClass("bp-widget__mask")
          .removeClass("bp-widget__maskNoAminate");
        return;
      }
    }

    removeFixedScroll();
  } // if.
}

/**
 * @desc: 隐藏遮罩层.
 */
export function hideWidget(el, cb) {
  let mask = $(el);
  // 防止多次调用
  // bp-widget__closing只是标示 正在关闭的样式名，没有实际样式
  if (mask.hasClass("bp-widget__invisible") || mask.hasClass("bp-widget__closing")) {
    mask.attr("data-display", "hide");
    if (cb) cb();
    return;
  }

  const pageLen = $(".bp-navbarView_page").length;
  const dataMark = "page" + pageLen;

  mask.addClass("bp-widget__closing").removeClass("bp-widget__showing");
  mask.removeClass("bp-widget__visible").addClass("bp-widget__invisible");
  mask.attr("data-mark", "");

  const _zindex = Number(mask.css("z-index")) || 0;
  const sortWidget = _getSortWidget(dataMark);
  const l = sortWidget.length;
  let preMask; // zIndex 小于当前widget 并显示着的弹框 并带有mask 样式的弹框
  let preWidget; // zIndex 小于当前widget 并显示着的弹框
  let postWidget; // zIndex 大于当前widget的弹框
  let isVisibleWidgetHasFixscroll = false; // 除了当前弹框，是否还有其他弹框显示着

  if (l) {
    for (let i = sortWidget.length - 1; i >= 0; i--) {
      const mask0 = sortWidget[i].el;
      const mask0ZIndex = sortWidget[i].zIndex;
      const el = mask0[0];

      // 判断是否是显示的其他弹框
      if (
        el.style.display !== "none" &&
        !mask0.hasClass("bp-widget__closing") &&
        !mask0.hasClass("bp-widget__invisible")
      ) {
        isVisibleWidgetHasFixscroll = true;
        // 前一个带遮罩的弹框
        if (
          !preMask &&
          mask0ZIndex < _zindex &&
          (mask0.hasClass("bp-widget__mask") || mask0.hasClass("bp-widget__maskTmp"))
        ) {
          preMask = mask0;
        }

        // 前一个弹框
        if (!preWidget && mask0ZIndex < _zindex) {
          preWidget = mask0;
        }
        // 新打开的弹框
        if (!postWidget && mask0ZIndex > _zindex) {
          postWidget = mask0;
        }
      }
    }
  }

  if (!isVisibleWidgetHasFixscroll) {
    $("body").removeClass("bp-widget__fixscroll");
    hooks.callWidgetShake(0);
    $("html").css("padding-right", "");
  }

  if (!postWidget && preMask) {
    preMask
      .removeClass("bp-widget__maskTmp")
      .addClass("bp-widget__maskNoAminate")
      .addClass("bp-widget__mask");
  }

  const duration = (domGetDuration(mask[0]) || 100) + 10;
  setTimeout(function () {
    mask.css("display", "none");
    mask.attr("data-display", "hide");
    mask.removeClass("bp-widget__closing");
    mask.removeClass("bp-widget__mask");
    mask.removeClass("bp-widget__maskNoAminate");

    if (!postWidget && preMask) {
      preMask.removeClass("bp-widget__maskNoAminate");
    }

    if (cb) {
      cb();
    }
  }, duration);
}

// 取当前页所有widget 并排序；
function _getSortWidget(dataMark) {
  const masks = $(`.bp-widget[data-mark='${dataMark}']`);
  let widget = [];
  for (let i = 0; i < masks.length; i++) {
    const el1 = $(masks[i]);
    const t = Number(el1.css("z-index")) || 2000;
    widget.push({
      zIndex: t,
      el: el1
    });
  }
  widget.sort((a, b) => {
    if (a.zIndex == b.zIndex) return 0;
    return a.zIndex > b.zIndex ? 1 : -1;
  });
  return widget;
}
