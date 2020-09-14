const root = window;

var DEFAULTS = {
  placement: 'bottom'
}




function Poper(referenceElm, popperElm, options) {
  this._referenceElm = referenceElm;
  this._popperElm = popperElm;
  this._options = Object.assign({}, DEFAULTS, options);
  this.state = {};
  this.state.position = getPosition(this._referenceElm);
  setStyle(this._popperElm, { position: this.state.position, top: 0 });

  this.update();
  return this;
}

Poper.prototype.update = function (needUpdateIndex) {
  this.updateStyle(needUpdateIndex);
}


Poper.prototype.updateStyle = function (needUpdateIndex) {
  if (needUpdateIndex) {
    this.updateIndex();
  }

  const styles = this._getOffsets(this._popperElm, this._referenceElm, this._options.placement).popper;

  setStyle(elm, styles);
}


Poper.prototype.updateIndex = function () {
  console.log('updateIndex');
}

Popper.prototype._getOffsets = function(popper, reference, placement) {
  placement = placement.split('-')[0];
  var popperOffsets = {};

  popperOffsets.position = this.state.position;
  var isParentFixed = popperOffsets.position === 'fixed';

  var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);
  var popperRect = getOuterSizes(popper);


  if (['right', 'left'].indexOf(placement) !== -1) {
    popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
    if (placement === 'left') {
      popperOffsets.left = referenceOffsets.left - popperRect.width;
    } else {
      popperOffsets.left = referenceOffsets.right;
    }
  } else {
    popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
    if (placement === 'top') {
      popperOffsets.top = referenceOffsets.top - popperRect.height;
    } else {
      popperOffsets.top = referenceOffsets.bottom;
    }
  }

  // Add width and height to our offsets object
  popperOffsets.width   = popperRect.width;
  popperOffsets.height  = popperRect.height;

  return {
    popper: popperOffsets,
    reference: referenceOffsets
  };
};



function getPosition(reference) {
  var container = getOffsetParent(reference);

  if (this._options.forceAbsolute) {
    return 'absolute';
  }

  var isParentFixed = isFixed(reference, container);
  return isParentFixed ? 'fixed' : 'absolute';
};


function getOffsetParent(elm) {
  var offsetParent = elm.offsetParent;
  return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
}

function isFixed(elm) {
  if (elm === root.document.body) {
    return false;
  }
  if (getStyleComputedProperty(elm, 'position') === 'fixed') {
    return true;
  }
  return elm.parentNode ? isFixed(elm.parentNode) : elm;
 }

function getStyleComputedProperty(elm, property) {
  var css = root.getComputedStyle(elm, null);
  return css[property];
}

function setStyle(elm, styles) {
  function is_numeric(n) {
    return (n !== '' && !isNaN(parseFloat(n)) && isFinite(n));
  }
  Object.keys(styles).forEach(function(prop) {
    var unit = '';
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
      unit = 'px';
    }
    elm.style[prop] = styles[prop] + unit;
  });
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();

  var isIE = navigator.userAgent.indexOf("MSIE") != -1;

  var rectTop = isIE && element.tagName === 'HTML'
    ? -element.scrollTop
    : rect.top;

  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop
  };
}

function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
  var elementRect = getBoundingClientRect(element);
  var parentRect = getBoundingClientRect(parent);

  if (fixed) {
    var scrollParent = getScrollParent(parent);
    parentRect.top += scrollParent.scrollTop;
    parentRect.bottom += scrollParent.scrollTop;
    parentRect.left += scrollParent.scrollLeft;
    parentRect.right += scrollParent.scrollLeft;
  }

  var rect = {
    top: elementRect.top - parentRect.top ,
    left: elementRect.left - parentRect.left ,
    bottom: (elementRect.top - parentRect.top) + elementRect.height,
    right: (elementRect.left - parentRect.left) + elementRect.width,
    width: elementRect.width,
    height: elementRect.height
  };
  return rect;
}

function getScrollParent(element) {
  var parent = element.parentNode;

  if (!parent) {
    return element;
  }

  if (parent === root.document) {
    if (root.document.body.scrollTop || root.document.body.scrollLeft) {
      return root.document.body;
    } else {
      return root.document.documentElement;
    }
  }

  if (
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1
  ) {
    return parent;
  }
  return getScrollParent(element.parentNode);
}

function getOuterSizes(element) {
  var _display = element.style.display, _visibility = element.style.visibility;
  element.style.display = 'block'; element.style.visibility = 'hidden';
  var calcWidthToForceRepaint = element.offsetWidth;

  var styles = root.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };

  element.style.display = _display; element.style.visibility = _visibility;
  return result;
}


export default Poper;
