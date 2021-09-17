'use strict'

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-03-03 18:42
 * Desc:
 */

import * as febs from 'febs-browser';;
import bpLibs from '@bpui/libs';

export const POS_CENTER = 120
export const POS_CELL_HEIGHT = 40
const WHEEL_STEP = 80

function bee() {
  bpLibs.device.vibrate(10);
}


export function mobile_onWheel_picker(event) {
  // start.
  event = event || window.event

  let delta;
  let agent = navigator.userAgent;
  if (/.*Firefox.*/.test(agent)) {
    delta = event.detail;
  }
  else {
    delta = event.wheelDelta
  }

  var target = event.currentTarget
  if (target) {
    var tt = $(target)
      .parent('.bp-picker__group')
      .children('.bp-picker__content')
    tt = $(tt[0])

    if (!tt[0]) {
      return false
    }

    //
    // start.
    tt = tt[0]

    var oldOffset = picker_getOffset($(tt))
    var offset = oldOffset;
    if (!tt.__picker_wheel) {
      tt.__picker_wheel = 0;
    }
    tt.__picker_wheel += delta;

    //
    // end.
    var ttt = $(tt)

    // !move.
    if (tt.__picker_wheel > WHEEL_STEP) {
      offset += POS_CELL_HEIGHT / 2 + 1;
      tt.__picker_wheel %= WHEEL_STEP;
    }
    else if (tt.__picker_wheel < -WHEEL_STEP) {
      offset -= POS_CELL_HEIGHT / 2 + 1;
      tt.__picker_wheel %= WHEEL_STEP;
    }
    else {
      event.preventDefault()
      event.stopPropagation()
      event.cancelBubble = true

      return false
    }

    offset = picker_setOffset(ttt, offset)
    if (oldOffset != offset) {
      bee();
      ttt.trigger('change')
    }

  // console.log(offset);
    event.preventDefault()
    event.stopPropagation()
    event.cancelBubble = true

    return false
  }
}

//
// event.
export function mobile_onTouchstart_picker(event) {
  event = event || window.event

  var touch
  if (event.touches) {
    touch = event.touches[0]
  } else {
    touch = {
      clientX: event.clientX,
      clientY: event.clientY
    }
  }

  if (touch) {
    var target = event.currentTarget
    if (target) {
      var tt = $(target)
        .parent('.bp-picker__group')
        .children('.bp-picker__content')
      tt = $(tt[0])

      if (!tt[0]) {
        return false
      }

      tt.css('transition', 'none')
      tt = tt[0]
      tt.__picker_start = true

      tt.__picker_touch = touch.clientX
      tt.__picker_touch1 = touch.clientY
      tt.__picker_start_at = Date.now()

      var offset = picker_getOffset($(tt))
      tt.__offset = offset

      if (typeof target.ontouchstart !== 'undefined') {
        febs.dom.removeEventListener(target, 'touchmove', mobile_onTouchmove_picker, true)
        febs.dom.removeEventListener(target,'touchend', mobile_onTouchend_picker, true)
        febs.dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true)

        febs.dom.addEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
        febs.dom.addEventListener(target, 'touchend', mobile_onTouchend_picker, true);
        febs.dom.addEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
      } else {
        febs.dom.removeEventListener(target, 'mousemove', mobile_onTouchmove_picker, true)
        febs.dom.removeEventListener(target, 'mouseup', mobile_onTouchend_picker, true)
        febs.dom.removeEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true)

        febs.dom.addEventListener(target, 'mousemove', mobile_onTouchmove_picker, true)
        febs.dom.addEventListener(target, 'mouseup', mobile_onTouchend_picker, true)
        febs.dom.addEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true)
      }

      event.preventDefault()
      event.stopPropagation()
      event.cancelBubble = true

      return false
    } else {
      return true
    }
  }
}

export function mobile_onTouchmove_picker(event) {
  event = event || window.event

  var touch
  if (event.touches) {
    touch = event.touches[0]
  } else {
    touch = {
      clientX: event.clientX,
      clientY: event.clientY
    }
  }

  if (touch) {
    var target = event.currentTarget
    if (!target) {
      return false
    }

    var tt = $(target)
      .parent('.bp-picker__group')
      .children('.bp-picker__content')
    if (!tt[0]) {
      return false
    }
    tt = tt[0]

    if (!tt.__picker_start) return

    var offset1 = parseFloat(touch.clientY - tt.__picker_touch1)
    offset1 = offset1 + (tt.__offset || 0)
    offset1 = offset1.toFixed(1)
    $(tt).css('transform', 'translate3d(0px, ' + offset1 + 'px, 0px)')
  }

  event.stopPropagation()
  event.preventDefault()
  event.cancelBubble = true
  return false
}

export function mobile_onTouchend_picker(event) {
  event = event || window.event

  var target = event.currentTarget
  if (!target) {
    return false
  }

  var tt = $(target)
    .parent('.bp-picker__group')
    .children('.bp-picker__content')
  if (!tt[0]) {
    return false
  }
  tt = tt[0]

  if (typeof target.ontouchstart !== 'undefined') {
    febs.dom.removeEventListener(target,'touchmove', mobile_onTouchmove_picker, true)
    febs.dom.removeEventListener(target,'touchend', mobile_onTouchend_picker, true)
    febs.dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true)
  } else {
    febs.dom.removeEventListener(target,'mousemove', mobile_onTouchmove_picker, true)
    febs.dom.removeEventListener(target,'mouseup', mobile_onTouchend_picker, true)
    febs.dom.removeEventListener(target,'mouseout', mobile_onTouchcancel_picker, true)
  }

  var touch
  if (
    (event.touches && event.touches.length > 0) ||
    (event.changedTouches && event.changedTouches.length > 0)
  ) {
    touch = event.touches[0] || event.changedTouches[0]
  } else {
    touch = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
  }

  var ttt = $(tt)
  var offset = picker_getOffset(ttt)
  var oldOffset = tt.__offset

  var velocity =
    ((touch.clientY - tt.__picker_touch1) /
      (Date.now() - tt.__picker_start_at || 1)) *
    1000

  // !move.
  if (tt.__picker_touch1 == touch.clientY) {
    var off = -(
      touch.clientY - febs.dom.getElementOffset(event.currentTarget).top
    )
    off += event.currentTarget.clientHeight / 2
    offset += off
    velocity = 0
  } // if.

  delete tt.__picker_start
  delete tt.__picker_start_at
  delete tt.__picker_touch
  delete tt.__picker_touch1

  offset += velocity * 0.1

  offset = picker_setOffset(ttt, offset)
  if (oldOffset != offset) {
    bee();
    ttt.trigger('change')
  }
}
export var mobile_onTouchcancel_picker = mobile_onTouchend_picker;

/**
 * @desc: 设置偏移
 */
export function picker_setOffset(pickerDom, offset) {
  var oo = offset % POS_CELL_HEIGHT
  if (oo > 0) {
    if (oo >= POS_CELL_HEIGHT / 2) {
      offset -= oo
      offset += POS_CELL_HEIGHT
    } else {
      offset -= oo
    }
  } else {
    if (oo <= -POS_CELL_HEIGHT / 2) {
      offset -= oo
      offset -= POS_CELL_HEIGHT
    } else {
      offset -= oo
    }
  }

  if (offset > POS_CENTER) {
    offset = POS_CENTER
  } else {
    var nn =
      -POS_CELL_HEIGHT * pickerDom.children('.bp-picker__item').length +
      POS_CENTER +
      POS_CELL_HEIGHT
    if (offset < nn) {
      offset = nn
    }
  }

  pickerDom
    .css('transition', 'all 0.3s')
    .css('transform', 'translate3d(0px, ' + offset + 'px, 0px)')

  return offset
}

//
export function picker_getOffset(pickerDom) {
  var offset = pickerDom[0].style['transform'];
  if (febs.string.isEmpty(offset)) {
    offset = 0
  } else {
    offset = offset.split(',')
    offset = offset[1] || '0'
    offset = febs.string.trim(offset)
    offset = febs.string.replace(offset, 'px', '')
    offset = parseFloat(offset)
  }
  return offset
}
