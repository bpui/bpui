/*!
 * bpui popover v1.1.25
 * Copyright (c) 2021 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@bpui/libs'), require('@bpui/dialog')) :
  typeof define === 'function' && define.amd ? define(['@bpui/libs', '@bpui/dialog'], factory) :
  (global = global || self, global.bpPopover = factory(global.bpLibs, global.bpDialog));
}(this, (function (bpLibs, bpDialog) { 'use strict';

  bpLibs = bpLibs && Object.prototype.hasOwnProperty.call(bpLibs, 'default') ? bpLibs['default'] : bpLibs;
  bpDialog = bpDialog && Object.prototype.hasOwnProperty.call(bpDialog, 'default') ? bpDialog['default'] : bpDialog;

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

  var document = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document) && isObject(document.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document.createElement(it) : {};
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

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
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

  var script = {
    components: {
      widget: bpDialog.bpWidget
    },
    props: {
      visible: Boolean,
      mask: {
        "default": false,
        type: Boolean
      },
      maskClose: {
        "default": true,
        type: Boolean
      },
      pageClass: String | Array,
      pageStyle: String | Array | Object,
      direction: {
        "default": 'auto',
        type: String
      },
      trigger: {
        type: String
      },
      bind: {
        "default": null,
        type: [String, Object, HTMLElement]
      }
    },
    computed: {
      pStyle: function pStyle() {
        if (this.pageStyle) {
          if (typeof this.pageStyle === 'string') {
            return "left:".concat(this.offsetLeft, ";top:").concat(this.offsetTop, ";") + this.pageStyle;
          } else {
            return _objectSpread2({
              left: this.offsetLeft,
              top: this.offsetTop
            }, this.pageStyle);
          }
        } else {
          return {
            left: this.offsetLeft,
            top: this.offsetTop
          };
        }
      }
    },
    data: function data() {
      return {
        visibleReal: false,
        directionData: 'auto',
        offsetTop: 0,
        offsetLeft: 0,
        offsetArrowLeft: null,
        offsetArrowTop: null,
        offsetArrowBottom: null,
        offsetArrowRight: null
      };
    },
    watch: {
      visible: function visible(v, oldV) {
        if (this.visibleReal != v) {
          this.visibleReal = v;

          if (v != oldV) {
            if (v) {
              this._onTriggerShow(null);
            } else {
              this._onTriggerHide(null);
            } // this._show(this.direction);
            // this._show('top');
            // this._show('bottom');
            // this._show('left');
            // this._show('right');

          }
        }
      },
      visibleReal: function visibleReal(v) {
        this.$emit('update:visible', v);
      },
      bind: function bind(v, oldV) {
        this._removeEvent(oldV);

        this._bindEvent(v);
      }
    },
    beforeMount: function beforeMount() {
      this.visibleReal = this.visible;
    },
    beforeDestroy: function beforeDestroy() {
      this._removeEvent(this.bind);

      var clickEventName = bpLibs.device.browserIsMobile() ? 'click' : 'mousedown';
      $('body').off(clickEventName, this._hide);
    },
    mounted: function mounted() {
      var _this = this;

      // $('body').off('click', this._hide).on('click', this._hide);
      // if (this.trigger) {
      //   let el = $(this.$el).parent();
      //   this._bindEvent(el);
      // }
      this.$nextTick(function () {
        var _this2 = this;

        _newArrowCheck(this, _this);

        this.$parent.$forceUpdate();
        this.$nextTick(function () {
          _newArrowCheck(this, _this2);

          if (!this.bind) {
            this._bindEvent(this.bind);
          }
        }.bind(this));
      }.bind(this));
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
      _removeEvent: function _removeEvent(v) {
        if (v) {
          var el;

          if (bpLibs.dom.isVueObject(v)) {
            el = v.$el;
          } else {
            el = v;
          }

          $(el).off('mouseover', this._onTriggerShow);
          $(el).off('mouseleave', this._onTriggerHide);
          $(el).off('click', this._onTriggerShow);

          if (this.ges) {
            this.ges.dispose();
            this.ges = null;
          }
        }
      },
      _bindEvent: function _bindEvent(v) {
        var _this3 = this;

        this._removeEvent(v);

        if (!v) {
          v = this.$parent;
        }

        if (v) {
          var el;

          if (bpLibs.dom.isVueObject(v)) {
            el = v.$el;
          } else {
            el = v;
          }

          if (this.trigger == 'hover') {
            if (bpLibs.device.browserIsMobile()) {
              $(el).on('click', this._onTriggerShow);
            } else {
              $(el).on('mouseover', this._onTriggerShow);
              $(el).on('mouseleave', this._onTriggerHide);
            }
          } else if (this.trigger == 'click') {
            var eventName = bpLibs.device.browserIsMobile() ? 'click' : 'click';
            $(el).off(eventName, this._onTriggerShow).on(eventName, this._onTriggerShow);
          } else if (this.trigger == 'long-press') {
            this.ges = new bpLibs.Gesture(el);
            this.ges.enablePressRecognizer({
              duration: 600
            });
            this.ges.on('press', function (ev) {
              _newArrowCheck(this, _this3);

              bpLibs.device.vibrate(10);

              this._onTriggerShow(ev);
            }.bind(this));
          }
        }
      },
      _onTriggerShow: function _onTriggerShow(ev) {
        var _this4 = this;

        var clickEventName = bpLibs.device.browserIsMobile() ? 'click' : 'mousedown';
        var closeHandleTimeout = 10;

        if (ev) {
          if (this.trigger == 'click') {
            if (this.visibleReal) {
              $('body').off(clickEventName, this._hide);

              this._hide();

              ev.stopPropagation();
              ev.preventDefault();
              ev.cancelBubble = true;
              return false;
            }
          }
        }

        this.visibleReal = true;
        setTimeout(function () {
          _newArrowCheck(this, _this4);

          $('body').off(clickEventName, this._hide).on(clickEventName, this._hide);
        }.bind(this), closeHandleTimeout);

        this._show(this.direction);
      },
      _onTriggerHide: function _onTriggerHide(e) {
        var main = $(this.$refs.main);
        var ev = e; // this.$timer.setTimeout(()=>{

        var mainOffset = bpLibs.dom.getElementOffset(main[0]); // in popover.

        if (ev && ev.clientX >= mainOffset.left - 14 && ev.clientX <= mainOffset.left + main[0].offsetWidth + 14 && ev.clientY >= mainOffset.top - 14 && ev.clientY <= mainOffset.top + main[0].offsetHeight + 14) {
          $(this.$refs.main).on('mouseleave', this._hideVisible);
        } else {
          this.visibleReal = false;
        }

        var clickEventName = bpLibs.device.browserIsMobile() ? 'click' : 'mousedown';
        $('body').off(clickEventName, this._hide); // }, 50);
      },
      _show: function _show(directionData) {
        var _this5 = this;

        var bind = this.bind;

        if (!this.bind) {
          bind = this.$parent;
        }

        var el;

        if (bpLibs.dom.isVueObject(bind)) {
          el = bind.$el;
        } else {
          el = bind;
        }

        var offset = bpLibs.dom.getElementOffset(el);
        var port = {};
        port.height = el.clientHeight;
        port.width = el.clientWidth;
        var viewPort = bpLibs.dom.getViewPort();
        var docOffset = bpLibs.dom.getDocumentOffset();
        this.offsetTop = offset.top + docOffset.top; // this.offsetLeft = offset.left;
        // directionData.

        if (directionData == 'top') {
          this.directionData = 'top';
          this.offsetTop -= 8;
        } else if (directionData == 'bottom') {
          this.directionData = 'bottom';
          this.offsetTop += port.height;
        } else if (directionData == 'left') {
          this.directionData = 'left';
          this.offsetLeft = offset.left + port.width;
        } else if (directionData == 'right') {
          this.directionData = 'right';
          this.offsetLeft = offset.left + port.width;
        } else {
          if (offset.top + port.height / 2 > viewPort.height / 2) {
            directionData = 'top';
            this.directionData = 'top';
            this.offsetTop -= 8;
          } else {
            directionData = 'bottom';
            this.directionData = 'bottom';
            this.offsetTop += port.height;
          }
        }

        this.offsetTop = parseInt(this.offsetTop); // arrow.

        var arrowOffset;

        if (directionData == 'left' || directionData == 'right') {
          arrowOffset = parseInt(offset.top + port.height / 2);
        } else {
          arrowOffset = parseInt(offset.left + port.width / 2);
        }

        var SCREEN_PADDING = 10;
        var main = this.$refs.main;
        bpLibs.dom.probeDom(400, function () {
          _newArrowCheck(this, _this5);

          return main.clientWidth > 0;
        }.bind(this), function () {
          _newArrowCheck(this, _this5);

          if (directionData == 'left' || directionData == 'right') {
            var mainOffset = parseInt(arrowOffset - main.clientHeight / 2);

            if (mainOffset < SCREEN_PADDING) {
              mainOffset = SCREEN_PADDING;
            }

            if (mainOffset + main.clientHeight > viewPort.height - SCREEN_PADDING) {
              mainOffset = viewPort.height - SCREEN_PADDING - main.clientHeight;
            }

            this.offsetTop = parseInt(mainOffset + docOffset.top) + 'px';
            this.offsetLeft = directionData == 'right' ? offset.left + port.width + 6 : offset.left - main.clientWidth - 6 - 6;
            this.offsetLeft += docOffset.left;
            this.offsetLeft = parseInt(this.offsetLeft);
            this.offsetLeft += 'px';
            this.offsetArrowLeft = null;
            this.offsetArrowBottom = null;
            this.offsetArrowTop = parseInt(arrowOffset - mainOffset - 6);

            if (this.offsetArrowTop < 10) {
              this.offsetArrowTop = 10;
            } else if (this.offsetArrowTop > main.clientHeight - 22) {
              this.offsetArrowTop = parseInt(main.clientHeight - 22);
            }

            this.offsetArrowTop += 'px';
            this.offsetArrowRight = null;
          } else {
            var cw = parseInt(main.clientWidth || 50);
            var ch = parseInt(main.clientHeight || 50);

            if (directionData == 'top') {
              this.offsetTop -= ch + 6;
            }

            this.offsetTop += 'px';

            var _mainOffset = parseInt(arrowOffset - cw / 2);

            if (_mainOffset < SCREEN_PADDING) {
              _mainOffset = SCREEN_PADDING;
            }

            if (_mainOffset + cw > viewPort.width - SCREEN_PADDING) {
              _mainOffset = viewPort.width - SCREEN_PADDING - cw;
            }

            this.offsetLeft = parseInt(_mainOffset) + 'px';
            this.offsetArrowLeft = parseInt(arrowOffset - _mainOffset) - 6;

            if (this.offsetArrowLeft < 10) {
              this.offsetArrowLeft = 10;
            } else if (this.offsetArrowLeft > cw - 22) {
              this.offsetArrowLeft = cw - 22;
            }

            this.offsetArrowLeft += 'px';
            this.offsetArrowBottom = null;
            this.offsetArrowTop = null;
            this.offsetArrowRight = null;
          }
        }.bind(this));
      },
      _hide: function _hide(e) {
        var _this6 = this;

        var clickEventName = bpLibs.device.browserIsMobile() ? 'click' : 'mousedown';
        $('body').off(clickEventName, this._hide);
        this.hide().then(function (res) {
          _newArrowCheck(this, _this6);
        }.bind(this));
      },
      _hideVisible: function _hideVisible(ev) {
        $(this.$refs.main).off('mouseleave', this._hideVisible);

        if (ev) {
          var el;

          if (bpLibs.dom.isVueObject(this.bind)) {
            el = this.bind.$el;
          } else {
            el = this.bind;

            if (typeof el === 'string') {
              el = $(el)[0];
            }
          }

          var mainOffset = bpLibs.dom.getElementOffset(el); // in popover.

          if (ev.clientX >= mainOffset.left - 14 && ev.clientX <= mainOffset.left + el.offsetWidth + 14 && ev.clientY >= mainOffset.top - 14 && ev.clientY <= mainOffset.top + el.offsetHeight + 14) {
            return;
          } // if (ev.toElement.isSameNode(el)) {
          //   return;
          // }

        }

        this.visibleReal = false;
      }
    }
  };

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

    return _c("widget", {
      ref: "widget",
      staticClass: "bp-popover",
      attrs: {
        visible: _vm.visibleReal,
        maskClose: _vm.maskClose,
        mask: _vm.mask,
        preventEvent: false,
        hideBodyScroll: false,
        appendToBody: true
      },
      on: {
        "update:visible": function updateVisible($event) {
          _vm.visibleReal = $event;
        }
      }
    }, [_c("div", {
      ref: "main",
      staticClass: "bp-popover__main",
      "class": _vm.pageClass,
      style: _vm.pStyle,
      attrs: {
        direction: _vm.directionData
      }
    }, [_vm._t("default"), _vm._v(" "), _c("div", {
      staticClass: "bp-popover__arrow",
      style: {
        left: _vm.offsetArrowLeft,
        top: _vm.offsetArrowTop,
        right: _vm.offsetArrowRight,
        bottom: _vm.offsetArrowBottom
      }
    })], 2)]);
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

  var index = {
    bpPopover: __vue_component__
  };

  return index;

})));
//# sourceMappingURL=index.js.map
