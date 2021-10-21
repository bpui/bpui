/*!
 * bpui picker v1.1.28
 * Copyright (c) 2021 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('febs-browser'), require('@bpui/libs'), require('@bpui/dialog')) :
  typeof define === 'function' && define.amd ? define(['febs-browser', '@bpui/libs', '@bpui/dialog'], factory) :
  (global = global || self, global.bpPicker = factory(global.febs, global.bpLibs, global.bpDialog));
}(this, (function (febs, bpLibs$1, bpDialog) { 'use strict';

  bpLibs$1 = bpLibs$1 && Object.prototype.hasOwnProperty.call(bpLibs$1, 'default') ? bpLibs$1['default'] : bpLibs$1;
  bpDialog = bpDialog && Object.prototype.hasOwnProperty.call(bpDialog, 'default') ? bpDialog['default'] : bpDialog;

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

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

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
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

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
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

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject(it), key);
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

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
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
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
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

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
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

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

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

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






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
        descriptor = getOwnPropertyDescriptor$1(target, key);
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

  var nativePromiseConstructor = global_1.Promise;

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
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

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
      defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
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

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var iterators = {};

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  var iteratorClose = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var html = getBuiltIn('document', 'documentElement');

  var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var location = global_1.location;
  var set$1 = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process$1 = global_1.process;
  var MessageChannel = global_1.MessageChannel;
  var Dispatch = global_1.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(id + '', location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (engineIsNode) {
      defer = function (id) {
        process$1.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global_1.addEventListener &&
      typeof postMessage == 'function' &&
      !global_1.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails(post)
    ) {
      defer = post;
      global_1.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task = {
    set: set$1,
    clear: clear
  };

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task.set;




  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var document$2 = global_1.document;
  var process$2 = global_1.process;
  var Promise$1 = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (engineIsNode && (parent = process$2.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = promise.then;
      notify = function () {
        then.call(promise, flush);
      };
    // Node.js without promises
    } else if (engineIsNode) {
      notify = function () {
        process$2.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global_1, flush);
      };
    }
  }

  var microtask = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  var f$5 = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability = {
  	f: f$5
  };

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var hostReportErrors = function (a, b) {
    var console = global_1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var engineIsBrowser = typeof window == 'object';

  var task$1 = task.set;












  var SPECIES$2 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState = internalState.get;
  var setInternalState = internalState.set;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var NativePromisePrototype = nativePromiseConstructor && nativePromiseConstructor.prototype;
  var PromiseConstructor = nativePromiseConstructor;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global_1.TypeError;
  var document$3 = global_1.document;
  var process$3 = global_1.process;
  var newPromiseCapability$1 = newPromiseCapability.f;
  var newGenericPromiseCapability = newPromiseCapability$1;
  var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global_1.dispatchEvent);
  var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED = isForced_1(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && engineV8Version === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (engineV8Version >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$2] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && engineIsBrowser && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify$1 = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$3.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task$1.call(global_1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (engineIsNode) {
            process$3.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task$1.call(global_1, function () {
      var promise = state.facade;
      if (engineIsNode) {
        process$3.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      var state = getInternalState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = engineIsNode ? process$3.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify$1(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if ( typeof nativePromiseConstructor == 'function' && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (objectSetPrototypeOf) {
        objectSetPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
      }
    }
  }

  _export({ global: true, wrap: true, forced: FORCED }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  _export({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability$1(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  _export({ target: PROMISE, stat: true, forced:  FORCED }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve( this, x);
    }
  });

  _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        iterate(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  /**
  * Copyright (c) 2020 Copyright bpui All Rights Reserved.
  * Author: lipengxiang
  * Date: 2020-03-04 16:18
  * Desc: 
  */

  function isArrayEqual(v1, v2) {
    if (!v1 && !v2) {
      return true;
    }

    if (Array.isArray(v1) && Array.isArray(v2) && v1.length == v2.length) {
      for (var i = 0; i < v1.length; i++) {
        if (v1[i] != v2[i]) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
  function isArrayEqualByKey(v1, v2, keys) {
    if (!v1 && !v2) {
      return true;
    }

    if (Array.isArray(v1) && Array.isArray(v2) && v1.length == v2.length) {
      for (var i = 0; i < v1.length; i++) {
        for (var j = 0; j < keys.length; j++) {
          if (Array.isArray(v1[i][keys[j]])) {
            if (!isArrayEqualByKey(v1[i][keys[j]], v2[i][keys[j]], keys)) {
              return false;
            }
          } else if (v1[i][keys[j]] != v2[i][keys[j]]) {
            return false;
          }
        }
      }

      return true;
    }

    return false;
  }

  var _default = /*#__PURE__*/function () {
    /**
    * @param ds: [{label:'', value:0}, ],  // 数据源.
    */
    function _default(ds) {
      _classCallCheck(this, _default);

      ds = ds || [];

      if (!(ds && Array.isArray(ds))) {
        throw new Error('Picker datasource must is array & isnt null');
      }

      this.ds = ds;
    }
    /**
    * @desc: 返回数据源组数(最多4个)
    */


    _createClass(_default, [{
      key: "picker_datasource_groups",
      value: function picker_datasource_groups(callback) {
        callback(1);
      }
      /**
      * @desc: 返回指定组的数据源
      * @return: 
      *       {
                datasource: [{label:'', value:0}, ],  // 数据源.
                value:      0,  // 选择的值.
              }
      */

    }, {
      key: "picker_datasource",
      value: function picker_datasource(groupIndex, picker, callback) {
        callback({
          datasource: this.ds,
          value: this.ds.length > 0 ? this.ds[0].value : null
        });
      }
      /**
      * @desc: 当前选中的值改变后.
      */

    }, {
      key: "picker_changed",
      value: function picker_changed(groupIndex, picker) {}
    }]);

    return _default;
  }();

  var _default$1 = /*#__PURE__*/function () {
    /**
    * @param ds: [{label:'', value:0, children:[]}, ],  // 数据源.
    */
    function _default(ds) {
      _classCallCheck(this, _default);

      ds = ds || [];

      if (!(ds && Array.isArray(ds))) {
        throw new Error('Picker datasource must is array & isnt null');
      }

      this.ds = ds;
    }
    /**
    * @desc: 返回数据源组数(最多4个)
    */


    _createClass(_default, [{
      key: "picker_datasource_groups",
      value: function picker_datasource_groups(callback) {
        callback(2);
      }
      /**
      * @desc: 返回指定组的数据源
      * @return: 
      *       {
                datasource: [{label:'', value:0}, ],  // 数据源.
                value:      0,  // 选择的值.
              }
      */

    }, {
      key: "picker_datasource",
      value: function picker_datasource(groupIndex, picker, callback) {
        if (groupIndex == 0) {
          callback({
            datasource: this.ds,
            value: this.ds.length > 0 ? this.ds[0].value : null
          });
        } else {
          var select0 = picker.getSelect(0);

          if (select0) {
            for (var i = 0; i < this.ds.length; i++) {
              if (this.ds[i].value == select0.value) {
                if (this.ds[i].children) {
                  callback({
                    datasource: this.ds[i].children,
                    value: this.ds[i].children.length > 0 ? this.ds[i].children[0].value : null
                  });
                } else {
                  callback({
                    datasource: [],
                    value: null
                  });
                }

                return;
              }
            }
          } else {
            callback({
              datasource: [],
              value: null
            });
          }
        }
      }
      /**
      * @desc: 当前选中的值改变后.
      */

    }, {
      key: "picker_changed",
      value: function picker_changed(groupIndex, picker) {
        var _this = this;

        if (groupIndex == 0) {
          picker.refreshDatasource(1).then(function (value) {
            _newArrowCheck(this, _this);
          }.bind(this));
        }
      }
    }]);

    return _default;
  }();

  var _default$2 = /*#__PURE__*/function () {
    /**
    * @param ds: [{label:'', value:0, children:[
    *                     {children:[]}
    *             ]}, ],  // 数据源.
    */
    function _default(ds) {
      _classCallCheck(this, _default);

      ds = ds || [];

      if (!(ds && Array.isArray(ds))) {
        throw new Error('Picker datasource must is array & isnt null');
      }

      this.ds = ds;
    }
    /**
    * @desc: 返回数据源组数(最多4个)
    */


    _createClass(_default, [{
      key: "picker_datasource_groups",
      value: function picker_datasource_groups(callback) {
        callback(3);
      }
      /**
      * @desc: 返回指定组的数据源
      * @return: 
      *       {
                datasource: [{label:'', value:0}, ],  // 数据源.
                value:      0,  // 选择的值.
              }
      */

    }, {
      key: "picker_datasource",
      value: function picker_datasource(groupIndex, picker, callback) {
        if (groupIndex == 0) {
          callback({
            datasource: this.ds,
            value: this.ds.length > 0 ? this.ds[0].value : null
          });
        } else if (groupIndex == 1) {
          var select0 = picker.getSelect(0);

          if (select0) {
            for (var i = 0; i < this.ds.length; i++) {
              if (this.ds[i].value == select0.value) {
                if (this.ds[i].children) {
                  callback({
                    datasource: this.ds[i].children,
                    value: this.ds[i].children.length > 0 ? this.ds[i].children[0].value : null
                  });
                } else {
                  callback({
                    datasource: [],
                    value: null
                  });
                }

                return;
              }
            }
          } else {
            callback({
              datasource: [],
              value: null
            });
          }
        } else if (groupIndex == 2) {
          var _select = picker.getSelect(0);

          var select1 = picker.getSelect(1);

          if (_select && select1) {
            for (var _i = 0; _i < this.ds.length; _i++) {
              if (this.ds[_i].value == _select.value) {
                var ds1 = this.ds[_i].children;

                if (ds1) {
                  for (var j = 0; j < ds1.length; j++) {
                    if (ds1[j].value == select1.value) {
                      if (ds1[j].children) {
                        callback({
                          datasource: ds1[j].children,
                          value: ds1[j].children.length > 0 ? ds1[j].children[0].value : null
                        });
                      } else {
                        callback({
                          datasource: [],
                          value: null
                        });
                      }

                      return;
                    }
                  }
                } else {
                  callback({
                    datasource: [],
                    value: null
                  });
                }

                return;
              }
            }
          } else {
            callback({
              datasource: [],
              value: null
            });
          }
        }
      }
      /**
      * @desc: 当前选中的值改变后.
      */

    }, {
      key: "picker_changed",
      value: function picker_changed(groupIndex, picker) {
        var _this = this;

        if (groupIndex == 0) {
          picker.refreshDatasource(1).then(function (value) {
            _newArrowCheck(this, _this);

            return picker.refreshDatasource(2);
          }.bind(this)).then(function (value) {
            _newArrowCheck(this, _this);
          }.bind(this));
        } else if (groupIndex == 1) {
          picker.refreshDatasource(2).then(function (value) {
            _newArrowCheck(this, _this);
          }.bind(this));
        }
      }
    }]);

    return _default;
  }();

  // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  var thisNumberValue = function (value) {
    if (typeof value != 'number' && classofRaw(value) != 'Number') {
      throw TypeError('Incorrect invocation');
    }
    return +value;
  };

  // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  var stringRepeat = function repeat(count) {
    var str = String(requireObjectCoercible(this));
    var result = '';
    var n = toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
    for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
    return result;
  };

  var nativeToFixed = 1.0.toFixed;
  var floor$1 = Math.floor;

  var pow = function (x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };

  var log = function (x) {
    var n = 0;
    var x2 = x;
    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }
    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    } return n;
  };

  var multiply = function (data, n, c) {
    var index = -1;
    var c2 = c;
    while (++index < 6) {
      c2 += n * data[index];
      data[index] = c2 % 1e7;
      c2 = floor$1(c2 / 1e7);
    }
  };

  var divide = function (data, n) {
    var index = 6;
    var c = 0;
    while (--index >= 0) {
      c += data[index];
      data[index] = floor$1(c / n);
      c = (c % n) * 1e7;
    }
  };

  var dataToString = function (data) {
    var index = 6;
    var s = '';
    while (--index >= 0) {
      if (s !== '' || index === 0 || data[index] !== 0) {
        var t = String(data[index]);
        s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
      }
    } return s;
  };

  var FORCED$1 = nativeToFixed && (
    0.00008.toFixed(3) !== '0.000' ||
    0.9.toFixed(0) !== '1' ||
    1.255.toFixed(2) !== '1.25' ||
    1000000000000000128.0.toFixed(0) !== '1000000000000000128'
  ) || !fails(function () {
    // V8 ~ Android 4.3-
    nativeToFixed.call({});
  });

  // `Number.prototype.toFixed` method
  // https://tc39.es/ecma262/#sec-number.prototype.tofixed
  _export({ target: 'Number', proto: true, forced: FORCED$1 }, {
    toFixed: function toFixed(fractionDigits) {
      var number = thisNumberValue(this);
      var fractDigits = toInteger(fractionDigits);
      var data = [0, 0, 0, 0, 0, 0];
      var sign = '';
      var result = '0';
      var e, z, j, k;

      if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
      // eslint-disable-next-line no-self-compare -- NaN check
      if (number != number) return 'NaN';
      if (number <= -1e21 || number >= 1e21) return String(number);
      if (number < 0) {
        sign = '-';
        number = -number;
      }
      if (number > 1e-21) {
        e = log(number * pow(2, 69, 1)) - 69;
        z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;
        if (e > 0) {
          multiply(data, 0, z);
          j = fractDigits;
          while (j >= 7) {
            multiply(data, 1e7, 0);
            j -= 7;
          }
          multiply(data, pow(10, j, 1), 0);
          j = e - 1;
          while (j >= 23) {
            divide(data, 1 << 23);
            j -= 23;
          }
          divide(data, 1 << j);
          multiply(data, 1, 1);
          divide(data, 2);
          result = dataToString(data);
        } else {
          multiply(data, 0, z);
          multiply(data, 1 << -e, 0);
          result = dataToString(data) + stringRepeat.call('0', fractDigits);
        }
      }
      if (fractDigits > 0) {
        k = result.length;
        result = sign + (k <= fractDigits
          ? '0.' + stringRepeat.call('0', fractDigits - k) + result
          : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
      } else {
        result = sign + result;
      } return result;
    }
  });

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

  /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */




  var getInternalState$1 = internalState.get;



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

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(str) {
      var re = this;
      var state = getInternalState$1(re);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
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

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$3 = wellKnownSymbol('species');
  var RegExpPrototype = RegExp.prototype;

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
        re.constructor[SPECIES$3] = function () { return re; };
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
        if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
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
      redefine(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
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
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
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

  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min$2 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(this);
        var S = String(string);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y$2 ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y$2 ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y$2 ? 0 : q;
          var z = regexpExecAbstract(splitter, UNSUPPORTED_Y$2 ? S.slice(q) : S);
          var e;
          if (
            z === null ||
            (e = min$2(toLength(splitter.lastIndex + (UNSUPPORTED_Y$2 ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$2);

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
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
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
  };

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
  };

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var floor$2 = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$2(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var REPLACE = wellKnownSymbol('replace');
  var max$1 = Math.max;
  var min$3 = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, this, string, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject(this);
        var S = String(string);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$1(min$3(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var POS_CENTER = 120;
  var POS_CELL_HEIGHT = 40;
  var WHEEL_STEP = 80;

  function bee() {
    bpLibs$1.device.vibrate(10);
  }

  function mobile_onWheel_picker(event) {
    // start.
    event = event || window.event;
    var delta;
    var agent = navigator.userAgent;

    if (/.*Firefox.*/.test(agent)) {
      delta = event.detail;
    } else {
      delta = event.wheelDelta;
    }

    var target = event.currentTarget;

    if (target) {
      var tt = $(target).parent('.bp-picker__group').children('.bp-picker__content');
      tt = $(tt[0]);

      if (!tt[0]) {
        return false;
      } //
      // start.


      tt = tt[0];
      var oldOffset = picker_getOffset($(tt));
      var offset = oldOffset;

      if (!tt.__picker_wheel) {
        tt.__picker_wheel = 0;
      }

      tt.__picker_wheel += delta; //
      // end.

      var ttt = $(tt); // !move.

      if (tt.__picker_wheel > WHEEL_STEP) {
        offset += POS_CELL_HEIGHT / 2 + 1;
        tt.__picker_wheel %= WHEEL_STEP;
      } else if (tt.__picker_wheel < -WHEEL_STEP) {
        offset -= POS_CELL_HEIGHT / 2 + 1;
        tt.__picker_wheel %= WHEEL_STEP;
      } else {
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      }

      offset = picker_setOffset(ttt, offset);

      if (oldOffset != offset) {
        bee();
        ttt.trigger('change');
      } // console.log(offset);


      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble = true;
      return false;
    }
  } //
  // event.

  function mobile_onTouchstart_picker(event) {
    event = event || window.event;
    var touch;

    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = {
        clientX: event.clientX,
        clientY: event.clientY
      };
    }

    if (touch) {
      var target = event.currentTarget;

      if (target) {
        var tt = $(target).parent('.bp-picker__group').children('.bp-picker__content');
        tt = $(tt[0]);

        if (!tt[0]) {
          return false;
        }

        tt.css('transition', 'none');
        tt = tt[0];
        tt.__picker_start = true;
        tt.__picker_touch = touch.clientX;
        tt.__picker_touch1 = touch.clientY;
        tt.__picker_start_at = Date.now();
        var offset = picker_getOffset($(tt));
        tt.__offset = offset;

        if (typeof target.ontouchstart !== 'undefined') {
          febs.dom.removeEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
          febs.dom.removeEventListener(target, 'touchend', mobile_onTouchend_picker, true);
          febs.dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
          febs.dom.addEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
          febs.dom.addEventListener(target, 'touchend', mobile_onTouchend_picker, true);
          febs.dom.addEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
        } else {
          febs.dom.removeEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
          febs.dom.removeEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
          febs.dom.removeEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
          febs.dom.addEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
          febs.dom.addEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
          febs.dom.addEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
        }

        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      } else {
        return true;
      }
    }
  }
  function mobile_onTouchmove_picker(event) {
    event = event || window.event;
    var touch;

    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = {
        clientX: event.clientX,
        clientY: event.clientY
      };
    }

    if (touch) {
      var target = event.currentTarget;

      if (!target) {
        return false;
      }

      var tt = $(target).parent('.bp-picker__group').children('.bp-picker__content');

      if (!tt[0]) {
        return false;
      }

      tt = tt[0];
      if (!tt.__picker_start) return;
      var offset1 = parseFloat(touch.clientY - tt.__picker_touch1);
      offset1 = offset1 + (tt.__offset || 0);
      offset1 = offset1.toFixed(1);
      $(tt).css('transform', 'translate3d(0px, ' + offset1 + 'px, 0px)');
    }

    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    return false;
  }
  function mobile_onTouchend_picker(event) {
    event = event || window.event;
    var target = event.currentTarget;

    if (!target) {
      return false;
    }

    var tt = $(target).parent('.bp-picker__group').children('.bp-picker__content');

    if (!tt[0]) {
      return false;
    }

    tt = tt[0];

    if (typeof target.ontouchstart !== 'undefined') {
      febs.dom.removeEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
      febs.dom.removeEventListener(target, 'touchend', mobile_onTouchend_picker, true);
      febs.dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
    } else {
      febs.dom.removeEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
      febs.dom.removeEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
      febs.dom.removeEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
    }

    var touch;

    if (event.touches && event.touches.length > 0 || event.changedTouches && event.changedTouches.length > 0) {
      touch = event.touches[0] || event.changedTouches[0];
    } else {
      touch = {
        clientX: event.clientX,
        clientY: event.clientY
      };
    }

    var ttt = $(tt);
    var offset = picker_getOffset(ttt);
    var oldOffset = tt.__offset;
    var velocity = (touch.clientY - tt.__picker_touch1) / (Date.now() - tt.__picker_start_at || 1) * 1000; // !move.

    if (tt.__picker_touch1 == touch.clientY) {
      var off = -(touch.clientY - febs.dom.getElementOffset(event.currentTarget).top);
      off += event.currentTarget.clientHeight / 2;
      offset += off;
      velocity = 0;
    } // if.


    delete tt.__picker_start;
    delete tt.__picker_start_at;
    delete tt.__picker_touch;
    delete tt.__picker_touch1;
    offset += velocity * 0.1;
    offset = picker_setOffset(ttt, offset);

    if (oldOffset != offset) {
      bee();
      ttt.trigger('change');
    }
  }
  var mobile_onTouchcancel_picker = mobile_onTouchend_picker;
  /**
   * @desc: 设置偏移
   */

  function picker_setOffset(pickerDom, offset) {
    var oo = offset % POS_CELL_HEIGHT;

    if (oo > 0) {
      if (oo >= POS_CELL_HEIGHT / 2) {
        offset -= oo;
        offset += POS_CELL_HEIGHT;
      } else {
        offset -= oo;
      }
    } else {
      if (oo <= -POS_CELL_HEIGHT / 2) {
        offset -= oo;
        offset -= POS_CELL_HEIGHT;
      } else {
        offset -= oo;
      }
    }

    if (offset > POS_CENTER) {
      offset = POS_CENTER;
    } else {
      var nn = -POS_CELL_HEIGHT * pickerDom.children('.bp-picker__item').length + POS_CENTER + POS_CELL_HEIGHT;

      if (offset < nn) {
        offset = nn;
      }
    }

    pickerDom.css('transition', 'all 0.3s').css('transform', 'translate3d(0px, ' + offset + 'px, 0px)');
    return offset;
  } //

  function picker_getOffset(pickerDom) {
    var offset = pickerDom[0].style['transform'];

    if (febs.string.isEmpty(offset)) {
      offset = 0;
    } else {
      offset = offset.split(',');
      offset = offset[1] || '0';
      offset = febs.string.trim(offset);
      offset = febs.string.replace(offset, 'px', '');
      offset = parseFloat(offset);
    }

    return offset;
  }

  var script = {
    components: {
      bpIcon: bpLibs$1.VueObject.bpIcon,
      bpWidget: bpDialog.bpWidget
    },
    props: {
      visible: Boolean,
      mask: {
        "default": true,
        type: Boolean
      },
      maskClose: {
        "default": false,
        type: Boolean
      },
      pageClass: String | Array,
      pageStyle: String | Array | Object,
      // 仅对一维数据源有效.
      multiple: Boolean,
      toolbarPos: {
        type: String,
        validator: function validator(value) {
          return value === 'top' || value === 'bottom';
        }
      },
      forcePhoneStyle: {
        "default": false,
        type: Boolean | String,
        validator: function validator(value) {
          return typeof value === 'boolean' || value === 'true' || value === 'false';
        }
      },
      cancelBtnText: {
        type: String,
        "default": '取消'
      },
      confirmBtnText: {
        type: String,
        "default": '确认'
      },

      /**
       * @desc: 数据源.
       */
      datasource: {
        validator: function validator(value) {
          return !value || _typeof(value) === 'object' || Array.isArray(value);
        }
      },
      value: {
        validator: function validator(value) {
          return !value || typeof value === 'string' || typeof value === 'number' || Array.isArray(value);
        }
      }
    },
    data: function data() {
      return {
        slotReRender: false,
        confirmBtnDisabled: false,
        isMobile: null,
        tabletClass: null,
        visibleReal: false,
        visibleRealByProperty: false,

        /**
         * @desc: 数据源.
         */
        items0Checked: null,
        items0: null,
        items1: null,
        items2: null,
        items3: null,
        groupCount: 1,
        value0: null,
        value1: null,
        value2: null,
        value3: null
      };
    },
    watch: {
      value: function value(v, vOld) {
        var _this = this;

        this.items0CheckedValue = v;

        if (this.noEmitUpdateWatch) {
          this.noEmitUpdateWatch = false;
          return;
        }

        if (v === vOld) return;

        var t = _typeof(v);

        if (t === 'string' || t === 'number') {
          this.value0 = v;

          if (this.multiple && this.groupCount == 1) {
            for (var i = 0; i < this.items0Checked.length; i++) {
              if (this.items0[i].value === v) {
                this.items0Checked[i] = true;
              } else {
                this.items0Checked[i] = false;
              }
            } // by solt.


            if (!this.datasource) {
              var ii = 0;

              for (var _i = 0; _i < this.$slots["default"].length; _i++) {
                var c = this.$slots["default"][_i];
                if (!c.tag) continue;

                if (c.tag.indexOf('bpPickerCell') >= 0) {
                  if (this.items0[ii++].value === v) {
                    c.componentInstance.check = true;
                  } else {
                    c.componentInstance.check = false;
                  }
                }
              }
            } // if.

          } // if.


          this.$nextTick(function () {
            _newArrowCheck(this, _this);

            this.setSelect(0, v, false);
          }.bind(this));
        } else if (Array.isArray(v)) {
          if (isArrayEqual(v, vOld)) {
            return;
          }

          if (this.multiple && this.groupCount == 1) {
            var arr = [];
            arr.length = this.items0Checked.length;

            for (var _i2 = 0; _i2 < arr.length; _i2++) {
              for (var j = 0; j < v.length; j++) {
                if (this.items0[_i2].value === v[j]) {
                  arr[_i2] = true;
                  break;
                }
              }
            }

            this.items0Checked = arr; // by solt.

            if (!this.datasource) {
              this.$nextTick(function () {
                _newArrowCheck(this, _this);

                var ii = 0;

                for (var _i3 = 0; _i3 < this.$slots["default"].length; _i3++) {
                  var _c = this.$slots["default"][_i3];
                  if (!_c.tag) continue;

                  if (_c.tag.indexOf('bpPickerCell') >= 0) {
                    if (arr[ii++]) {
                      _c.componentInstance.check = true;
                    } else {
                      _c.componentInstance.check = false;
                    }
                  }
                }

                this.slotReRender = !this.slotReRender;
              }.bind(this));
            } // if.


            return;
          }

          this.$nextTick(function () {
            _newArrowCheck(this, _this);

            for (var _i4 = 0; _i4 < v.length && _i4 < this.groupCount; _i4++) {
              this['value' + _i4] = v[_i4];
              this.setSelect(_i4, v[_i4], false);
            }
          }.bind(this));
        } else {
          throw new Error('picker value is error');
        }
      },
      visible: function visible(v) {
        if (this.visibleReal != v) {
          this.visibleRealByProperty = true;
          this.visibleReal = v;
        }
      },
      visibleReal: function visibleReal(v, oldVal) {
        var _this2 = this;

        if (v == oldVal) return;
        this.$emit('update:visible', v);

        if (v) {
          var value = this.getValue();

          if (Array.isArray(value)) {
            if (this.multiple && this.groupCount == 1) {
              var arr = [];
              arr.length = this.items0Checked.length;

              for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < value.length; j++) {
                  if (this.items0[i] && this.items0[i].value === value[j]) {
                    arr[i] = true;
                    break;
                  }
                }
              }

              this.items0Checked = arr; // by solt.

              if (!this.datasource) {
                this.$nextTick(function () {
                  _newArrowCheck(this, _this2);

                  var ii = 0;

                  for (var _i5 = 0; _i5 < this.$slots["default"].length; _i5++) {
                    var c = this.$slots["default"][_i5];
                    if (!c.tag) continue;

                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      if (arr[ii++]) {
                        c.componentInstance.check = true;
                      } else {
                        c.componentInstance.check = false;
                      }
                    }
                  }

                  this.slotReRender = !this.slotReRender;
                }.bind(this));
              }
            } else {
              for (var _i6 = 0; _i6 < value.length && _i6 < 4; _i6++) {
                this.setSelect(_i6, value[_i6], false);
              }
            }
          } else {
            this.setSelect(0, value, false);

            if (this.multiple && this.groupCount == 1) {
              var _arr = [];
              _arr.length = this.items0Checked.length;
              this.items0Checked = _arr; // by solt.

              if (!this.datasource) {
                this.$nextTick(function () {
                  _newArrowCheck(this, _this2);

                  for (var _i7 = 0; _i7 < this.$slots["default"].length; _i7++) {
                    var c = this.$slots["default"][_i7];
                    if (!c.tag) continue;

                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      c.componentInstance.check = false;
                    }
                  }

                  this.slotReRender = !this.slotReRender;
                }.bind(this));
              }
            }
          }
        }

        if (!v && !this.visibleRealByProperty) {
          this._onCancel();
        }

        this.visibleRealByProperty = false;
      },
      datasource: function datasource(val, oldVal) {
        var _this3 = this;

        if (val && oldVal) {
          if (isArrayEqualByKey(val, oldVal, ['label', 'value', 'children'])) {
            return;
          }
        }

        var isShow = this.visibleReal;

        if (isShow) {
          this.timer.sleep(300).then(function () {
            _newArrowCheck(this, _this3);

            this._initRealDatasource(val);

            this._refreshDatasource(true);
          }.bind(this));
        } else {
          this._initRealDatasource(val);

          this._refreshDatasource(true);
        }
      }
    },
    created: function created() {
      this.timer = new bpLibs$1.Timer();
    },
    beforeMount: function beforeMount() {
      this.isMobile = febs.utils.browserIsMobile();
      this.items0CheckedValue = this.value;
      var forcePhoneStyle = this.forcePhoneStyle === true || this.forcePhoneStyle === 'true';

      if (!febs.utils.browserIsPhone() && !forcePhoneStyle) {
        this.tabletClass = 'bp-picker__tablet';
      }

      if (!this.datasource) {
        if (!this.$slots["default"]) {
          throw new Error('picker must have datasource');
        }
      }

      this._initRealDatasource(this.datasource);

      this._refreshDatasource(false);

      this.visibleReal = this.visible;
    },
    beforeDestroy: function beforeDestroy() {
      this.hide();
      this.timer.dispose();
      this.timer = null;
    },
    mounted: function mounted() {
      // febs.dom.addEventListener(this.$refs.content0, 'click', this._onClickGroup0Current);
      //  by slot and multiple.
      if (!this.datasource && this.multiple && this.groupCount == 1) {
        var ii = 0;

        for (var i = 0; i < this.$slots["default"].length; i++) {
          var c = this.$slots["default"][i];
          if (!c.tag) continue;

          if (c.tag.indexOf('bpPickerCell') >= 0) {
            c.componentInstance.multiple = true;

            if (Array.isArray(this.value)) {
              if (this.value.indexOf(c.componentOptions.propsData.value) >= 0) {
                c.componentInstance.check = true;
                this.items0Checked[ii] = true;
              }
            } else if (c.componentOptions.propsData.value == this.value) {
              c.componentInstance.check = true;
              this.items0Checked[ii] = true;
            }

            ii++;
          }
        }
      } // if.

    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function show() {
        return this.$refs.widget.show();
      },

      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function hide() {
        return this.$refs.widget.hide();
      },

      /**
       * @desc: 设置指定组的当前选中值.
       * @param groupIndex: 组索引.
       * @param value: 匹配值.
       * @param trigger: 是否触发change事件.
       */
      setSelect: function setSelect(groupIndex, value) {
        var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.confirmBtnDisabled = false;
        var data = this['items' + groupIndex];

        if (data) {
          var ee = this.$refs.agentMain;

          if (ee) {
            ee = $(ee);
            ee = $(ee.children(".bp-picker__group")[groupIndex]);
            ee = $(ee.children('.bp-picker__content')[0]); //  let ee = this.$refs['items'+groupIndex];

            if (ee) {
              ee = $(ee);
              var offset = picker_getOffset(ee);
              var i = 0;

              for (; i < data.length; i++) {
                if (data[i].value == value || !value) {
                  if (!!data[i].disabled && (!this.multiple || this.groupCount != 1)) {
                    this.confirmBtnDisabled = true;
                  }

                  break;
                }
              } // for.


              if (i >= data.length) i = data.length - 1;

              if (i < data.length) {
                i = -i * POS_CELL_HEIGHT + POS_CENTER;

                if (i != offset) {
                  picker_setOffset(ee, i);
                  i = picker_getOffset(ee);

                  if (offset != i) {
                    if (this.realDatasource) {
                      this.realDatasource.picker_changed(groupIndex, this);
                    }
                  }

                  if (trigger) {
                    this._onChange();
                  }
                }
              }
            } // if.

          }
        } // if.

      },
      _getSelectIndex: function _getSelectIndex() {
        var groupIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var ee = this.$refs.agentMain;

        if (ee) {
          ee = $(ee);
          ee = $(ee.children(".bp-picker__group")[groupIndex]);
          ee = $(ee.children('.bp-picker__content')[0]); // let ee = this.$refs['items'+i];

          if (ee) {
            ee = $(ee);
            var offset = picker_getOffset(ee);
            offset -= POS_CENTER;
            offset = parseInt(-offset / POS_CELL_HEIGHT);
            return offset;
          } // if.

        }

        return 0;
      },

      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect: function getSelect() {
        var groupIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var data = this['items' + groupIndex];

        if (data) {
          var index = this._getSelectIndex(groupIndex);

          if (data[index]) {
            return febs.utils.mergeMap(data[index]);
          }

          return data[0] ? febs.utils.mergeMap(data[0]) : {};
        } // if.


        return {};
      },
      getValue: function getValue() {
        var v;

        if (this.groupCount == 1) {
          if (this.multiple && this.groupCount == 1) {
            if (!this.items0CheckedValue) {
              return null;
            }

            return Array.isArray(this.items0CheckedValue) ? this.items0CheckedValue : [this.items0CheckedValue];
          } else {
            v = this.value0;
          }
        } else if (this.groupCount == 2) {
          v = [this.value0, this.value1];
        } else if (this.groupCount == 3) {
          v = [this.value0, this.value1, this.value2];
        } else {
          v = [this.value0, this.value1, this.value2, this.value3];
        }

        return v;
      },
      _onCancel: function _onCancel() {
        this.$emit('cancel');
      },
      _onChange: function _onChange() {
        var v;

        if (this.groupCount == 1) {
          var c0 = this.getSelect(0);
          v = c0.value;

          if (this.multiple) {
            this.confirmBtnDisabled = false;
          } else {
            this.confirmBtnDisabled = !!c0.disabled;
          }
        } else if (this.groupCount == 2) {
          var _c2 = this.getSelect(0);

          var c1 = this.getSelect(1);
          v = [_c2.value, c1.value];
          this.confirmBtnDisabled = !!_c2.disabled || !!c1.disabled;
        } else if (this.groupCount == 3) {
          var _c3 = this.getSelect(0);

          var _c4 = this.getSelect(1);

          var c2 = this.getSelect(2);
          v = [_c3.value, _c4.value, c2.value];
          this.confirmBtnDisabled = !!_c3.disabled || !!_c4.disabled || !!c2.disabled;
        } else {
          var _c5 = this.getSelect(0);

          var _c6 = this.getSelect(1);

          var _c7 = this.getSelect(2);

          var c3 = this.getSelect(3);
          v = [_c5.value, _c6.value, _c7.value, c3.value];
          this.confirmBtnDisabled = !!_c5.disabled || !!_c6.disabled || !!_c7.disabled || !!c3.disabled;
        }

        this.$emit('change', v);
      },
      _onConfirm: function _onConfirm() {
        var v;

        if (this.groupCount == 1) {
          if (this.multiple && this.groupCount == 1) {
            v = [];

            for (var i = 0; i < this.items0Checked.length; i++) {
              if (this.items0Checked[i]) {
                v.push(this.items0[i].value);
              }
            }

            this.items0CheckedValue = v;
          } else {
            var item0 = this.getSelect(0);

            if (!!item0.disabled) {
              return;
            }

            this.value0 = item0.value;
            v = this.value0;
          }
        } else if (this.groupCount == 2) {
          var _item = this.getSelect(0);

          var item1 = this.getSelect(1);

          if (!!_item.disabled || !!item1.disabled) {
            return;
          }

          this.value0 = _item.value;
          this.value1 = item1.value;
          v = [this.value0, this.value1];
        } else if (this.groupCount == 3) {
          var _item2 = this.getSelect(0);

          var _item3 = this.getSelect(1);

          var item2 = this.getSelect(2);

          if (!!_item2.disabled || !!_item3.disabled || !!item2.disabled) {
            return;
          }

          this.value0 = _item2.value;
          this.value1 = _item3.value;
          this.value2 = item2.value;
          v = [this.value0, this.value1, this.value2];
        } else {
          var _item4 = this.getSelect(0);

          var _item5 = this.getSelect(1);

          var _item6 = this.getSelect(2);

          var item3 = this.getSelect(3);

          if (!!_item4.disabled || !!_item5.disabled || !!_item6.disabled || !!item3.disabled) {
            return;
          }

          this.value0 = _item4.value;
          this.value1 = _item5.value;
          this.value2 = _item6.value;
          this.value3 = item3.value;
          v = [this.value0, this.value1, this.value2, this.value3];
        }

        this.noEmitUpdateWatch = true;
        this.$emit('input', v);
        this.$emit('confirm', this);
      },
      _onClickGroup0Start: function _onClickGroup0Start() {
        if (this.multiple && this.groupCount == 1) {
          this.preIndexClickGroup0 = this._getSelectIndex(0);
        }
      },
      _onClickGroup0End: function _onClickGroup0End() {
        var _this4 = this;

        if (this.multiple && this.groupCount == 1) {
          bpLibs$1.dom.probeDom(100, function () {
            _newArrowCheck(this, _this4);

            return getComputedStyle(this.$refs.content1).transition.indexOf('none') != 0;
          }.bind(this), function () {
            _newArrowCheck(this, _this4);

            var curIndexClickGroup0 = this._getSelectIndex(0);

            if (curIndexClickGroup0 == this.preIndexClickGroup0) {
              if (!!!this.items0[curIndexClickGroup0].disabled) {
                var check = !!!this.items0Checked[curIndexClickGroup0];
                this.$set(this.items0Checked, curIndexClickGroup0, check);

                if (!this.datasource) {
                  var ii = 0;

                  for (var i = 0; i < this.$slots["default"].length; i++) {
                    var c = this.$slots["default"][i];
                    if (!c.tag) continue;

                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      if (ii == curIndexClickGroup0) {
                        c.componentInstance.check = check;
                        this.slotReRender = !this.slotReRender;
                        break;
                      }

                      ii++;
                    }
                  }
                }
              }
            }
          }.bind(this));
        }
      },
      _bindEvent: function _bindEvent() {
        var _this5 = this;

        var elHd = this.$refs.agentToolbar;
        var elMain = $(this.$refs.agentMain);
        var elBd = elMain.children('.bp-picker__group').children('.bp-picker__mask');
        var elBc = elMain.children('.bp-picker__group').children('.bp-picker__content'); // let elIndic = elBd.next('.bp-picker__indicator');

        if (elBc[0]) {
          for (var i = 0; i < elBc.length; i++) {
            $(elBc[i]).off('change').on('change', function (event) {
              _newArrowCheck(this, _this5);

              var group = parseInt($(event.currentTarget).attr('data-group'));

              if (this.realDatasource) {
                this.realDatasource.picker_changed(group, this);
              }

              this._onChange();
            }.bind(this));
          }
        } // 内容滑动事件处理.


        if (elBd[0]) {
          var namestart, namemove, nameend, namecancel;

          if (typeof elBd[0].ontouchstart !== 'undefined') {
            namestart = 'touchstart';
            namemove = 'touchmove';
            nameend = 'touchend';
            namecancel = 'touchcancel';
          } else {
            namestart = 'mousedown';
            namemove = 'mousemove';
            nameend = 'mouseup';
            namecancel = 'mouseout';
          }

          for (var _i8 = 0; _i8 < elBd.length; _i8++) {
            febs.dom.removeEventListener(elBd[_i8], namestart, this._onClickGroup0Start, true);
            febs.dom.removeEventListener(elBd[_i8], nameend, this._onClickGroup0End, true);
            febs.dom.removeEventListener(elBd[_i8], namestart, mobile_onTouchstart_picker, true);
            febs.dom.removeEventListener(elBd[_i8], namemove, mobile_onTouchmove_picker, true);
            febs.dom.removeEventListener(elBd[_i8], nameend, mobile_onTouchend_picker, true);
            febs.dom.removeEventListener(elBd[_i8], namecancel, mobile_onTouchcancel_picker, true);
            febs.dom.addEventListener(elBd[_i8], namestart, mobile_onTouchstart_picker, true); // elBd[i].addEventListener(namemove, mobile_onTouchmove_picker, true);
            // elBd[i].addEventListener(nameend, mobile_onTouchend_picker, true);
            // elBd[i].addEventListener(namecancel, mobile_onTouchcancel_picker, true);

            if (_i8 == 0 && this.multiple && this.groupCount == 1) {
              febs.dom.addEventListener(elBd[_i8], namestart, this._onClickGroup0Start, true);
              febs.dom.addEventListener(elBd[_i8], nameend, this._onClickGroup0End, true);
            }

            if (!this.isMobile) {
              var agent = navigator.userAgent;

              if (/.*Firefox.*/.test(agent)) {
                febs.dom.removeEventListener(elBd[_i8], 'DOMMouseScroll', mobile_onWheel_picker, true);
                febs.dom.addEventListener(elBd[_i8], 'DOMMouseScroll', mobile_onWheel_picker, true);
              } else {
                febs.dom.removeEventListener(elBd[_i8], 'mousewheel', mobile_onWheel_picker, true);
                febs.dom.addEventListener(elBd[_i8], 'mousewheel', mobile_onWheel_picker, true);
              }
            }
          }
        } // if.

      },

      /**
      * @desc: 重新获取指定组的数据源.
      * @return Promise. - resolve(value)
      */
      refreshDatasource: function refreshDatasource(groupIndex) {
        var _this6 = this;

        var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        // 使用solt的单数据源.
        if (!this.realDatasource) {
          if (!this.$slots["default"]) {
            throw new Error('picker missing datasource or children cells');
          }

          return new Promise(function (resolve, reject) {
            var _this7 = this;

            _newArrowCheck(this, _this6);

            var value = this.value;
            var datasource = [];

            try {
              for (var i = 0; i < this.$slots["default"].length; i++) {
                var c = this.$slots["default"][i];
                if (!c.tag) continue;

                if (c.tag.indexOf('bpPickerCell') >= 0) {
                  datasource.push({
                    value: c.componentOptions.propsData.value,
                    disabled: c.componentOptions.propsData.disabled
                  });
                } else {
                  throw new Error('picker children must be bp-picker-cell');
                }
              }

              if (this.groupCount == 1 && this.multiple && groupIndex == 0) {
                this.items0Checked = this.items0Checked || [];
                this.items0Checked.length = datasource.length;
              }

              this['items' + 0] = datasource;
              this.$nextTick(function () {
                var _this8 = this;

                _newArrowCheck(this, _this7);

                setTimeout(function () {
                  _newArrowCheck(this, _this8);

                  this.setSelect(groupIndex, value, trigger);
                  resolve(value);

                  this._bindEvent();

                  if (trigger && needEvent) {// this._bindEvent($(`.bp-picker__agent[data-picker-agent="${this.uuid}"]`));
                  }
                }.bind(this), 0);
              }.bind(this));
            } catch (e) {
              reject(e);
            }
          }.bind(this));
        } // 使用datasource的数据源.


        return new Promise(function (resolve, reject) {
          var _this9 = this;

          _newArrowCheck(this, _this6);

          var needEvent = false;
          var value;

          try {
            this.realDatasource.picker_datasource(groupIndex, this, function (ds) {
              var _this10 = this;

              _newArrowCheck(this, _this9);

              try {
                value = ds.value;

                if (!Array.isArray(ds.datasource)) {
                  throw new Error('picker datasource must is Array');
                }

                if (!(!!this['items' + groupIndex] && !!ds.datasource)) needEvent = true;

                if (this.groupCount == 1 && this.multiple && groupIndex == 0) {
                  this.items0Checked = this.items0Checked || [];
                  this.items0Checked.length = ds.datasource.length;
                }

                this['items' + groupIndex] = ds.datasource;
              } catch (e) {
                reject(e);
              }

              this.$nextTick(function () {
                var _this11 = this;

                _newArrowCheck(this, _this10);

                setTimeout(function () {
                  _newArrowCheck(this, _this11);

                  this.setSelect(groupIndex, value, trigger);
                  resolve(value);

                  this._bindEvent();

                  if (trigger && needEvent) {// this._bindEvent($(`.bp-picker__agent[data-picker-agent="${this.uuid}"]`));
                  }
                }.bind(this), 0);
              }.bind(this));
            }.bind(this));
          } catch (e) {
            reject(e);
          }
        }.bind(this));
      },

      /**
       * @desc: 重新获取整个数据.
       */
      _refreshDatasource: function _refreshDatasource() {
        var _this12 = this;

        var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.realDatasource) {
          this.realDatasource.picker_datasource_groups(function (groupCount) {
            var _this13 = this;

            _newArrowCheck(this, _this12);

            if (groupCount <= 0 || groupCount > 4) {
              throw new Error('picker group count must in [1,4]');
            }

            this.groupCount = groupCount;
            var p = new Promise(function (resolve) {
              _newArrowCheck(this, _this13);

              return resolve();
            }.bind(this));

            for (var i = 0; i < groupCount; i++) {
              p = p.then(febs.utils.sleep(1).then(this.refreshDatasource(i, trigger)));
            }

            this.$nextTick(function () {
              var _this14 = this;

              _newArrowCheck(this, _this13);

              p.then(function () {
                _newArrowCheck(this, _this14);

                this._bindEvent();
              }.bind(this));
            }.bind(this));
          }.bind(this));
        } else {
          this.groupCount = 1;
          var p = febs.utils.sleep(1).then(this.refreshDatasource(0, trigger));
          this.$nextTick(function () {
            var _this15 = this;

            _newArrowCheck(this, _this12);

            p.then(function () {
              _newArrowCheck(this, _this15);

              this._bindEvent();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * @desc: 初始化真实datasource.
       */
      _initRealDatasource: function _initRealDatasource(datasource) {
        if (!datasource) {
          this.realDatasource = null;
          return;
        }

        if (Array.isArray(datasource)) {
          // 判断是几列数据.
          var colNum = 1;

          for (var i = 0; i < datasource.length; i++) {
            if (datasource[i].children && Array.isArray(datasource[i].children)) {
              colNum = 2;
              var j = 0;

              for (j = 0; j < datasource[i].children.length; j++) {
                if (datasource[i].children[j].children && Array.isArray(datasource[i].children[j].children)) {
                  colNum = 3;
                  break;
                }
              }

              if (j < datasource[i].children.length) {
                break;
              }
            }
          }

          var DatasourceClass;
          if (colNum == 1) DatasourceClass = _default;else if (colNum == 2) DatasourceClass = _default$1;else DatasourceClass = _default$2;
          this.realDatasource = new DatasourceClass(datasource);
        } else {
          this.realDatasource = datasource;
        }

        if (typeof this.realDatasource.picker_datasource_groups !== 'function' || typeof this.realDatasource.picker_datasource !== 'function' || typeof this.realDatasource.picker_changed !== 'function') {
          throw new Error('picker datasource class must have `picker_datasource_groups`, `picker_datasource`, `picker_changed` function');
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

  var SPECIES$4 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var SPECIES$5 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
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

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED$2 }, {
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

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("bp-widget", {
      ref: "widget",
      staticClass: "bp-picker",
      "class": _vm.tabletClass,
      attrs: {
        visible: _vm.visibleReal,
        maskClose: _vm.maskClose,
        mask: _vm.mask,
        preventEvent: true,
        appendToBody: true,
        vibrateWhenShow: true
      },
      on: {
        "update:visible": function updateVisible($event) {
          _vm.visibleReal = $event;
        }
      }
    }, [_c("div", {
      staticClass: "bp-widget__contentWrap",
      "class": _vm.pageClass,
      style: _vm.pageStyle,
      on: {
        click: function click($event) {
          $event.stopPropagation();
        }
      }
    }, [_vm.$slots["toolbar"] && (_vm.toolbarPos ? _vm.toolbarPos == "top" : !_vm.tabletClass) ? _c("div", {
      staticClass: "bp-picker__toolbar bp-ellipsis"
    }, [_vm._t("toolbar")], 2) : (_vm.toolbarPos ? _vm.toolbarPos == "top" : !_vm.tabletClass) ? _c("div", {
      ref: "agentToolbar",
      staticClass: "bp-picker__toolbar bp-ellipsis"
    }, [_c("button", {
      staticClass: "bp-picker__cancelBtn",
      on: {
        click: function click($event) {
          _vm.visibleReal = false;
        }
      }
    }, [_vm._v(_vm._s(_vm.cancelBtnText))]), _vm._v(" "), _c("button", {
      attrs: {
        disabled: _vm.confirmBtnDisabled
      },
      on: {
        click: _vm._onConfirm
      }
    }, [_vm._v(_vm._s(_vm.confirmBtnText))])]) : _vm._e(), _vm._v(" "), _c("div", {
      ref: "agentMain",
      staticClass: "bp-picker__main"
    }, [_c("div", {
      staticClass: "bp-picker__group",
      style: {
        display: _vm.groupCount > 0 ? "inherit" : "none"
      },
      attrs: {
        "data-picker": "0"
      }
    }, [_c("div", {
      staticClass: "bp-picker__indicator"
    }), _vm._v(" "), _c("div", {
      ref: "content0",
      staticClass: "bp-picker__content",
      style: "transform: translate3d(0px, 102px, 0px); transition: all 0.3s;",
      attrs: {
        "data-group": "0"
      }
    }, [_vm.$slots["default"] ? [_vm.slotReRender || !_vm.slotReRender ? _vm._t("default") : _vm._e()] : _vm._l(_vm.items0, function (item, index) {
      return _c("div", {
        key: "_1" + index,
        "class": "bp-picker__item" + (item.disabled ? " bp-picker__item-disabled" : ""),
        attrs: {
          "data-value": item.value
        }
      }, [_vm._v(_vm._s(item.label) + "\n              "), _vm.multiple && _vm.items0Checked ? [_vm.items0Checked[index] ? _c("bp-icon", {
        staticClass: "bp-picker__item_check",
        attrs: {
          name: "bp-picker_check"
        }
      }) : _c("i", {
        staticClass: "bp-picker__item_uncheck"
      })] : _vm._e()], 2);
    })], 2), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__mask",
      style: _vm.multiple && _vm.groupCount == 1 ? "cursor:pointer" : null
    })]), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__group",
      style: {
        display: _vm.groupCount > 1 ? "inherit" : "none"
      },
      attrs: {
        "data-picker": "1"
      }
    }, [_c("div", {
      staticClass: "bp-picker__indicator"
    }), _vm._v(" "), _c("div", {
      ref: "content1",
      staticClass: "bp-picker__content",
      style: "transform: translate3d(0px, 102px, 0px); transition: all 0.3s;",
      attrs: {
        "data-group": "1"
      }
    }, _vm._l(_vm.items1, function (item, index) {
      return _c("div", {
        key: "_2" + index,
        "class": "bp-picker__item" + (item.disabled ? " bp-picker__item-disabled" : ""),
        attrs: {
          "data-value": item.value
        }
      }, [_vm._v(_vm._s(item.label))]);
    }), 0), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__mask"
    })]), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__group",
      style: {
        display: _vm.groupCount > 2 ? "inherit" : "none"
      },
      attrs: {
        "data-picker": "2"
      }
    }, [_c("div", {
      staticClass: "bp-picker__indicator"
    }), _vm._v(" "), _c("div", {
      ref: "content2",
      staticClass: "bp-picker__content",
      style: "transform: translate3d(0px, 102px, 0px); transition: all 0.3s;",
      attrs: {
        "data-group": "2"
      }
    }, _vm._l(_vm.items2, function (item, index) {
      return _c("div", {
        key: "_3" + index,
        "class": "bp-picker__item" + (item.disabled ? " bp-picker__item-disabled" : ""),
        attrs: {
          "data-value": item.value
        }
      }, [_vm._v(_vm._s(item.label))]);
    }), 0), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__mask"
    })]), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__group",
      style: {
        display: _vm.groupCount > 3 ? "inherit" : "none"
      },
      attrs: {
        "data-picker": "3"
      }
    }, [_c("div", {
      staticClass: "bp-picker__indicator"
    }), _vm._v(" "), _c("div", {
      ref: "content3",
      staticClass: "bp-picker__content",
      style: "transform: translate3d(0px, 102px, 0px); transition: all 0.3s;",
      attrs: {
        "data-group": "3"
      }
    }, _vm._l(_vm.items3, function (item, index) {
      return _c("div", {
        key: "_4" + index,
        "class": "bp-picker__item" + (item.disabled ? " bp-picker__item-disabled" : ""),
        attrs: {
          "data-value": item.value
        }
      }, [_vm._v(_vm._s(item.label))]);
    }), 0), _vm._v(" "), _c("div", {
      staticClass: "bp-picker__mask"
    })])]), _vm._v(" "), _vm.$slots["toolbar"] && (_vm.toolbarPos ? _vm.toolbarPos == "bottom" : _vm.tabletClass) ? _c("div", {
      staticClass: "bp-picker__toolbar bp-ellipsis"
    }, [_vm._t("toolbar")], 2) : (_vm.toolbarPos ? _vm.toolbarPos == "bottom" : _vm.tabletClass) ? _c("div", {
      ref: "agentToolbar",
      staticClass: "bp-picker__toolbar bp-ellipsis"
    }, [_c("button", {
      staticClass: "bp-picker__cancelBtn",
      on: {
        click: function click($event) {
          _vm.visibleReal = false;
        }
      }
    }, [_vm._v(_vm._s(_vm.cancelBtnText))]), _vm._v(" "), _c("button", {
      attrs: {
        disabled: _vm.confirmBtnDisabled
      },
      on: {
        click: _vm._onConfirm
      }
    }, [_vm._v(_vm._s(_vm.confirmBtnText))])]) : _vm._e()])]);
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

  var script$1 = {
    name: 'bpPickerCell',
    components: {
      bpIcon: bpLibs$1.VueObject.bpIcon
    },
    props: {
      value: {
        validator: function validator(value) {
          var t = _typeof(value);

          return t === 'string' || t === 'number';
        },
        required: true
      },
      disabled: {
        validator: function validator(value) {
          return !value || value === "disabled" || value === true;
        }
      }
    },
    data: function data() {
      return {
        // 仅对一维数据源有效.
        multiple: false,
        // 仅对一维数据源有效.
        check: false
      };
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "bp-picker__item",
      "class": {
        "bp-picker__item-disabled": _vm.disabled
      },
      attrs: {
        "data-value": _vm.value
      }
    }, [_vm._t("default"), _vm._v(" "), _vm.multiple ? [_vm.check ? _c("bp-icon", {
      staticClass: "bp-picker__item_check",
      attrs: {
        name: "bp-picker_check"
      }
    }) : _c("i", {
      staticClass: "bp-picker__item_uncheck"
    })] : _vm._e()], 2);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  var floor$3 = Math.floor;

  // `Number.isInteger` method implementation
  // https://tc39.es/ecma262/#sec-number.isinteger
  var isInteger = function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor$3(it) === it;
  };

  // `Number.isInteger` method
  // https://tc39.es/ecma262/#sec-number.isinteger
  _export({ target: 'Number', stat: true }, {
    isInteger: isInteger
  });

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

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
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
        defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

  function getCompareMonth(min, max, year, month) {
    var mi = min.year * 12 + min.month;
    var mx = max.year * 12 + max.month;
    var n = year * 12 + month;

    if (n < mi) {
      return min.month;
    } else if (n > mx) {
      return max.month;
    } else {
      return month;
    }
  }
  /**
   * 获得最接近的天
   */


  function getCompareDate(min, max, year, month, date) {
    var mi = min.year * 12 * 31 + min.month * 31 + min.date;
    var mx = max.year * 12 * 31 + max.month * 31 + max.date;
    var n = year * 12 * 31 + month * 31 + date;

    if (n < mi) {
      return min.date;
    } else if (n > mx) {
      return max.date;
    } else {
      return date;
    }
  }
  /**
  * @desc: 获得年数据源. 参数不指定默认当前时间前后80年.
  * @param from: 从哪一年开始.
  * @param to:   到哪一年结束.
  * @return: picker数据源.
  *         [{label:'1984', value:1984}, ...]
  */


  function ds_years(from, to, yearText) {
    if (from > to) {
      var x = from;
      from = to;
      to = x;
    }

    var ds = [];

    for (var i = from; i <= to; i++) {
      ds.push({
        label: i + (yearText ? yearText : ''),
        value: i
      });
    }

    return ds;
  }
  /**
  * @desc: 获得月数据源.
  * @return: picker数据源.
  *         [{label:'1月', value:0}, {label:'2月', value:1}, ...]
  */


  function ds_months(year, min, max, monthText) {
    var f1;
    var f2;

    if (year > min.year) {
      f1 = 0;
    } else {
      f1 = min.month;
    }

    if (year < max.year) {
      f2 = 12;
    } else {
      f2 = max.month + 1;
    }

    var ds = [];

    for (var i = f1; i < f2; i++) {
      ds.push({
        label: i + 1 + (monthText ? monthText : ''),
        value: i
      });
    }

    return ds;
  }
  /**
  * @desc: 获得日数据源.
  * @param year: 指定的年.
  * @param month: 指定的月份. (从0开始)
  * @return: picker数据源.
  *         [{label:'1日', value:1}, {label:'2日', value:2}, ...]
  */


  function ds_days(year, month, min, max, dateText) {
    var f1;
    var f2;

    if (year > min.year) {
      f1 = 1;
    } else if (month > min.month) {
      f1 = 1;
    } else {
      f1 = min.date;
    }

    if (year < max.year) {
      f2 = 31;
    } else if (month < max.month) {
      f2 = 31;
    } else {
      f2 = max.date;
    }

    var date = new Date(year, month + 1, 1, 0, 0, 0, 0);
    date.setTime(date.getTime() - 1000 * 60 * 60 * 23);
    var maxDate = date.getDate();
    f2 = Math.min(f2, maxDate);
    var ds = [];

    for (var i = f1; i <= f2; i++) {
      ds.push({
        label: i + (dateText ? dateText : ''),
        value: i
      });
    }

    return ds;
  }

  var _default$3 = /*#__PURE__*/function () {
    /**
    * @param ds: [{label:'', value:0, children:[]}, ],  // 数据源.
    */
    function _default(cfg) {
      _classCallCheck(this, _default);

      cfg = cfg || {};
      this.showMonth = cfg.hasOwnProperty('showMonth') ? cfg.showMonth : true;
      this.showDate = cfg.hasOwnProperty('showDate') ? cfg.showDate : true;
      this.yearText = cfg.yearText || '年';
      this.monthText = cfg.monthText || '月';
      this.dateText = cfg.dateText || '日';
      this.min = cfg.min || {
        year: null,
        month: 0,
        date: 1
      };
      this.max = cfg.max || {
        year: null,
        month: 11,
        date: 31
      };
      this.min.month = Number.isInteger(this.min.month) ? this.min.month : 0;
      this.min.date = Number.isInteger(this.min.date) ? this.min.date : 1;
      this.max.month = Number.isInteger(this.max.month) ? this.max.month : 11;
      this.max.date = Number.isInteger(this.max.date) ? this.max.date : 31;
      var now = new Date().getFullYear();

      if (!this.min.year && !this.max.year) {
        this.min.year = now - 80;
        this.max.year = now + 80;
      } else {
        if (!this.min.year) {
          this.min.year = now - 80;
        }

        if (!this.max.year) {
          this.max.year = now + 80;
        }

        if (this.min.year > this.max.year) {
          var t = this.min.year;
          this.min.year = this.max.year;
          this.max.year = t;
        }
      }
    }
    /**
    * @desc: 返回数据源组数(最多4个)
    */


    _createClass(_default, [{
      key: "picker_datasource_groups",
      value: function picker_datasource_groups(callback) {
        if (this.showMonth) {
          callback(this.showDate ? 3 : 2);
        } else {
          callback(1);
        }
      }
      /**
      * @desc: 返回指定组的数据源
      * @return: 
      *       {
                datasource: [{label:'', value:0}, ],  // 数据源.
                value:      0,  // 选择的值.
              }
      */

    }, {
      key: "picker_datasource",
      value: function picker_datasource(groupIndex, picker, callback) {
        if (groupIndex == 0) {
          var value0 = picker.getSelect(0).value;

          if (value0 < this.min.year || value0 > this.max.year) {
            var now = new Date();
            value0 = now.getFullYear();
            value0 = Math.max(Math.min(value0, this.max.year), this.min.year);
          }

          callback({
            datasource: ds_years(this.min.year, this.max.year, this.yearText),
            value: value0
          });
          return;
        } else if (groupIndex == 1) {
          var _value = picker.getSelect(0).value;
          var value1 = picker.getSelect(1).value;
          var m = value1;

          if (m < 0) {
            m = new Date().getMonth();
          }

          m = getCompareMonth(this.min, this.max, _value, m);
          callback({
            datasource: ds_months(_value, this.min, this.max, this.monthText),
            value: m
          });
          return;
        } else if (groupIndex == 2) {
          var _value2 = picker.getSelect(0).value;
          var _value3 = picker.getSelect(1).value;
          var value2 = picker.getSelect(2).value;
          var _m = value2;

          if (_m < 0) {
            _m = new Date().getDate();
          }

          _m = getCompareDate(this.min, this.max, _value2, _value3, _m);
          var ds = ds_days(_value2, _value3, this.min, this.max, this.dateText);
          callback({
            datasource: ds,
            value: _m
          });
          return;
        }
      }
      /**
      * @desc: 当前选中的值改变后.
      */

    }, {
      key: "picker_changed",
      value: function picker_changed(groupIndex, picker) {
        var _this = this;

        if (groupIndex == 0) {
          picker.refreshDatasource(1).then(function (value) {
            var _this2 = this;

            _newArrowCheck(this, _this);

            picker.refreshDatasource(2).then(function (value) {
              _newArrowCheck(this, _this2);
            }.bind(this));
          }.bind(this));
        } else if (groupIndex == 1) {
          picker.refreshDatasource(2).then(function (value) {
            _newArrowCheck(this, _this);
          }.bind(this));
        }
      }
    }]);

    return _default;
  }();

  function getCompareMinute(min, max, hour, minute) {
    var mi = min.hour * 60 + min.minute;
    var mx = max.hour * 60 + max.minute;
    var n = hour * 60 + minute;

    if (n < mi) {
      return min.minute;
    } else if (n > mx) {
      return max.minute;
    } else {
      return minute;
    }
  }
  /**
   * 获得最接近的秒
   */


  function getCompareSecond(min, max, hour, minute, second) {
    var mi = min.hour * 60 * 60 + min.minute * 60 + second;
    var mx = max.hour * 60 * 60 + max.minute * 60 + second;
    var n = hour * 60 * 60 + minute * 60 + second;

    if (n < mi) {
      return min.second;
    } else if (n > mx) {
      return max.second;
    } else {
      return second;
    }
  }
  /**
  * @return: picker数据源.
  *         [{label:'00', value:0}, ...]
  */


  function ds_hours(hourText, min, max) {
    var ds = [];
    var f = Math.max(min.hour, 0);
    var t = Math.min(max.hour, 23);
    var f1 = Math.min(f, t);
    var f2 = Math.max(f, t) + 1;

    for (var i = f1; i < f2; i++) {
      ds.push({
        label: (i < 10 ? '0' + i : i) + (hourText ? ' ' + hourText : ''),
        value: i
      });
    }

    return ds;
  }
  /**
  * @desc: .
  * @return: picker数据源.
  *         [{label:'00', value:0}, {label:'01', value:1}, ...]
  */


  function ds_mins(minuteText, min, max, hour) {
    var ds = [];
    var f1;
    var f2;

    if (hour > min.hour) {
      f1 = 0;
    } else {
      f1 = min.minute;
    }

    if (hour < max.hour) {
      f2 = 60;
    } else {
      f2 = max.minute + 1;
    }

    for (var i = f1; i < f2; i++) {
      ds.push({
        label: (i < 10 ? '0' + i : i) + (minuteText ? ' ' + minuteText : ''),
        value: i
      });
    }

    return ds;
  }
  /**
  * @desc: .
  * @return: picker数据源.
  *         [{label:'00', value:0}, {label:'01', value:1}, ...]
  */


  function ds_sec(secondText, min, max, hour, minute) {
    var ds = [];
    var f1;
    var f2;

    if (hour > min.hour) {
      f1 = 0;
    } else if (minute > min.minute) {
      f1 = 0;
    } else {
      f1 = min.second;
    }

    if (hour < max.hour) {
      f2 = 60;
    } else if (minute < max.minute) {
      f2 = 60;
    } else {
      f2 = max.second + 1;
    }

    for (var i = f1; i < f2; i++) {
      ds.push({
        label: (i < 10 ? '0' + i : i) + (secondText ? ' ' + secondText : ''),
        value: i
      });
    }

    return ds;
  }

  var _default$4 = /*#__PURE__*/function () {
    function _default(cfg) {
      _classCallCheck(this, _default);

      cfg = cfg || {};
      this.showSecond = cfg.hasOwnProperty('showSecond') ? cfg.showSecond : true;
      this.showMinute = cfg.hasOwnProperty('showMinute') ? cfg.showMinute : true;
      this.hourText = cfg.hourText || '时';
      this.minuteText = cfg.minuteText || '分';
      this.secondText = cfg.secondText || '秒';
      this.min = cfg.min || {
        hour: 0,
        minute: 0,
        second: 0
      };
      this.max = cfg.max || {
        hour: 23,
        minute: 59,
        second: 59
      };
      this.min.hour = Number.isInteger(this.min.hour) ? this.min.hour : 0;
      this.min.minute = Number.isInteger(this.min.minute) ? this.min.minute : 0;
      this.min.second = Number.isInteger(this.min.second) ? this.min.second : 0;
      this.max.hour = Number.isInteger(this.max.hour) ? this.max.hour : 23;
      this.max.minute = Number.isInteger(this.max.minute) ? this.max.minute : 59;
      this.max.second = Number.isInteger(this.max.second) ? this.max.second : 59;

      if (this.max.hour * 60 * 60 + this.max.minute * 60 + this.max.second < this.min.hour * 60 * 60 + this.min.minute * 60 + this.min.second) {
        var t = this.max;
        this.max = this.min;
        this.min = t;
      }
    }
    /**
    * @desc: 返回数据源组数(最多4个)
    */


    _createClass(_default, [{
      key: "picker_datasource_groups",
      value: function picker_datasource_groups(callback) {
        if (this.showMinute) {
          callback(this.showSecond ? 3 : 2);
        } else {
          callback(1);
        }
      }
      /**
      * @desc: 返回指定组的数据源
      * @return: 
      *       {
                datasource: [{label:'', value:0}, ],  // 数据源.
                value:      0,  // 选择的值.
              }
      */

    }, {
      key: "picker_datasource",
      value: function picker_datasource(groupIndex, picker, callback) {
        if (groupIndex == 0) {
          var value0 = picker.getSelect(0).value;

          if (value0 < this.min.hour || value0 > this.max.hour) {
            var now = new Date();
            value0 = now.getHours();
            value0 = Math.max(Math.min(value0, this.max.hour), this.min.hour);
          }

          callback({
            datasource: ds_hours(this.hourText, this.min, this.max),
            value: value0
          });
        } else if (groupIndex == 1) {
          var _value = picker.getSelect(0).value;
          var value1 = picker.getSelect(1).value;
          var m = value1;

          if (m < 0) {
            m = new Date().getMinutes();
          }

          m = getCompareMinute(this.min, this.max, _value, m);
          callback({
            datasource: ds_mins(this.minuteText, this.min, this.max, _value),
            value: m
          });
        } else if (groupIndex == 2) {
          var _value2 = picker.getSelect(0).value;
          var _value3 = picker.getSelect(1).value;
          var value2 = picker.getSelect(2).value;
          var _m = value2;

          if (_m < 0) {
            _m = new Date().getSeconds();
          }

          _m = getCompareSecond(this.min, this.max, _value2, _value3, _m);
          callback({
            datasource: ds_sec(this.secondText, this.min, this.max, _value2, _value3),
            value: _m
          });
        }
      }
      /**
      * @desc: 当前选中的值改变后.
      */

    }, {
      key: "picker_changed",
      value: function picker_changed(groupIndex, picker) {
        var _this = this;

        if (groupIndex == 0) {
          picker.refreshDatasource(1).then(function (value) {
            var _this2 = this;

            _newArrowCheck(this, _this);

            picker.refreshDatasource(2).then(function (value) {
              _newArrowCheck(this, _this2);
            }.bind(this));
          }.bind(this));
        } else if (groupIndex == 1) {
          picker.refreshDatasource(2).then(function (value) {
            _newArrowCheck(this, _this);
          }.bind(this));
        }
      }
    }]);

    return _default;
  }();

  function init() {
    bpLibs.icons.registerAliasIcon('bp-picker_check', 'ok');
  }

  init();
  var index = {
    init: init,
    bpPicker: __vue_component__,
    bpPickerCell: __vue_component__$1,
    PickerDateDatasource: _default$3,
    PickerDoubleDatasource: _default$1,
    PickerSingleDatasource: _default,
    PickerThreeDatasource: _default$2,
    PickerTimeDatasource: _default$4
  };

  return index;

})));
//# sourceMappingURL=index.js.map
