"use strict";

/**
 * Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
 * Author: brian.li
 * Date: 2021-08-06 16:20
 * Desc:
 */

import bpLibs from '@bpui/libs';
import * as febs from 'febs-browser';

//
// event.
export function mobile_onTouchstart_tablecell(event) {
  event = event || window.event;

  var touch;
  if (event.touches) {
    touch = event.touches[0];
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  if (touch) {
    var target = event.currentTarget || event.target;
    if (target.getAttribute("data-mark") === "swiped") {
      $(target)
        .removeClass("bp-tableView__animation")
        .removeClass("bp-tableView__animation-fast");

      target.__tableView_swipedw = Number(target.getAttribute("data-swipedw"));
      if (Number.isNaN(target.__tableView_swipedw)) {
        target.__tableView_swipedw = 64;
      }
      else {
        target.__tableView_swipedw = Math.floor(target.__tableView_swipedw);
      }

      target.__tableView_start = true;
      delete target.__tableView_start_scroll;


      let transform = window.getComputedStyle(target)['transform'];
      if (transform && transform != 'none') {
        transform = transform.split(',')[4];
        if (transform) {
          transform = febs.string.trim(transform);
          transform = Math.ceil(Number(transform));
        }
      }

      if (Number.isNaN(transform)) {
        transform = 0;
      }

      target.__tableView_touch = touch.clientX - transform;
      target.__tableView_touch1 = touch.clientY;
      target.__tableView_start_transform = transform;

      return true;
    } else {
      return true;
    }
  }
}
export function mobile_onTouchmove_tablecell(event) {
  event = event || window.event;

  var touch;
  if (event.touches) {
    touch = event.touches[0];
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  if (touch) {
    var target = event.currentTarget || event.target;
    if (target.getAttribute("data-mark") === "swiped") {
      if (!target.__tableView_start) return;

      if (!target.__tableView_start_scroll) {
        var span1;
        var span2;

        span1 = Math.abs(target.__tableView_touch + target.__tableView_start_transform - touch.clientX);
        span2 = Math.abs(target.__tableView_touch1 - touch.clientY);

        if (span1 > span2) {
          if (span1 > 20) {
            target.__tableView_start_scroll = true;
          }
        } else {
          if (span2 > 30) {
            delete target.__tableView_start;
          }
        }

        return;
      }

      var offset = target.__tableView_touch - touch.clientX;
      if (offset < 0) offset = 0;
      offset /= 2;
      offset -= target.__tableView_start_transform / 2;

      // else if (offset > target.__tableView_swipedw) offset = target.__tableView_swipedw;

      target.style["-webkit-transform"] = `translate3d(${-offset}px, 0px, 0px)`;
      target.style["-moz-transform"] = `translate3d(${-offset}px, 0px, 0px)`;
      target.style["-ms-transform"] = `translateX(${-offset}px)`;
      target.style["transform"] = `translate3d(${-offset}px, 0px, 0px)`;

      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      return false;
    }
  }

  // event.preventDefault();
}
export function mobile_onTouchend_tablecell(event) {
  event = event || window.event;

  var touch;
  if (event.changedTouches) {
    touch = event.changedTouches[0];
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  if (touch) {
    var target = event.currentTarget || event.target;
    if (target.getAttribute("data-mark") === "swiped") {
      if (!target.__tableView_start_scroll) {
        if (!target.__tableView_swipered) $(target).trigger("fakeClick");
        return;
      }

      delete target.__tableView_start;
      delete target.__tableView_start_scroll;

      var swipeSpan = 0;
      swipeSpan = target.__tableView_touch - touch.clientX;

      $(target).addClass("bp-tableView__animation-fast");
      var swipe = swipeSpan > 30;
      if (swipe) {
        target.style[
          "-webkit-transform"
        ] = `translate3d(-${target.__tableView_swipedw}px, 0px, 0px)`;
        target.style["-moz-transform"] = `translate3d(-${target.__tableView_swipedw}px, 0px, 0px)`;
        target.style["-ms-transform"] = `translateX(-${target.__tableView_swipedw}px)`;
        target.style["transform"] = `translate3d(-${target.__tableView_swipedw}px, 0px, 0px)`;
        target.__tableView_swipered = true;

        // 还原.
        let restoreEvent = event2 => {
          if (event2 && event && event2.timeStamp !== event.timeStamp) {
            let targets = $(".bp-tableView__cell_swiped");
            targets.each(function(index, ee) {
              let tt = $(ee).children(".bp-tableView__cell_head");
              if (tt.length > 0) {
                tt.removeClass("bp-tableView__animation-fast");
                tt.addClass("bp-tableView__animation");
                tt.css("-webkit-transform", `translate3d(0px, 0px, 0px)`);
                tt.css("-moz-transform", `translate3d(0px, 0px, 0px)`);
                tt.css("-ms-transform", `translateX(0px)`);
                tt.css("transform", `translate3d(0px, 0px, 0px)`);
                delete tt[0].__tableView_swipered;
              }
            });
          } else {
            $("body").one("click", restoreEvent);
          }
        };
        $("body").one("click", restoreEvent);
      } else {
        target.style["-webkit-transform"] = `translate3d(0px, 0px, 0px)`;
        target.style["-moz-transform"] = `translate3d(0px, 0px, 0px)`;
        target.style["-ms-transform"] = `translateX(0px)`;
        target.style["transform"] = `translate3d(0px, 0px, 0px)`;
        delete target.__tableView_swipered;
      }

      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;

      delete target.__tableView_touch;
      delete target.__tableView_touch1;

      bpLibs.device.vibrate(10);

      return false;
    }

    if (!target.__tableView_swipered) $(target).trigger("fakeClick");
  }
}
export const mobile_onTouchcancel_tablecell = mobile_onTouchend_tablecell;
