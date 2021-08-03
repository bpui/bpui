/*!
 * bpui dialog v1.1.2
 * Copyright (c) 2021 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@bpui/libs'), require('febs-browser'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['@bpui/libs', 'febs-browser', 'vue'], factory) :
  (global = global || self, global.bpDialog = factory(global.bpLibs, global.febs, global.Vue));
}(this, (function (bpLibs, febs, Vue) { 'use strict';

  bpLibs = bpLibs && Object.prototype.hasOwnProperty.call(bpLibs, 'default') ? bpLibs['default'] : bpLibs;
  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode:  'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

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

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

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

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

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
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
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

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
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
  var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys$1(source);
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

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

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







  var SPECIES = wellKnownSymbol('species');
  var RegExpPrototype$1 = RegExp.prototype;

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
        re.constructor[SPECIES] = function () { return re; };
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
        if ($exec === regexpExec || $exec === RegExpPrototype$1.exec) {
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
      redefine(RegExpPrototype$1, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype$1[SYMBOL], 'sham', true);
  };

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
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

  var floor$1 = Math.floor;
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
            var f = floor$1(n / 10);
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

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty = objectDefineProperty.f;
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
        defineProperty(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

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

  var nativePromiseConstructor = global_1.Promise;

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var defineProperty$1 = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
      defineProperty$1(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () { return this; }
      });
    }
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

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task.set;




  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var document$2 = global_1.document;
  var process$2 = global_1.process;
  var Promise$1 = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
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












  var SPECIES$3 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState$1 = internalState.get;
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
    constructor[SPECIES$3] = FakePromise;
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
      var state = getInternalState$1(this);
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
      var state = getInternalState$1(promise);
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

  // TODO: use something more complex like timsort?
  var floor$2 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$2(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      mergeSort(array.slice(0, middle), comparefn),
      mergeSort(array.slice(middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
      if (lindex < llength && rindex < rlength) {
        result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
      } else {
        result.push(lindex < llength ? left[lindex++] : right[rindex++]);
      }
    } return result;
  };

  var arraySort = mergeSort;

  var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

  var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var test$1 = [];
  var nativeSort = test$1.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function () {
    test$1.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function () {
    test$1.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$1 = arrayMethodIsStrict('sort');

  var STABLE_SORT = !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (engineV8Version) return engineV8Version < 70;
    if (engineFfVersion && engineFfVersion > 3) return;
    if (engineIsIeOrEdge) return true;
    if (engineWebkitVersion) return engineWebkitVersion < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test$1.push({ k: chr + index, v: value });
      }
    }

    test$1.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test$1.length; index++) {
      chr = test$1[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return String(x) > String(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export({ target: 'Array', proto: true, forced: FORCED$1 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aFunction$1(comparefn);

      var array = toObject(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);

      var items = [];
      var arrayLength = toLength(array.length);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) items.push(array[index]);
      }

      items = arraySort(items, getSortCompare(comparefn));
      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) delete array[index++];

      return array;
    }
  });

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
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

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
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

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var max$2 = Math.max;
  var min$4 = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$4(max$2(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var GlobalWidgetHook = '$BpGlobalWidgetHook';
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */

  function addWidgetShake(foo
  /*:(paddingRight:number)=>void*/
  ) {
    if (!window[GlobalWidgetHook]) {
      window[GlobalWidgetHook] = [];
    }

    var hooks = window[GlobalWidgetHook];

    if (hooks.indexOf(foo) < 0) {
      hooks.push(foo);
    }
  }
  /**
   * 移除页面抖动hook.
   */

  function removeWidgetShake(foo
  /*:(paddingRight:number)=>void*/
  ) {
    var hooks = window[GlobalWidgetHook];

    if (hooks) {
      var i = hooks.indexOf(foo);
      if (i >= 0) hooks.splice(0, 1);
    }
  }
  function callWidgetShake(paddingRight
  /*:number*/
  ) {
    var hooks = window[GlobalWidgetHook];

    if (hooks) {
      for (var i = 0; i < hooks.length; i++) {
        hooks[i] && hooks[i](paddingRight);
      }
    }
  }

  var hook = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addWidgetShake: addWidgetShake,
    removeWidgetShake: removeWidgetShake,
    callWidgetShake: callWidgetShake
  });

  var ApiClass = "bp-apiClass";

  function domGetDuration(el) {
    var d = window.getComputedStyle(el, null);
    d = d ? d["transition-duration"] : "0.1s";
    d = d.split(",")[0];
    d = febs.string.trim(d);
    d = febs.string.replace(d, "s", "");
    d = parseFloat(d);
    d = Math.ceil(d * 1000) || 100;
    return d;
  }

  function maskPreventHandler(event) {
    if (event.type == "touchmove" || event.type == "mousewheel") ; else {
      event.preventDefault();
    }

    return false;
  } // event.


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
  /**
   * @desc: 遮罩层当前的zindex.
   */

  function getWidgetZIndex(dataMark) {
    var zIndex = 2000;
    var mask = $(".bp-widget[data-mark='".concat(dataMark, "']"));

    for (var i = 0; i < mask.length; i++) {
      var t = Number($(mask[i]).css("z-index")) || 0;

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


  function restoreFixedScroll(widget) {
    if (widget.hasClass("bp-widget__bodyFixscroll")) {
      $("body").addClass("bp-widget__fixscroll");
    }

    var ss = widget.attr("data-htmlp");

    if (ss.length > 0) {
      var sss = febs.string.replace(ss, "px", "");
      sss = parseInt(sss) || 0;
      callWidgetShake(sss);
      $("html").css("padding-right", ss);
    }
  }

  function removeFixedScroll() {
    $("body").removeClass("bp-widget__fixscroll");
    var pr = $("html").css("padding-right");

    if (pr && pr.length > 0) {
      callWidgetShake(0);
      $("html").css("padding-right", "");
    }
  }
  /**
   * @desc: 显示遮罩层.
   */


  function showWidget(el, showMask, preventEvent, hideBodyScroll, cb) {
    var _this = this;

    var mask = $(el);

    if (preventEvent) {
      maskPreventEvent(mask);
    } // 防止多次调用
    // bp-widget__showing只是标示 正在显示的的样式名，没有实际样式


    if (mask.hasClass("bp-widget__visible") || mask.hasClass("bp-widget__showing")) {
      if (cb) cb();
      return;
    }

    hack(mask);
    var pageLen = $(".bp-navbarView_page").length;
    var dataMark = "page" + pageLen;
    var zindex = getWidgetZIndex(dataMark) + 2;
    mask.css("z-index", zindex);
    mask.attr("data-mark", dataMark);
    mask.addClass("bp-widget__showing").removeClass("bp-widget__closing");

    if (showMask) {
      // 在hideWidget用来辅助判断 是否是显示showMask的widget
      mask.addClass("bp-widget__maskTmp");
    }

    var hidedScroll = false;
    var body = $("body");
    var html = $("html");

    if (hideBodyScroll) {
      var willFix = false;
      var scrollWidth = 0;

      if (showMask || preventEvent) {
        // 桌面端判断垂直滚动条.
        if (!febs.utils.browserIsMobile()) {
          scrollWidth = window.innerWidth - febs.dom.getViewPort().width; // if (scrollWidth > 0) {
          //   willFix = true;
          // }

          if (febs.dom.getDocumentPort().height > febs.dom.getViewPort().height) {
            willFix = true;
          }
        } // 移动端
        else {
            if (febs.dom.getDocumentPort().height > febs.dom.getViewPort().height) {
              willFix = true;
            }
          }
      }

      if (willFix) {
        body.addClass("bp-widget__fixscroll");

        if (scrollWidth > 0) {
          callWidgetShake(scrollWidth);
          html.css("padding-right", scrollWidth + "px");
        }

        hidedScroll = true;
        mask.addClass("bp-widget__willFix");
      } else {
        hidedScroll = body.hasClass("bp-widget__fixscroll");
      }
    } // polyfill firefox.


    if (hidedScroll) {
      if (navigator.userAgent.indexOf("Firefox") >= 0) {
        mask.css("overflow-y", "scroll");
      }
    } else {
      if (navigator.userAgent.indexOf("Firefox") >= 0) {
        mask.css("overflow-y", "");
      }
    } // 标记.


    if (body.hasClass("bp-widget__fixscroll")) {
      mask.addClass("bp-widget__bodyFixscroll");
    }

    var ss = html.css("padding-right");

    if (ss && ss.length > 0) {
      mask.attr("data-htmlp", ss);
    }

    var preMask; // only one mask.

    if (showMask) {
      var _widgets = _getSortWidget(dataMark); // 寻找最大的zindex的preMask


      for (var i = _widgets.length - 1; i >= 0; i--) {
        var mask0 = _widgets[i].el;

        if (mask0.hasClass("bp-widget__mask") && !mask[0].isEqualNode(mask0[0])) {
          preMask = mask0;
          break;
        }
      }
    }

    bpLibs.dom.probeDom(200, function () {
      _newArrowCheck(this, _this);

      return 0 == window.innerWidth - febs.dom.getViewPort().width;
    }.bind(this), function () {
      var _this2 = this;

      _newArrowCheck(this, _this);

      febs.utils.sleep(0).then(function () {
        _newArrowCheck(this, _this2);

        mask.addClass("bp-widget__invisible");
        mask.removeClass("bp-widget__maskTmp");

        if (showMask) {
          if (!preMask) {
            mask.addClass("bp-widget__mask");
          }
        }

        mask.css("display", "inherit");
      }.bind(this)).then(function () {
        _newArrowCheck(this, _this2);

        if (mask.hasClass("bp-widget__closing")) {
          return Promise.reject();
        }

        var duration = domGetDuration(mask[0]) || 100;
        mask.removeClass("bp-widget__invisible").addClass("bp-widget__visible");
        return duration;
      }.bind(this)).then(function (duration) {
        var _this3 = this;

        _newArrowCheck(this, _this2);

        return febs.utils.sleep(10).then(function () {
          _newArrowCheck(this, _this3);

          // 修正居中显示, 超出造成的偏移.
          var content = mask.children('.bp-widget__content')[0];
          var clientHeight = content.clientHeight;

          if (clientHeight > febs.dom.getViewPort().height) {
            clientHeight = (clientHeight - febs.dom.getViewPort().height) / 2 + 20;
            $(content).css('top', clientHeight + 'px');
          }

          return febs.utils.sleep(duration - 10);
        }.bind(this));
      }.bind(this)).then(function () {
        _newArrowCheck(this, _this2);

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
          preMask.removeClass("bp-widget__mask").addClass("bp-widget__maskTmp").addClass("bp-widget__maskNoAminate");
        }

        if (cb) {
          cb();
        }
      }.bind(this))["catch"](function () {
        _newArrowCheck(this, _this2);
      }.bind(this));
    }.bind(this));
  }
  /**
   * @desc: 隐藏所有的api层.
   */

  function removeAllApiModal(elementSelector) {
    var pageLen = $(".bp-navbarView_page").length;
    var dataMark = "page" + pageLen;
    var apis = $("".concat(elementSelector ? elementSelector : "." + ApiClass));

    if (apis.length > 0) {
      apis.remove(); // zindex.

      var _widgets = _getSortWidget(dataMark); // 寻找最大的zindex.


      for (var i = 0; i < _widgets.length; i++) {
        var mask0 = _widgets[i].el;

        if (mask0.hasClass("bp-widget__mask")) {
          return;
        }

        if (mask0.hasClass("bp-widget__maskTmp")) {
          mask0.removeClass("bp-widget__maskTmp").addClass("bp-widget__mask").removeClass("bp-widget__maskNoAminate");
          return;
        }
      }

      removeFixedScroll();
    } // if.

  }
  /**
   * @desc: 隐藏遮罩层.
   */

  function hideWidget(el, cb) {
    var mask = $(el); // 防止多次调用
    // bp-widget__closing只是标示 正在关闭的样式名，没有实际样式

    if (mask.hasClass("bp-widget__invisible") || mask.hasClass("bp-widget__closing")) {
      if (cb) cb();
      return;
    }

    var pageLen = $(".bp-navbarView_page").length;
    var dataMark = "page" + pageLen;
    mask.addClass("bp-widget__closing").removeClass("bp-widget__showing");
    mask.removeClass("bp-widget__visible").addClass("bp-widget__invisible");
    mask.attr("data-mark", "");

    var _zindex = Number(mask.css("z-index")) || 0;

    var sortWidget = _getSortWidget(dataMark);

    var l = sortWidget.length;
    var preMask; // zIndex 小于当前widget 并显示着的弹框 并带有mask 样式的弹框

    var postWidget; // zIndex 大于当前widget的弹框

    var isVisibleWidgetHasFixscroll = false; // 除了当前弹框，是否还有其他弹框显示着

    if (l) {
      for (var i = sortWidget.length - 1; i >= 0; i--) {
        var mask0 = sortWidget[i].el;
        var mask0ZIndex = sortWidget[i].zIndex;
        var _el = mask0[0]; // 判断是否是显示的其他弹框

        if (_el.style.display !== "none" && !mask0.hasClass("bp-widget__closing") && !mask0.hasClass("bp-widget__invisible")) {
          isVisibleWidgetHasFixscroll = true; // 前一个带遮罩的弹框

          if (!preMask && mask0ZIndex < _zindex && (mask0.hasClass("bp-widget__mask") || mask0.hasClass("bp-widget__maskTmp"))) {
            preMask = mask0;
          } // 前一个弹框


          if (!postWidget && mask0ZIndex > _zindex) {
            postWidget = mask0;
          }
        }
      }
    }

    if (!isVisibleWidgetHasFixscroll) {
      $("body").removeClass("bp-widget__fixscroll");
      callWidgetShake(0);
      $("html").css("padding-right", "");
    }

    if (!postWidget && preMask) {
      preMask.removeClass("bp-widget__maskTmp").addClass("bp-widget__maskNoAminate").addClass("bp-widget__mask");
    }

    var duration = domGetDuration(mask[0]) || 100;
    setTimeout(function () {
      mask.css("display", "none");
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
  } // 取当前页所有widget 并排序；

  function _getSortWidget(dataMark) {
    var _this4 = this;

    var masks = $(".bp-widget[data-mark='".concat(dataMark, "']"));
    var widget = [];

    for (var i = 0; i < masks.length; i++) {
      var el1 = $(masks[i]);
      var t = Number(el1.css("z-index")) || 2000;
      widget.push({
        zIndex: t,
        el: el1
      });
    }

    widget.sort(function (a, b) {
      _newArrowCheck(this, _this4);

      if (a.zIndex == b.zIndex) return 0;
      return a.zIndex > b.zIndex ? 1 : -1;
    }.bind(this));
    return widget;
  }

  // const GlobalDialogCustoms = Symbol('$BpGlobalDialogCustoms');

  var GlobalDialogComponents = '$BpGlobalDialogComponents';
  var GlobalDialogCustoms = '$BpGlobalDialogCustoms';
  /**
  * @desc: 注册警告框等组件.
  */

  function registerDialogComponents(cfg
  /*:{
  alert:any,
  confirm:any,
  loading:any,
  }*/
  ) {
    window[GlobalDialogComponents] = febs.utils.mergeMap(window[GlobalDialogComponents], cfg);
  }
  function getComponents() {
    return window[GlobalDialogComponents];
  }
  /**
  * @desc: 注册自定义模式对话框组件.
  * @param name 组件名称, 如果已经存在则覆盖
  * @return 表明注册的名称是否不存在; 如果已经存在则覆盖, 并返回false.
  */

  function registerDialogCustom(name, component) {
    var g = window[GlobalDialogCustoms] = window[GlobalDialogCustoms] || {};

    if (g.hasOwnProperty(name)) {
      g[name] = component;
      return false;
    }

    g[name] = component;
    return true;
  }
  function getCustomComponent(name) {
    var g = window[GlobalDialogCustoms];
    return g ? g[name] : null;
  }

  var ApiClass$1 = 'bp-apiClass';
  var AlertClass = 'bp-alertClass';
  /**
  * @desc: 隐藏对话框
  */

  function hideDialog(id)
  /* :void*/
  {
    var _this = this;

    if (id) {
      id.vm.hide().then(function (res) {
        _newArrowCheck(this, _this);

        $(".".concat(id.id)).remove();
      }.bind(this));
    } else {
      removeAllApiModal('.' + AlertClass);
    }
  }
  var hideAlert = hideDialog;
  var hideConfirm = hideDialog;
  /**
  * @desc: 显示警告框.
  */

  function showAlert(cfg
  /*:string|{
  title?: string,
  content: string,
  okText?: string,
  confirm?: ()=>void,
  }*/
  ) {
    var _this2 = this;

    var alert = getComponents().alert;

    if (!alert) {
      throw new Error('dialog alert component is null');
    }

    if (typeof cfg === 'string' || typeof cfg === 'number') {
      cfg = {
        content: cfg.toString()
      };
    }

    cfg.title = cfg.title || '';
    cfg = febs.utils.mergeMap(alert.data(), cfg);
    var c = febs.utils.mergeMap(alert, {
      data: function data() {
        _newArrowCheck(this, _this2);

        return cfg;
      }.bind(this)
    });
    var id = 'c' + febs.crypt.uuid();
    $("<div id=\"".concat(id, "\"></div>")).appendTo($('body')); // 创建实例.

    var vm = new Vue({
      render: function render(h) {
        var _this3 = this;

        _newArrowCheck(this, _this2);

        return h(c, {
          "class": [ApiClass$1, AlertClass, id],
          on: {
            confirm: function confirm() {
              var _this4 = this;

              _newArrowCheck(this, _this3);

              if (cfg.confirm) {
                cfg.confirm({
                  vm: vm.$children[0].$children[0],
                  id: id
                });
              } else {
                vm.$children[0].$children[0].hide().then(function (res) {
                  _newArrowCheck(this, _this4);

                  $(".".concat(id)).remove();
                }.bind(this));
              }
            }.bind(this)
          }
        });
      }.bind(this)
    }).$mount("#".concat(id));
    vm.$children[0].$children[0].show().then(function (res) {
      _newArrowCheck(this, _this2);
    }.bind(this)); // var vnode = render.call(vm._renderProxy, vm.$createElement);
    // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

    return {
      vm: vm.$children[0].$children[0],
      id: id
    };
  }
  /**
  * @desc: 显示确认框.
  */

  function showConfirm(cfg
  /*:string|{
  title?: string,
  content: string,
  okText?: string,
  cancelText?: string,
  confirm?: ()=>void,
  cancel?: ()=>void,
  }*/
  ) {
    var _this5 = this;

    var confirm = getComponents().confirm;

    if (!confirm) {
      throw new Error('dialog confirm component is null');
    }

    if (typeof cfg === 'string') {
      cfg = {
        content: cfg
      };
    }

    cfg.title = cfg.title || '';
    cfg = febs.utils.mergeMap(confirm.data(), cfg);
    var c = febs.utils.mergeMap(confirm, {
      data: function data() {
        _newArrowCheck(this, _this5);

        return cfg;
      }.bind(this)
    });
    var id = 'c' + febs.crypt.uuid();
    $("<div id=\"".concat(id, "\"></div>")).appendTo($('body')); // 创建实例.

    var vm = new Vue({
      render: function render(h) {
        var _this6 = this;

        _newArrowCheck(this, _this5);

        return h(c, {
          "class": [ApiClass$1, AlertClass, id],
          on: {
            confirm: function confirm() {
              var _this7 = this;

              _newArrowCheck(this, _this6);

              if (cfg.confirm) {
                cfg.confirm({
                  vm: vm.$children[0].$children[0],
                  id: id
                });
              } else {
                vm.$children[0].$children[0].hide().then(function (res) {
                  _newArrowCheck(this, _this7);

                  $(".".concat(id)).remove();
                }.bind(this));
              }
            }.bind(this),
            cancel: function cancel() {
              var _this8 = this;

              _newArrowCheck(this, _this6);

              if (cfg.cancel) {
                cfg.cancel({
                  vm: vm.$children[0].$children[0],
                  id: id
                });
              } else {
                vm.$children[0].$children[0].hide().then(function (res) {
                  _newArrowCheck(this, _this8);

                  $(".".concat(id)).remove();
                }.bind(this));
              }
            }.bind(this)
          }
        });
      }.bind(this)
    }).$mount("#".concat(id));
    vm.$children[0].$children[0].show().then(function (res) {
      _newArrowCheck(this, _this5);
    }.bind(this));
    return {
      vm: vm.$children[0].$children[0],
      id: id
    };
  }
  /**
  * @desc: 在body中appendwidget而非父元素中.
  */

  function showWidget$1(component
  /*:any*/
  ) {
    var _this9 = this;

    if (!component || !bpLibs.dom.isVueComponent(component)) {
      throw new Error('component is null or not a Component');
    }

    var id = 'c' + febs.crypt.uuid();
    $("<div id=\"".concat(id, "\"></div>")).appendTo($('body')); // 创建实例.

    var vm = new Vue({
      render: function render(h) {
        var _this10 = this;

        _newArrowCheck(this, _this9);

        return h(component, {
          'update:visible': function updateVisible(v) {
            _newArrowCheck(this, _this10);

            if (!v) {
              $(".".concat(id)).remove();
            }
          }.bind(this)
        });
      }.bind(this)
    }).$mount("#".concat(id));
    vm.$children[0].$children[0].show().then(function (res) {
      _newArrowCheck(this, _this9);
    }.bind(this)); // var vnode = render.call(vm._renderProxy, vm.$createElement);
    // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

    return {
      vm: vm.$children[0].$children[0],
      id: id
    };
  }

  var apiDialog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hideDialog: hideDialog,
    hideAlert: hideAlert,
    hideConfirm: hideConfirm,
    showAlert: showAlert,
    showConfirm: showConfirm,
    showWidget: showWidget$1
  });

  // const GlobalLoading = Symbol('$BpGlobalLoading');

  var GlobalLoadingTimeout = '$BpGlobalLoadingTimeout';
  var GlobalLoading = '$BpGlobalLoading';
  var GlobalLoadingCount = '$BpGlobalLoadingCount';
  var GlobalLoadingShowMark = '$BpGlobalLoadingShowMark';
  var GlobalTargetLoadings = '$BpGlobalTargetLoadings';
  var ApiClass$2 = 'bp-apiClass';
  var LoadingClass = 'bp-loadingClass';
  var LoadingTargetClass = 'bp-loadingTargetClass';
  /**
  * @desc: 隐藏对话框
  */

  function hideLoading() {
    window[GlobalLoadingShowMark] = false;

    if (window[GlobalLoadingCount]) {
      return;
    }

    if (window[GlobalLoadingTimeout]) {
      clearTimeout(window[GlobalLoadingTimeout].tm);
      window[GlobalLoadingTimeout] = null;
    }

    if (window[GlobalLoading]) {
      window[GlobalLoading].$children[0].hide();
    }
  }
  /**
   * @desc: 清理loading的计数; 设置为0.
   */

  function clearLoadingCount() {
    window[GlobalLoadingCount] = 0;
  }

  function onHandlerRouter(to, type) {
    clearLoadingCount();
    hideLoading();

    if (window[GlobalTargetLoadings]) {
      for (var key in window[GlobalTargetLoadings]) {
        var targetLoading = window[GlobalTargetLoadings][key];

        if (targetLoading.timeout) {
          clearTimeout(targetLoading.timeout);
          targetLoading.timeout = null;
        }

        if (targetLoading.dom) {
          $(targetLoading.dom).remove();
        }

        if (targetLoading.srcPosition && $(targetLoading.target).css('position') == 'relative') {
          $(targetLoading.target).css('position', targetLoading.srcPosition);
        }
      }

      window[GlobalTargetLoadings] = null;
    } // if.

  }

  function isLoadingVisible() {
    var loading = $('.' + LoadingClass);

    if (loading.length > 0) {
      if (window[GlobalLoadingTimeout] || loading.hasClass('bp-widget__visible')) {
        return true;
      }
    }

    return false;
  }
  function getLoadingCount() {
    return window[GlobalLoadingCount] || 0;
  }
  /**
  * @desc: 显示警告框.
  */

  function showLoading(cfg
  /*:string|{
  content: 提示文本.
  delay: 延时显示, 默认为0.
  }*/
  ) {
    var _this = this;

    window[GlobalLoadingShowMark] = true;
    bpLibs.router.off('routeChanged', onHandlerRouter);
    bpLibs.router.on('routeChanged', onHandlerRouter);
    if (!cfg) cfg = '';
    var loading = getComponents().loading;

    if (!loading) {
      throw new Error('dialog loading component is null');
    } // 创建实例.


    if (!window[GlobalLoading]) {
      var id = 'c' + febs.crypt.uuid();
      $("<div id=\"".concat(id, "\"></div>")).appendTo($('body'));
      var vm = new Vue({
        render: function render(h) {
          _newArrowCheck(this, _this);

          return h(loading, {
            "class": [ApiClass$2, LoadingClass, id]
          });
        }.bind(this)
      }).$mount("#".concat(id));
      window[GlobalLoading] = vm.$children[0];
    }

    if (typeof cfg === 'string' || typeof cfg === 'number') {
      cfg = {
        content: cfg.toString()
      };
    }

    cfg.delay = cfg.delay || 0;
    if (cfg.delay < 0) cfg.delay = 0;
    var now = Date.now(); // 判断是否已经存在.

    if (window[GlobalLoadingTimeout]) {
      if (window[GlobalLoadingTimeout].now > now + cfg.delay) {
        clearTimeout(window[GlobalLoadingTimeout].tm);
        window[GlobalLoadingTimeout] = null;
      } else {
        window[GlobalLoadingTimeout].cfg = febs.utils.mergeMap(cfg);
        return;
      }
    }

    {
      now = now + cfg.delay;
      var tm = setTimeout(function () {
        _newArrowCheck(this, _this);

        var cfg1 = window[GlobalLoadingTimeout].cfg;
        window[GlobalLoadingTimeout] = null;
        cfg1 = febs.utils.mergeMap(loading.data(), cfg1);
        window[GlobalLoading].$data.content = cfg1.content;
        window[GlobalLoading].$children[0].show();
      }.bind(this), cfg.delay);
      window[GlobalLoadingTimeout] = {
        tm: tm,
        now: now,
        cfg: febs.utils.mergeMap(cfg)
      };
    }
  }
  /**
  * @desc: 隐藏对话框; 并减少计数
  */

  function hideLoadingDecrease() {
    if (window[GlobalLoadingCount]) {
      window[GlobalLoadingCount] = window[GlobalLoadingCount] - 1;

      if (window[GlobalLoadingCount] > 0) {
        return;
      }
    }

    if (window[GlobalLoadingShowMark]) {
      return;
    }

    hideLoading();
  }
  /**
   * @desc: 显示; 增加内部的loading计数1. 如果已经存在loading, 则不改变loading的内容.
   */

  function showLoadingIncrease(cfg) {
    if (!window[GlobalLoadingCount]) {
      window[GlobalLoadingCount] = 0;
    }

    window[GlobalLoadingCount] = window[GlobalLoadingCount] + 1;

    if (!isLoadingVisible()) {
      var mark = window[GlobalLoadingShowMark];
      showLoading(cfg);
      window[GlobalLoadingShowMark] = mark;
    }
  }
  /**
  * @desc: 隐藏对话框
  */

  function hideLoadingTarget(target) {
    var _this2 = this;

    if (!target) {
      throw new Error('Empty parameter target in function showLoadingTarget');
    }

    if (!window[GlobalTargetLoadings]) {
      window[GlobalTargetLoadings] = {};
    }

    var targetLoading = window[GlobalTargetLoadings][target];

    if (!targetLoading) {
      return;
    }

    if (targetLoading.timeout) {
      clearTimeout(targetLoading.timeout);
      targetLoading.timeout = null;
    }

    if (targetLoading.loading) {
      targetLoading.loading.$children[0].hide().then(function () {
        _newArrowCheck(this, _this2);

        $(targetLoading.dom).remove();
        delete window[GlobalTargetLoadings][target];

        if (targetLoading.srcPosition && $(target).css('position') == 'relative') {
          $(target).css('position', targetLoading.srcPosition);
        }
      }.bind(this));
    } else {
      delete window[GlobalTargetLoadings][target];
    }
  }
  /**
  * @desc: 显示警告框.
  */

  function showLoadingTarget(target, cfg
  /*:string|{
  content: 提示文本.
  delay: 延时显示, 默认为0.
  }*/
  ) {
    var _this3 = this;

    if (!target) {
      throw new Error('Empty parameter target in function showLoadingTarget');
    }

    bpLibs.router.off('routeChanged', onHandlerRouter);
    bpLibs.router.on('routeChanged', onHandlerRouter);

    if (!window[GlobalTargetLoadings]) {
      window[GlobalTargetLoadings] = {};
    }

    var targetLoadings = window[GlobalTargetLoadings];
    if (!cfg) cfg = '';
    var loading = getComponents().loading;

    if (!loading) {
      throw new Error('dialog loading component is null');
    } // 创建实例.


    if (!targetLoadings[target]) {
      var srcPosition = window.getComputedStyle(target).position;

      if (srcPosition == 'sticky' || srcPosition == 'relative' || srcPosition == 'absolute' || srcPosition == 'fixed') {
        srcPosition = null;
      } else {
        var tt = $(target);
        var pos = tt.css('position');

        if (!febs.string.isEmpty(pos)) {
          tt.css('position', '');
        }

        var style = tt.attr('style');
        style = style || '';
        style = febs.string.trim(style);

        if (style.length > 0 && style[style.length - 1] != ';') {
          style += '; ';
        }

        style += 'position:relative !important;';
        tt.attr('style', style);
      }

      var id = 'c' + febs.crypt.uuid();
      $("<div id=\"".concat(id, "\"></div>")).appendTo($(target));
      var vm = new Vue({
        render: function render(h) {
          _newArrowCheck(this, _this3);

          return h(loading, {
            "class": [ApiClass$2, LoadingClass, LoadingTargetClass, id]
          });
        }.bind(this)
      }).$mount("#".concat(id));
      targetLoadings[target] = {
        loading: vm.$children[0],
        dom: $(".".concat(id))[0],
        srcPosition: srcPosition,
        target: target
      };
    }

    if (typeof cfg === 'string' || typeof cfg === 'number') {
      cfg = {
        content: cfg.toString()
      };
    }

    cfg.delay = cfg.delay || 0;
    if (cfg.delay < 0) cfg.delay = 0;
    var now = Date.now(); // 判断是否已经存在.

    if (targetLoadings[target].timeout) {
      if (targetLoadings[target].now > now + cfg.delay) {
        clearTimeout(targetLoadings[target].timeout);
        targetLoadings[target].timeout = null;
      } else {
        targetLoadings[target].cfg = febs.utils.mergeMap(cfg);
        return;
      }
    }

    {
      now = now + cfg.delay;
      var tm = setTimeout(function () {
        _newArrowCheck(this, _this3);

        var cfg1 = targetLoadings[target].cfg;
        targetLoadings[target].timeout = null;
        cfg1 = febs.utils.mergeMap(loading.data(), cfg1);
        targetLoadings[target].loading.$data.content = cfg1.content;
        targetLoadings[target].loading.$children[0].show();
      }.bind(this), cfg.delay);
      targetLoadings[target].now = now;
      targetLoadings[target].cfg = febs.utils.mergeMap(cfg);
      targetLoadings[target].timeout = tm;
    }
  }

  var apiLoading = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hideLoading: hideLoading,
    clearLoadingCount: clearLoadingCount,
    isLoadingVisible: isLoadingVisible,
    getLoadingCount: getLoadingCount,
    showLoading: showLoading,
    hideLoadingDecrease: hideLoadingDecrease,
    showLoadingIncrease: showLoadingIncrease,
    hideLoadingTarget: hideLoadingTarget,
    showLoadingTarget: showLoadingTarget
  });

  var ApiClass$3 = 'bp-apiClass'; // const GlobalToastTimeout = Symbol('$BpGlobalToastTimeout');
  // const GlobalToast = Symbol('$BpGlobalToast');
  // const GlobalToastTimeout = ('$BpGlobalToastTimeout');
  // const GlobalToast = ('$BpGlobalToast');

  /**
  * @desc: 显示警告框.
  */

  function showToast(cfg
  /*:string|{
  content: 提示文本.
  durable: 持续时间, 默认为0.
  pos: 显示位置, 默认为 'top',
  icon: 显示的图标名称.
  }*/
  ) {
    var _this = this;

    if (!cfg) cfg = '';
    var toast = getComponents().toast;

    if (!toast) {
      throw new Error('dialog toast component is null');
    }

    if (typeof cfg === 'string' || typeof cfg === 'number') {
      cfg = {
        content: cfg.toString()
      };
    }

    cfg.durable = cfg.durable || 0;
    cfg.pos = cfg.pos || 'top';
    if (cfg.durable < 0) cfg.durable = 0;
    if (cfg.durable == 0) cfg.durable = 4000; // 创建实例.

    var id = 'c' + febs.crypt.uuid();

    if (cfg.pos == 'top') {
      if (!$('.bp-toast-wrap')[0]) {
        $("<div class=\"bp-toast-wrap\"></div>").appendTo($('body'));
      }

      $("<div id=\"".concat(id, "\"></div>")).appendTo($('.bp-toast-wrap'));
    } else {
      $("<div id=\"".concat(id, "\"></div>")).appendTo($('body'));
    } // if (window[GlobalToastTimeout]) {
    //   clearTimeout(window[GlobalToastTimeout].tm);
    //   let _id = window[GlobalToastTimeout].id;
    //   let _vm = window[GlobalToast];
    //   window[GlobalToastTimeout] = null;
    //   if (_vm) {
    //     window[GlobalToast] = null;
    //     _vm.hide().then(res=>{
    //       $('.' + _id).remove();
    //     });
    //   }
    // }


    var vm = new Vue({
      render: function render(h) {
        _newArrowCheck(this, _this);

        return h(toast, {
          "class": [ApiClass$3, id, cfg.pos == 'center' ? 'bp-toast__center' : '']
        });
      }.bind(this)
    }).$mount("#".concat(id));
    vm.$children[0].$data.content = cfg.content;
    vm.$children[0].$data.icon = cfg.icon;
    vm.$children[0].$children[0].show().then(function (res) {
      _newArrowCheck(this, _this);
    }.bind(this)); // window[GlobalToast] = vm.$children[0].$children[0];

    var toastCom = vm.$children[0].$children[0];
    var tm = setTimeout(function () {
      var _this2 = this;

      _newArrowCheck(this, _this);

      // let tt = window[GlobalToastTimeout];
      // window[GlobalToastTimeout] = null;
      // if (tt) {
      var _vm = toastCom;

      if (_vm) {
        _vm.hide().then(function (res) {
          _newArrowCheck(this, _this2);

          if (id && id.length > 0) {
            $('.' + id).remove();
          }
        }.bind(this));
      } // }

    }.bind(this), cfg.durable); // window[GlobalToastTimeout] = {tm, id};
  }

  var apiToast = /*#__PURE__*/Object.freeze({
    __proto__: null,
    showToast: showToast
  });

  var ApiClass$4 = 'bp-apiClass';
  var ModalCustomClass = 'bp-modalCustomClass';
  /**
  * @desc: 隐藏对话框
  */

  function hideCustom(id)
  /* :void*/
  {
    var _this = this;

    if (id) {
      id.vm.hide().then(function (res) {
        _newArrowCheck(this, _this);

        $(".".concat(id.id)).remove();
      }.bind(this));
    } else {
      removeAllApiModal('.' + ModalCustomClass);
    }
  }
  /**
  * @desc: 显示警告框.
  */

  function showCustom(name, cfg) {
    var _this2 = this;

    var c = getCustomComponent(name);

    if (!c) {
      throw new Error('dialog custom component is null: ' + name);
    }

    var id = 'c' + febs.crypt.uuid();
    $("<div id=\"".concat(id, "\"></div>")).appendTo($('body'));
    cfg = cfg || {}; // 创建实例.

    var vm = new Vue({
      render: function render(h) {
        _newArrowCheck(this, _this2);

        return h(c, _objectSpread2({
          "class": [ApiClass$4, ModalCustomClass, id]
        }, cfg));
      }.bind(this)
    }).$mount("#".concat(id));
    vm.$children[0].$children[0].show().then(function (res) {
      _newArrowCheck(this, _this2);
    }.bind(this)); // var vnode = render.call(vm._renderProxy, vm.$createElement);
    // console.log(alert.render.call(getRenderProxy(), getCreateElement()))

    return {
      vm: vm.$children[0].$children[0],
      id: id
    };
  }

  var apiCustom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hideCustom: hideCustom,
    showCustom: showCustom
  });

  var apiWidget = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, apiDialog), apiLoading), apiToast), apiCustom);

  var _Vue;

  function install(vue) {
    if (install.installed && _Vue === vue) return;
    install.installed = true;
    _Vue = vue;
    Object.defineProperty(vue.prototype, '$bpWidget', {
      get: function get() {
        return apiWidget;
      }
    });
  }

  function VuePlugin () {
    return {
      install: install
    };
  }

  var script = {
    components: {},
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
      preventEvent: {
        "default": true,
        type: Boolean
      },
      hideBodyScroll: {
        "default": true,
        type: Boolean
      },
      appendToBody: {
        "default": false,
        type: Boolean | String,
        validator: function validator(value) {
          return typeof value === 'boolean' || value === 'true' || value === 'false';
        }
      },
      pageClass: String | Array,
      pageStyle: String | Array | Object
    },
    data: function data() {
      return {
        uuid: null
      };
    },
    watch: {
      visible: function visible(val) {
        var _this = this;

        if (val) {
          this.show().then(function () {
            _newArrowCheck(this, _this);
          }.bind(this));
        } else {
          this.hide().then(function () {
            _newArrowCheck(this, _this);
          }.bind(this));
        }
      }
    },
    beforeMount: function beforeMount() {
      if (this.appendToBody && this.appendToBody != 'false') {
        this.uuid = 'bp-widget-' + febs.crypt.uuid();
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      if (this.appendToBody && this.appendToBody != 'false') {
        $(this.$el).attr('id', this.uuid);
        $('body').append(this.$el);
      }

      if (this.visible) {
        this.show().then(function () {
          _newArrowCheck(this, _this2);
        }.bind(this));
      }
    },
    beforeDestroy: function beforeDestroy() {
      var _this3 = this;

      if (this.visible) {
        this.hide().then(function () {
          _newArrowCheck(this, _this3);

          if (this.uuid) {
            $('#' + this.uuid).remove();
          }
        }.bind(this));
      } else {
        if (this.uuid) {
          $('#' + this.uuid).remove();
        }
      }
    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function show() {
        var _this4 = this;

        return new Promise(function (resolve) {
          var _this5 = this;

          _newArrowCheck(this, _this4);

          showWidget(this.$el, this.mask, this.preventEvent, this.hideBodyScroll, function () {
            _newArrowCheck(this, _this5);

            this.$emit('update:visible', true);
            resolve();
          }.bind(this));
        }.bind(this));
      },

      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function hide() {
        var _this6 = this;

        return new Promise(function (resolve) {
          var _this7 = this;

          _newArrowCheck(this, _this6);

          hideWidget(this.$el, function () {
            _newArrowCheck(this, _this7);

            this.$emit('update:visible', false);
            resolve();
          }.bind(this));
        }.bind(this));
      },
      onClickMask: function onClickMask() {
        var _this8 = this;

        if (this.maskClose) {
          this.hide().then(function (res) {
            _newArrowCheck(this, _this8);
          }.bind(this));
        }
      }
    }
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
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
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
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

    return _c("div", {
      staticClass: "bp-widget",
      on: {
        click: _vm.onClickMask
      }
    }, [_c("div", {
      staticClass: "bp-widget__content",
      "class": _vm.pageClass,
      style: _vm.pageStyle
    }, [_vm._t("default")], 2)]);
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

  //
  var script$1 = {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      widget: __vue_component__
    },
    props: {
      visible: Boolean,
      mask: {
        "default": true,
        type: Boolean
      },
      maskClose: Boolean,
      pageClass: String | Array,
      pageStyle: String | Array | Object,
      appendToBody: {
        "default": false,
        type: Boolean | String,
        validator: function validator(value) {
          return typeof value === 'boolean' || value === 'true' || value === 'false';
        }
      },
      showClose: {
        "default": true,
        type: Boolean
      },
      title: String
    },
    data: function data() {
      return {
        visibleReal: false,
        footClass: null
      };
    },
    watch: {
      visible: function visible(v) {
        this.visibleReal = v;
      },
      visibleReal: function visibleReal(v) {
        this.$emit('update:visible', v);
      }
    },
    beforeMount: function beforeMount() {
      this.visibleReal = this.visible;
      var foot = this.$slots['foot'];

      if (foot && foot[0] && foot[0].children) {
        var n = 0;

        for (var i = 0; i < foot[0].children.length; i++) {
          if (foot[0].children[i].tag) {
            n++;
          }
        }

        if (n == 1) {
          this.footClass = 'bp-dialog__footOneButton';
        } else if (n == 2) {
          this.footClass = 'bp-dialog__footTwoButton';
        } else if (n == 3) {
          this.footClass = 'bp-dialog__footThreeButton';
        }
      }
    },
    beforeDestroy: function beforeDestroy() {},
    mounted: function mounted() {},
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
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("widget", {
      ref: "widget",
      staticClass: "bp-dialog",
      attrs: {
        visible: _vm.visibleReal,
        maskClose: _vm.maskClose,
        mask: _vm.mask,
        pageClass: _vm.pageClass,
        pageStyle: _vm.pageStyle,
        appendToBody: _vm.appendToBody,
        preventEvent: true
      },
      on: {
        "update:visible": function updateVisible($event) {
          _vm.visibleReal = $event;
        }
      }
    }, [_vm.$slots["title"] ? _c("div", {
      staticClass: "bp-dialog__title bp-ellipsis",
      on: {
        click: function click($event) {
          $event.stopPropagation();
        }
      }
    }, [_vm._t("title")], 2) : _vm.title ? _c("div", {
      staticClass: "bp-dialog__title bp-ellipsis",
      on: {
        click: function click($event) {
          $event.stopPropagation();
        }
      }
    }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "bp-dialog__main",
      on: {
        click: function click($event) {
          $event.stopPropagation();
        }
      }
    }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots["foot"] ? _c("div", {
      staticClass: "bp-dialog__foot",
      "class": _vm.footClass,
      on: {
        click: function click($event) {
          $event.stopPropagation();
        }
      }
    }, [_vm._t("foot")], 2) : _vm._e(), _vm._v(" "), _vm.showClose ? _c("bp-icon", {
      staticClass: "bp-dialog__close",
      attrs: {
        name: "bp-dialog_close"
      },
      on: {
        click: function click($event) {
          $event.stopPropagation();

          _vm.hide().then(function (res) {});
        }
      }
    }) : _vm._e()], 1);
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

  //
  var script$2 = {
    components: {
      bpDialog: __vue_component__$1
    },
    data: function data() {
      return {
        title: '',
        content: '',
        okText: '确认'
      };
    }
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("bp-dialog", {
      attrs: {
        title: _vm.title,
        showClose: false
      }
    }, [_vm._v("\n  " + _vm._s(_vm.content) + "\n  "), _c("div", {
      attrs: {
        slot: "foot"
      },
      slot: "foot"
    }, [_c("button", {
      on: {
        click: function click($event) {
          return _vm.$emit("confirm");
        }
      }
    }, [_vm._v(_vm._s(_vm.okText))])])]);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

  //
  var script$3 = {
    components: {
      bpDialog: __vue_component__$1
    },
    data: function data() {
      return {
        title: '',
        content: '',
        okText: '确认',
        cancelText: '取消'
      };
    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("bp-dialog", {
      attrs: {
        title: _vm.title,
        showClose: false
      }
    }, [_vm._v("\n  " + _vm._s(_vm.content) + "\n  "), _c("div", {
      attrs: {
        slot: "foot"
      },
      slot: "foot"
    }, [_c("button", {
      staticStyle: {
        "font-weight": "500"
      },
      on: {
        click: function click($event) {
          return _vm.$emit("cancel");
        }
      }
    }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _c("button", {
      on: {
        click: function click($event) {
          return _vm.$emit("confirm");
        }
      }
    }, [_vm._v(_vm._s(_vm.okText))])])]);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

  //
  var script$4 = {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      widget: __vue_component__
    },
    data: function data() {
      return {
        content: ''
      };
    }
  };

  /* script */
  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("widget", {
      ref: "widget",
      staticClass: "bp-loading",
      attrs: {
        mask: false,
        preventEvent: true
      }
    }, [_c("div", {
      staticClass: "bp-loading__main"
    }, [_c("bp-icon", {
      attrs: {
        name: "loading"
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "bp-loading__text"
    }, [_vm._v("\n    " + _vm._s(_vm.content) + "\n  ")])]);
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

  //
  var script$5 = {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      widget: __vue_component__
    },
    data: function data() {
      return {
        content: '',
        icon: null
      };
    }
  };

  /* script */
  var __vue_script__$5 = script$5;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("widget", {
      ref: "widget",
      staticClass: "bp-toast",
      attrs: {
        mask: false,
        preventEvent: false,
        hideBodyScroll: false
      }
    }, [_c("div", [_vm.icon ? _c("div", {
      staticClass: "bp-toast__main"
    }, [_c("bp-icon", {
      attrs: {
        name: _vm.icon
      }
    })], 1) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "bp-toast__text"
    }, [_vm._v("\n      " + _vm._s(_vm.content) + "\n    ")])])]);
  };

  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;
  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

  function maskRouterChange(to, type) {
    var _this = this;

    removeAllApiModal();
    setTimeout(function () {
      _newArrowCheck(this, _this);

      // 查找
      var pageLen = $('.bp-navbarView_page').length;
      var dataMark = 'page' + pageLen;
      var masks = $(".bp-widget[data-mark='".concat(dataMark, "']"));

      if (masks.length == 0) {
        $('body').removeClass('bp-widget__fixscroll');
        $('html').css('padding-right', '');
      } else {
        for (var i = 0; i < masks.length; i++) {
          var mask0 = $(masks[i]);

          if (mask0.hasClass('bp-widget__mask') && mask0.hasClass('bp-widget__visible')) {
            // 还原当前页面的fixed状态.
            restoreFixedScroll(mask0);
            return;
          }
        }

        $('body').removeClass('bp-widget__fixscroll');
        $('html').css('padding-right', '');
      }
    }.bind(this), 800);
  }

  function init() {
    // register alias icon.
    bpLibs.icons.registerAliasIcon('bp-dialog_close', 'cancel'); // register default components.

    registerDialogComponents({
      alert: __vue_component__$2,
      confirm: __vue_component__$3,
      loading: __vue_component__$4,
      toast: __vue_component__$5
    }); // scroll.

    bpLibs.router.off('routeChanged', maskRouterChange).on('routeChanged', maskRouterChange);
  }

  init();
  var index = {
    init: init,
    VuePlugin: VuePlugin,
    hook: hook,
    registerDialogComponents: registerDialogComponents,
    registerDialogCustom: registerDialogCustom,
    apiWidget: apiWidget,
    bpDialog: __vue_component__$1,
    bpWidget: __vue_component__
  };

  return index;

})));
//# sourceMappingURL=index.js.map
