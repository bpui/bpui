/*!
 * bpui input v1.1.18
 * Copyright (c) 2021 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

import bpLibs from '@bpui/libs';
import { utils, string } from 'febs-browser';

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var f = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var defineProperty = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var hasOwnProperty = {}.hasOwnProperty;

var has = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.2',
  mode:  'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap || sharedStore.state) {
  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    if (wmhas.call(store$1, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (has(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */



// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$1
};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var f$2 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$2
};

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var f$3 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$3
};

// a string of all valid unicode whitespaces
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var defineProperty$1 = objectDefineProperty.f;
var trim = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$1(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$2(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

/* eslint-disable es/no-array-prototype-indexof -- required for testing */

var $indexOf = arrayIncludes.indexOf;


var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.min_safe_integer
_export({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.max_safe_integer
_export({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */



// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && engineV8Version && engineV8Version < 41;
});

/* eslint-disable es/no-symbol -- required for testing */


var useSymbolAsUid = nativeSymbol
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (nativeSymbol && has(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

var UNSUPPORTED_Y = fails(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var SPECIES = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var regexpUnsupportedDotAll = fails(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var regexpUnsupportedNcg = fails(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

var defineProperty$2 = objectDefineProperty.f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;






var enforceInternalState = internalState.enforce;





var MATCH$1 = wellKnownSymbol('match');
var NativeRegExp = global_1.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = descriptors &&
  (!CORRECT_NEW || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || has(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced_1('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : regexpFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : String(pattern);
    flags = flags === undefined ? '' : String(flags);
    rawPattern = pattern;

    if (regexpUnsupportedDotAll && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y$1 && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (regexpUnsupportedNcg) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$2(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys$2 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$2.length > index;) {
    proxy(keys$2[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global_1, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */




var getInternalState = internalState.get;



var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = objectCreate(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec = patchedExec;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
_export({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});

var floor$1 = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.es/ecma262/#sec-number.isinteger
var isInteger = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor$1(it) === it;
};

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
_export({ target: 'Number', stat: true }, {
  isInteger: isInteger
});

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$1 = wellKnownSymbol('species');
var RegExpPrototype$2 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$1] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype$2, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype$2[SYMBOL], 'sham', true);
};

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

// @@match logic
fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var res = maybeCallNative(nativeMatch, this, string);
      if (res.done) return res.value;

      var rx = anObject(this);
      var S = String(string);

      if (!rx.global) return regexpExecAbstract(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var script = {
  components: {},
  props: {
    disabled: {
      validator: function validator(value) {
        return !value || value === "disabled" || value === true;
      }
    },
    readonly: {
      validator: function validator(value) {
        return !value || value === "readonly" || value === true;
      }
    },
    value: {
      validator: function validator(value) {
        if (!value) return true;

        var tt = _typeof(value);

        return tt === "string" || tt === "number";
      }
    },
    clearable: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    prefixLabel: String,
    suffixLabel: String,
    max: Number | String,
    min: Number | String,
    placeholder: String,
    errorText: String,
    rows: Number | String,
    name: String,
    maxlength: Number | String,
    autocomplete: String,
    required: Boolean,

    /**
     * @desc: 当type为float, unsigned-float时的小数位个数
     */
    decimal: Number,

    /**
     * @desc: 文本类型. 允许的值为:
     *        - int
     *        - unsigned-int
     *        - float
     *        - unsigned-float
     *        - tel
     *        - email
     *        - text
     *        - textarea
     */
    type: {
      validator: function validator(value) {
        return !value || ["int", "unsigned-int", "float", "unsigned-float", "tel", "email", "text", "textarea", "password"].indexOf(value) >= 0;
      }
    },

    /**
     * @desc: 正则表达式.
     */
    pattern: String,
    validator: {
      validator: function validator(value) {
        return !value || typeof value === "function";
      }
    }
  },
  // model: {
  //   prop: "value",
  //   event: 'change',
  // },
  data: function data() {
    return {
      value2: "",
      // 用于textarea上的value(ie中value不能变化,否则vdom会错误.)
      watchValue: true,
      isInputWrong: false,
      realPattern: null,
      regInput: null,
      defaultValue: null,
      isUnsigned: false,
      isFocus: false,
      _isFocusForClean: false,
      // 用于显示清除按钮.
      typelen: 0,
      floatStep: null,
      _min: Number.MIN_SAFE_INTEGER,
      _max: Number.MAX_SAFE_INTEGER,
      textChangeMark: false,
      isMarkError: null
    };
  },
  computed: {
    type2: function type2() {
      return ["int", "unsigned-int", "float", "unsigned-float"].indexOf(this.type) >= 0 ? "number" : this.type;
    },
    showClearable: function showClearable() {
      if (this.clearable) {
        if ((this.textChangeMark || !this.textChangeMark) && this._isFocusForClean) {
          var t = this.text();
          return t ? t.length > 0 : false;
        }
      }

      return false;
    }
  },
  watch: {
    value: function value(val) {
      if (this.watchValue) {
        this.text(val);
      }

      this.watchValue = true;
    },
    type: function type(val) {
      var _this = this;

      this.$nextTick(function () {
        _newArrowCheck(this, _this);

        this.init();
      }.bind(this));
    },
    max: function max(val) {
      this.init();
    },
    min: function min(val) {
      this.init();
    },
    pattern: function pattern(val) {
      this.init();
    }
  },
  beforeMount: function beforeMount() {
    this.value2 = this.value;
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    var el;
    el = $(this.$el);
    var ee = el.children("input")[0];

    if (!ee) {
      ee = el.children("textarea")[0];
    }

    ee = $(ee);
    ee.off('keydown').off('keyup').off('input').off('change').off('focus').off('blur').off('keyoff').off('keyoff');
  },
  methods: {
    init: function init() {
      var _this2 = this;

      // 默认的正则表达式.
      this.realPattern = this.pattern;

      if (this.realPattern && typeof this.realPattern === "string") {
        this.realPattern = new RegExp(this.realPattern);
      }

      switch (this.type) {
        case "int":
        case "unsigned-int":
        case "float":
        case "unsigned-float":
          this._initIntFloat();

          break;

        case "textarea":
          this._initTextarea();

          break;
        // case 'tel':
        // case 'email':

        default:
          this._initOther();

          break;
      } // switch.
      // 防止ie上刷新后保留input内容.


      if (utils.browserIsIE()) {
        this.$timer.sleep(100).then(function () {
          _newArrowCheck(this, _this2);

          this.text(this.value || "");
        }.bind(this));
      }

      this.text(this.value || '');
    },
    _initOther: function _initOther() {
      var _this3 = this;

      switch (this.type) {
        case "tel":
          if (!this.realPattern) {
            this.realPattern = new RegExp("^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\\d{8}$");
            this.regInput = new RegExp("[0-9]");
          }

          this.defaultValue = "";
          break;

        case "email":
          if (!this.realPattern) {
            this.realPattern = new RegExp("^(([A-Za-z0-9\u4E00-\u9FA5_-]|\\.)+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+)$");
          }

          this.defaultValue = "";
          break;
      } // switch.
      // validate.


      var el;
      el = $($(this.$el).children("input")[0]); // 进行一次验证.

      this.validate(function (vv) {
        _newArrowCheck(this, _this3);

        el.val(vv);
      }.bind(this), this.value, false, false);

      this._handleChange_text(el);

      this._handleFocusBlur(el);

      this._handleKeydownKeyup_text(el);

      this._handleInput(el);
    },
    _initTextarea: function _initTextarea() {
      var _this4 = this;

      // validate.
      var el;
      el = $($(this.$el).children("textarea")[0]); // 进行一次验证.

      if (this.$slots["default"] && this.$slots["default"].length > 0 && !string.isEmpty(this.$slots["default"][0].text)) {
        this.validate(function (vv) {
          _newArrowCheck(this, _this4);

          el.val(vv);
          this.typelen = vv.length;
        }.bind(this), this.$slots["default"][0].text, false, false);
      } else if (this.value) {
        this.typelen = this.value.length;
      }

      this._handleChange_text(el);

      this._handleFocusBlur(el);

      this._handleKeydownKeyup_text(el);

      this._handleInput(el);
    },
    _initIntFloat: function _initIntFloat() {
      var _this5 = this;

      switch (this.type) {
        case "int":
          this.isInt = true;

          if (!this.realPattern) {
            this.realPattern = new RegExp("^(((\\-)?[1-9]\\d*)|(0))$");
            this.defaultValue = "0";
          }

          break;

        case "unsigned-int":
          this.isInt = true;

          if (!this.realPattern) {
            this.realPattern = new RegExp("^([1-9](\\d*)|(0))$");
          }

          this.defaultValue = "0";
          this.isUnsigned = true;
          break;

        case "float":
          this.isFloat = true;

          if (!this.realPattern) {
            if (this.decimal) {
              this.realPattern = new RegExp("^(\\-?((0(\\.\\d{0," + this.decimal + "})?)|([1-9]\\d*(\\.\\d{0," + this.decimal + "})?)))$");
            } else {
              this.realPattern = new RegExp("^(\\-?((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$");
            }
          }

          this.defaultValue = "0.0";

          if (this.decimal > 0) {
            var tt = "0.";

            for (var i = 0; i < this.decimal - 1; i++) {
              tt += "0";
            }

            tt += "1";
            this.floatStep = tt;
          }

          break;

        case "unsigned-float":
          this.isFloat = true;

          if (!this.realPattern) {
            if (this.decimal) {
              this.realPattern = new RegExp("^(((0(\\.\\d{0," + this.decimal + "})?)|([1-9]\\d*(\\.\\d{0," + this.decimal + "})?)))$");
            } else {
              this.realPattern = new RegExp("^(((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$");
            }
          }

          this.defaultValue = "0.0";

          if (this.decimal > 0) {
            var _tt = "0.";

            for (var _i = 0; _i < this.decimal - 1; _i++) {
              _tt += "0";
            }

            _tt += "1";
            this.floatStep = _tt;
          }

          this.isUnsigned = true;
          break;
      } // switch.
      // validate.


      var el;
      el = $($(this.$el).children("input")[0]);
      this._min = Number.isNaN(parseFloat(this.min)) ? Number.MIN_SAFE_INTEGER : parseFloat(this.min);
      this._max = Number.isNaN(parseFloat(this.max)) ? Number.MAX_SAFE_INTEGER : parseFloat(this.max); // 进行一次验证.

      this.validate(function (vv) {
        _newArrowCheck(this, _this5);

        el.val(vv);
      }.bind(this), this.value, false, false);

      this._handleChange_number(el);

      this._handleFocusBlur(el);

      this._handleKeydownKeyup_number(el);

      this._handleInput(el);
    },
    _handleInput: function _handleInput(el) {
      var _this6 = this;

      // input.
      el.off("input");
      el.on("input", function (event) {
        var _this7 = this;

        _newArrowCheck(this, _this6);

        // console.debug('event ' + event.type);
        var elem = $(event.currentTarget);
        var value = elem.val() || "";

        if (this.isInt || this.isFloat) {
          this.validate(function (vv) {
            _newArrowCheck(this, _this7);

            elem.val(vv);

            if (this.isMarkError == vv) {
              this.isInputWrong = true;
            }
          }.bind(this), value, true);
        } else {
          if (this.pattern) {
            this.validate(function (vv) {
              _newArrowCheck(this, _this7);

              elem.val(vv);

              if (this.isMarkError == vv) {
                this.isInputWrong = true;
              }
            }.bind(this), value, true);
          } else {
            this.validate(null, value, true);

            if (this.isMarkError == value) {
              this.isInputWrong = true;
            }
          }
        } // type.


        if (this.isInt || this.isFloat) {
          value = Number(value);
          this.watchValue = false;
          this.$emit("input", value);
        } else {
          this.watchValue = false;

          this._onNextInput();

          this.$emit("input", value);
        }
      }.bind(this));
    },
    _handleKeydownKeyup_text: function _handleKeydownKeyup_text(el) {
      var _this8 = this;

      // keydown, keyup.
      el.off("keydown");
      el.on("keydown", function (event) {
        _newArrowCheck(this, _this8);

        // console.debug('event text ' + event.type);
        if (event.key.length > 1) {
          return true;
        }

        if (this.regInput) {
          if (!this.regInput.test(event.key)) {
            event.stopPropagation();
            event.preventDefault();
            event.cancelBubble = true;
            return false;
          }
        } // if.
        // update value.


        this.$emit("keydown", event);
        return true;
      }.bind(this));

      if (this.type == "textarea") {
        el.off("keyup");
        el.on("keyup", function (event) {
          _newArrowCheck(this, _this8);

          // console.debug('event textarea ' + event.type);
          var vv = $(event.currentTarget).val() || "";
          this.typelen = vv.length;
          this.$emit("keyup", event);
        }.bind(this));
      } else {
        el.off("keyup");
        el.on("keyup", function (event) {
          _newArrowCheck(this, _this8);

          // console.debug('event ' + event.type);
          this.$emit("keyup", event);
        }.bind(this));
      }
    },
    _handleKeydownKeyup_number: function _handleKeydownKeyup_number(el) {
      var _this9 = this;

      // number.
      el.off(utils.browserIsMobile() ? "input" : "keydown");
      el.on(utils.browserIsMobile() ? "input" : "keydown", function (event) {
        var _this10 = this;

        _newArrowCheck(this, _this9);

        // console.debug('event number ' + event.type);
        var key = event.key || event.data;

        if (key && key.length > 1) {
          return true;
        }

        var elem = $(event.currentTarget);
        var value = elem.val() || "";

        if (event.inputType == "deleteContentBackward" || event.inputType == "deleteContentForward") {
          this.$emit("keydown", event);

          if (utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }

          return true;
        }

        var isEmpty = value.length == 0;
        var code = event.which || event.keyCode;

        if (key === "-" || code == 109 || code == 189) {
          // -
          if (!this.isUnsigned) {
            if (value && value.length > 0) {
              if (value[0] == "-") {
                value = value.substr(1);
                elem.val(value);
              } else {
                value = "-" + value;
                elem.val(value);
              }
            }
          } // update value.


          this.$emit("keydown", event);

          if (utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }

          event.stopPropagation();
          event.preventDefault();
          event.cancelBubble = true;
          return false;
        } // if.
        // 0~9.


        if (key >= "0" && key <= "9") {
          if (value == "0") {
            value = "0.";
          } else if (value == "-0") {
            value = "-0.";
          }

          value = value + key;

          if (this.isFloat && this.decimal) {
            var ii = value.indexOf(".");

            if (ii >= 0 && value.length - ii - 1 > this.decimal) {
              value = value.substr(0, ii + 1 + this.decimal);
              elem.val(value); // update value.

              this.$emit("keydown", event);

              if (utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit("input", value);
              }

              event.stopPropagation();
              event.preventDefault();
              event.cancelBubble = true;
              return false;
            }
          } // update value.


          this.$emit("keydown", event);

          if (utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }

          return true;
        } // .
        else if (key == "." && this.isFloat) {
            if (value.indexOf(".") < 0) {
              if (isEmpty) {
                value = "0.";
                elem.val(value);
              } // update value.


              this.$emit("keydown", event);

              if (utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit("input", value);
              }

              return true;
            }
          } else if (!isEmpty) {
            this.validate(function (vv) {
              _newArrowCheck(this, _this10);

              elem.val(value);

              if (utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit("input", value);
              }
            }.bind(this), value, true);
          } else {
            value = "";
            elem.val("");

            if (utils.browserIsMobile()) {
              this.watchValue = false;
              this.$emit("input", value);
            }
          } // update value.


        this.$emit("keydown", event);
        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
      }.bind(this));
      el.off("keyup");
      el.on("keyup", function (event) {
        _newArrowCheck(this, _this9);

        // console.debug('event number ' + event.type);
        this.$emit("keyup", event);
      }.bind(this));
    },
    _handleChange_text: function _handleChange_text(el) {
      var _this11 = this;

      // change.
      el.off("change");
      el.on("change", function (event) {
        _newArrowCheck(this, _this11);

        // console.debug('event text ' + event.type);
        var elem = $(event.currentTarget);
        var value = elem.val() || "";
        this.validate(null, value);

        this._onNextInput();

        this.$emit("input", value);
        this.$emit("change", value);
      }.bind(this));
    },
    _handleChange_number: function _handleChange_number(el) {
      var _this12 = this;

      el.off("change");
      el.on("change", function (event) {
        var _this13 = this;

        _newArrowCheck(this, _this12);

        // console.debug('event number ' + event.type);
        var elem = $(event.currentTarget);
        var value = elem.val() || "";
        this.validate(function (vv) {
          _newArrowCheck(this, _this13);

          elem.val(vv);
        }.bind(this), value);
        value = Number(value);
        this.$emit("input", value);
        this.$emit("change", value);
      }.bind(this));
    },
    _handleFocusBlur: function _handleFocusBlur(el) {
      var _this14 = this;

      // no need picker.
      var autoHide = function autoHide(event) {
        _newArrowCheck(this, _this14);

        // TODO: el不存在时.
        if (!event.currentTarget || !event.currentTarget.isSameNode(el[0])) {
          el[0].blur();
        }
      }.bind(this);

      el.off("focus");
      el.on("focus", function (event) {
        var _this15 = this;

        _newArrowCheck(this, _this14);

        // console.debug('event ' + event.type);
        // this.isInputWrong = false;
        // this.isValid();
        this.$emit("focus", event);
        this.isFocus = true;

        if (this.type2 != 'number') {
          this.$timer.sleep(200).then(function () {
            _newArrowCheck(this, _this15);

            this._isFocusForClean = true;

            this._onNextInput();
          }.bind(this));
        } // mobile side scroll.


        if (utils.browserIsMobile()) {
          setTimeout(function () {
            _newArrowCheck(this, _this15);

            $("body").on("touchstart", autoHide);
          }.bind(this), 100);

          if (el[0] && (el[0].scrollIntoView || el[0].scrollIntoViewIfNeeded)) {
            setTimeout(function () {
              _newArrowCheck(this, _this15);

              if (el[0].scrollIntoViewIfNeeded) el[0].scrollIntoViewIfNeeded();else el[0].scrollIntoView(false);
            }.bind(this), 300);
          }
        }
      }.bind(this));
      el.off("blur");
      el.on("blur", function (event) {
        var _this16 = this;

        _newArrowCheck(this, _this14);

        // console.debug('event ' + event.type);
        this.isFocus = false;

        if (this.type2 != 'number') {
          this.$timer.sleep(200).then(function () {
            _newArrowCheck(this, _this16);

            this._isFocusForClean = false;

            this._onNextInput();
          }.bind(this));
        }

        if (utils.browserIsMobile()) {
          $("body").off("touchstart", autoHide);
        }

        var elem = $(event.currentTarget);
        var value = elem.val() || "";
        var oldValue = value;

        if (this.isMarkError == value) {
          this.isInputWrong = true;
          return;
        }

        this.isMarkError = null;
        this.validate(function (newValue) {
          _newArrowCheck(this, _this16);

          // type.
          if (this.isInt || this.isFloat) {
            oldValue = Number(oldValue) || 0;
            newValue = Number(newValue) || 0;

            if (this.isFloat) {
              if (Number.isInteger(newValue)) {
                newValue = newValue.toString() + '.0';
              }

              elem.val(newValue);
              newValue = Number(newValue);
            } else {
              newValue = Math.floor(newValue);
              elem.val(newValue);
            }
          }

          if (oldValue != newValue) {
            this.$emit("input", newValue);
            this.$emit("change", newValue, oldValue);
          }

          this.$emit("blur", event);
        }.bind(this), value, false);
      }.bind(this));
    },

    /**
     * @desc: 验证值是否合法, 并返回合法值.
     * @param callback: (v)=>void.
     * @param isInputing: 是否正在输入.
     * @param changeInputWrong: 改变输入错误状态.
     */
    validate: function validate(callback, value) {
      var _this17 = this;

      var isInputing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var changeInputWrong = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (utils.isNull(value)) {
        value = "";
      }

      value = value.toString();

      if (string.isEmpty(value)) {
        // if (!isInputing) {
        if (!this.required) {
          if (changeInputWrong) {
            this.isInputWrong = false;
          }
        } else {
          if (changeInputWrong) {
            this.isInputWrong = true;
            this.$emit("error", this, this.errorText);
          }
        } // }


        if (callback) callback(value);
        return; // return value;
      } // maxlength.


      if (this.maxlength) {
        if (value.length > this.maxlength) {
          value = value.substr(0, this.maxlength);
        }
      }

      if (this.realPattern) {
        var matches;

        try {
          if (this.isInt) {
            var ii = value.indexOf(".");

            if (ii >= 0) {
              value = value.substring(0, ii);
            }
          } else if (this.isFloat) {
            if (this.decimal) {
              var _ii = value.indexOf(".");

              if (_ii >= 0 && value.length - _ii - 1 > this.decimal) {
                var jj = value.indexOf(".", _ii + 1);
                if (jj < 0) jj = value.length;
                jj = Math.min(jj, _ii + this.decimal + 1);
                value = value.substring(0, jj);
              }
            }
          }

          matches = this.realPattern.exec(value);
        } catch (e) {
          console.log(e);
        }

        if (!matches || !matches[0]) {
          var v1 = value;

          if (!(v1.length == 0 && isInputing)) {
            v1 = this.defaultValue;
          }

          if (changeInputWrong) {
            this.isInputWrong = true;
            this.$emit("error", this, this.errorText);
          }

          if (callback) callback(v1);
          return; // return this.defaultValue;
        } else {
          value = matches[0];
          var v2 = value;

          if (this.isFloat) {
            if (value.length > 0) {
              if (value[0] == ".") value = "0" + value;else if (!isInputing) {
                if (value[value.length - 1] == ".") value += "0";else if (value.indexOf(".") < 0) value += ".0";
              }
              v2 = value;
            } else if (!isInputing) {
              v2 = this.defaultValue;
            }
          }

          if (this.isFloat || this.isInt) {
            v2 = Number(v2) || 0;

            if (v2 > this._max) {
              v2 = this._max; // return this._max;
            }

            if (v2 < this._min) {
              v2 = this._min; // return this._min;
            }
          }

          if (changeInputWrong) {
            if (this.validator) {
              this.validator(parseFloat(v2), function (valid) {
                _newArrowCheck(this, _this17);

                if (!valid) {
                  this.isInputWrong = true;
                  this.$emit("error", this, this.errorText);
                } else {
                  this.isInputWrong = false;
                }
              }.bind(this));
            } else {
              this.isInputWrong = false;
            }
          }

          if (callback) callback(v2);
          return; // return value;
        }
      } else {
        if (changeInputWrong) {
          if (this.validator) {
            this.validator(value, function (valid) {
              _newArrowCheck(this, _this17);

              if (!valid) {
                this.isInputWrong = true;
                this.$emit("error", this, this.errorText);
              } else {
                this.isInputWrong = false;
              }
            }.bind(this));
          } else {
            this.isInputWrong = false;
          }
        }

        if (callback) callback(value);
        return; // return value;
      }
    },
    focus: function focus() {
      var elem = $(this.$el);

      if (this.type === "textarea") {
        elem = $(elem.children("textarea")[0]);
      } else {
        elem = $(elem.children("input")[0]);
      }

      elem[0].focus();
    },

    /**
     * @desc 设置or获取文本
     * @param content: 如果为null, 则返回当前的值.
     *                 如果为 '' 则设置为无内容样式.
     */
    text: function text(content) {
      var _this18 = this;

      var elem = $(this.$el);

      if (this.type === "textarea") {
        elem = $(elem.children("textarea")[0]);
      } else {
        elem = $(elem.children("input")[0]);
      }

      if (utils.isNull(content)) {
        return this.isInt || this.isFloat ? Number(elem.val()) || 0 : elem.val();
      } else {
        // type.
        if (this.isInt || this.isFloat) {
          this.validate(function (newContent) {
            _newArrowCheck(this, _this18);

            newContent = Number(newContent) || 0;

            if (this.isFloat) {
              if (Number.isInteger(newContent)) {
                newContent = newContent.toString() + '.0';
              }

              elem.val(newContent);
            } else {
              newContent = Math.floor(newContent);
              elem.val(newContent);
            }
          }.bind(this), content);
        } else {
          this.validate(null, content);
          elem.val(content);

          this._onNextInput();

          this.typelen = content ? content.length : 0;
        }
      }
    },

    /**
     * @desc: 验证当前是否输入正确.
     * @return: boolean.
     */
    isValid: function isValid() {
      var el;

      if (this.type === "textarea") {
        el = $($(this.$el).children("textarea")[0]);
      } else {
        el = $($(this.$el).children("input")[0]);
      }

      this.validate(null, el.val());
      return !this.isInputWrong;
    },

    /**
     * @desc: 标记为输入错误状态, 当输入内容改变后按验证规则进行验证.
     */
    markError: function markError() {
      this.isMarkError = this.text();
      this.isInputWrong = true;
    },

    /**
     * @desc: ios 键盘不回弹问题.
     */
    _onBlur_fixScroll: function _onBlur_fixScroll() {
      var _this19 = this;

      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      if (isIOS) {
        setTimeout(function () {
          _newArrowCheck(this, _this19);

          var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo({
            left: 0,
            top: Math.max(scrollHeight - 1, 0),
            behavior: "smooth"
          }); // window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          // this.$emit('blur');
        }.bind(this), 200);
      }
    },

    /**
     * @desc: 点击后置图标.
     */
    _onSuffixIcon: function _onSuffixIcon() {
      this.$emit("click-icon", "suffixIcon");
    },

    /**
     * @desc: 点击后置图标.
     */
    _onPrefixIcon: function _onPrefixIcon() {
      this.$emit("click-icon", "prefixIcon");
    },
    _onNextInput: function _onNextInput() {
      if (this.clearable) {
        this.textChangeMark = !this.textChangeMark;
      }
    }
  }
};

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var SPECIES$2 = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var SPECIES$3 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$3] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    "class": {
      "bp-input": true,
      "bp-input__warn": _vm.isInputWrong,
      "bp-input__textarea": _vm.type === "textarea",
      "bp-input__disabled": _vm.disabled !== undefined && _vm.disabled !== false,
      "bp-input__focus": _vm.isFocus
    }
  }, [_vm.prefixIcon ? _c("bp-icon", {
    staticClass: "bp-input__prefixIcon",
    attrs: {
      width: "25px",
      name: _vm.prefixIcon
    },
    on: {
      click: _vm._onPrefixIcon
    }
  }) : _vm.prefixLabel ? _c("span", {
    staticClass: "bp-input__prefixLabel"
  }, [_vm._v(_vm._s(_vm.prefixLabel))]) : _vm._e(), _vm._v(" "), _vm.type === "textarea" ? _c("textarea", {
    staticClass: "bp-input__inner",
    attrs: {
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      placeholder: _vm.placeholder,
      rows: _vm.rows,
      name: _vm.name,
      maxlength: _vm.maxlength,
      autocomplete: _vm.autocomplete,
      required: _vm.required
    },
    on: {
      blur: function blur($event) {
        $event.preventDefault();
        return _vm._onBlur_fixScroll.apply(null, arguments);
      }
    }
  }, [_vm._v(_vm._s(_vm.value2 || ""))]) : _c("input", {
    staticClass: "bp-input__inner",
    attrs: {
      type: _vm.type2,
      disabled: _vm.disabled,
      step: _vm.floatStep,
      readonly: _vm.readonly,
      placeholder: _vm.placeholder,
      name: _vm.name,
      maxlength: _vm.maxlength,
      autocomplete: _vm.autocomplete,
      required: _vm.required
    },
    on: {
      blur: function blur($event) {
        $event.preventDefault();
        return _vm._onBlur_fixScroll.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _vm.isInputWrong ? _c("bp-icon", {
    staticClass: "bp-input__warnIcon",
    attrs: {
      width: "25px",
      name: "bp-input_warn"
    }
  }) : _vm._e(), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showClearable,
      expression: "showClearable"
    }],
    staticClass: "bp-input_clearIcon",
    on: {
      click: function click() {
        return _vm.text("");
      }
    }
  }, [_c("div", [_c("bp-icon", {
    attrs: {
      name: "bp-input_clear"
    }
  })], 1)]), _vm._v(" "), _vm.type === "textarea" && _vm.maxlength ? _c("div", {
    staticClass: "bp-input__counter"
  }, [_c("span", [_vm._v(_vm._s(_vm.typelen))]), _vm._v("/" + _vm._s(_vm.maxlength) + "\n  ")]) : _vm._e(), _vm._v(" "), _vm.suffixIcon ? _c("bp-icon", {
    staticClass: "bp-input__suffixIcon",
    attrs: {
      width: "25px",
      name: _vm.suffixIcon
    },
    on: {
      click: _vm._onSuffixIcon
    }
  }) : _vm.suffixLabel ? _c("span", {
    staticClass: "bp-input__suffixLabel"
  }, [_vm._v(_vm._s(_vm.suffixLabel))]) : _vm._e()], 1);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function init() {
  bpLibs.icons.registerFontIcon('none', 'none');
  bpLibs.icons.registerAliasIcon('bp-input_warn', 'none');
  bpLibs.icons.registerAliasIcon('bp-input_clear', 'cancel');
}

init();
var index$1 = {
  init: init,
  bpInput: __vue_component__
};

export default index$1;
//# sourceMappingURL=index.esm.js.map
