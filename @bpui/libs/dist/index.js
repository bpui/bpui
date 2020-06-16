/*!
 * bpui libs v0.2.8
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('febs-browser')) :
	typeof define === 'function' && define.amd ? define(['febs-browser'], factory) :
	(global = global || self, global.bpLibs = factory(global.febs));
}(this, (function (febs) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

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
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
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
	// https://tc39.github.io/ecma262/#sec-toprimitive
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

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
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

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
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

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
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
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
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

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
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
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
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
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
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
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
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
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

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
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
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
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

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

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

	var max$1 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
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
	      actualDeleteCount = min$2(max$1(toInteger(deleteCount), 0), len - actualStart);
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

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
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
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
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

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

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

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
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

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$2 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
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
	      re.constructor[SPECIES$2] = function () { return re; };
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
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
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
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
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

	var max$2 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

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
	        var position = max$2(min$3(toInteger(result.index), S.length), 0);
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

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
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
	  }
	});

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
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
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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
	}, !SUPPORTS_Y);

	function parseUrl(search) {
	  var query = {};
	  var searchs = search.length == 0 ? [] : search.split('&');

	  for (var i = 0; i < searchs.length; i++) {
	    if (!febs.string.isEmpty(searchs[i])) {
	      var v = searchs[i].split('=');

	      if (!febs.string.isEmpty(v[0])) {
	        var v0 = decodeURIComponent(v[0]);
	        var v1 = febs.string.isEmpty(v[1]) ? '' : decodeURIComponent(v[1]);
	        query[v0] = v1;
	      }
	    }
	  }

	  return query;
	}
	function stringifyUrl(pathname, query) {
	  if (query) {
	    var q = '';

	    for (var key in query) {
	      var element = query[key];
	      if (q.length > 0) q += '&';
	      q += encodeURIComponent(key) + '=' + encodeURIComponent(element);
	    }

	    if (q.length > 0) {
	      var npos = pathname.indexOf('?');

	      if (npos < 0) {
	        pathname += '?' + q;
	      } else if (npos == pathname.length - 1) {
	        pathname += q;
	      } else {
	        pathname += '&' + q;
	      }
	    }
	  }

	  return pathname;
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

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it;

	  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = o[Symbol.iterator]();
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	/**
	* @desc: 获得无文件名的path.
	* @description
	            如 /xxx/index.html -> /xxx/
	            如 /xxx/ -> /xxx/
	            如 /xxx -> /xxx
	*/

	function getCurrentPathnameNoFile() {
	  var path = window.location.pathname;
	  var paths = path.split('/');
	  var n = paths[paths.length - 1];

	  if (n.indexOf('.') >= 0) {
	    return path.substr(0, path.length - n.length);
	  } else {
	    return path;
	  }
	}
	/**
	* @desc: 获得有文件名的path.
	*/

	function getCurrentPathname() {
	  return window.location.pathname;
	}
	/**
	* @desc: 获得pathname.
	*/

	function getPathname(basePath, routerPath) {
	  if (routerPath.indexOf('./') == 0) {
	    return basePath + routerPath.substr(2);
	  } else if (routerPath[0] == '/') {
	    return basePath + routerPath.substr(1);
	  } else {
	    return basePath + routerPath;
	  }
	}
	/**
	* @desc: 获得无文件名(location.pathname上的文件名)路由
	* @description
	            如 /base/xxx/index.html -> /xxx
	            如 /base/xxx/ -> /xxx
	            如 /base/xxx -> /xxx
	*/

	function getRoutePathNoFile(basePath, routerPath) {
	  if (!febs.string.isEmpty(routerPath)) {
	    if (routerPath[0] == '/') {
	      return routerPath;
	    } else if (routerPath.indexOf('./') == 0) {
	      routerPath = routerPath.substr(2);
	    }
	  } else {
	    routerPath = '';
	  }

	  var path = getCurrentPathnameNoFile();

	  if (routerPath.length > 0) {
	    if (path[path.length - 1] == '/') {
	      path += routerPath;
	    } else {
	      path += '/' + routerPath;
	    }
	  }

	  if (path[path.length - 1] != '/') path += '/';

	  if (basePath != '/' && path.indexOf(basePath) == 0) {
	    path = path.substr(basePath.length);
	    path = '/' + path;
	  }

	  if (path.length > 1 && path[path.length - 1] == '/') {
	    path = path.substr(0, path.length - 1);
	  }

	  return path;
	}
	/**
	* @desc: 获得有文件名路由
	* @description
	            如 /base/xxx/index.html -> /xxx/index.html
	            如 /base/xxx/ -> /xxx
	            如 /base/xxx -> /xxx
	*/

	function getCurrentRoutePath(basePath) {
	  var path = getCurrentPathname();

	  if (basePath != '/' && path.indexOf(basePath) == 0) {
	    path = '/' + path.substr(basePath.length);
	  }

	  if (path.length > 1 && path[path.length - 1] == '/') {
	    path = path.substr(0, path.length - 1);
	  }

	  return path;
	}

	// const GlobalRouterBase = Symbol('$BpGlobalRouterBase');
	// const GlobalRouter404 = Symbol('$BpGlobalRouter404');

	var GlobalRouter = '$BpGlobalRouter';
	var GlobalRouterBase = '$BpGlobalRouterBase';
	var GlobalRouter404 = '$BpGlobalRouter404';
	/**
	* @desc: 注册app.
	*/

	function registerApp(routes, basePath) {
	  if (!window[GlobalRouter]) {
	    window[GlobalRouter] = [];
	  }

	  if (window[GlobalRouter].indexOf(routes) < 0) {
	    window[GlobalRouter].push(routes);
	  }

	  if (!febs.string.isEmpty(basePath)) {
	    if (basePath[0] != '/') {
	      basePath = '/' + basePath;
	    }

	    if (basePath[basePath.length - 1] != '/') {
	      basePath = basePath + '/';
	    }
	  } else {
	    basePath = '/';
	  }

	  window[GlobalRouterBase] = basePath; //
	  // 404.

	  for (var i = 0; i < window[GlobalRouter].length; i++) {
	    var routes_1 = window[GlobalRouter][i];

	    for (var j = 0; j < routes_1.length; j++) {
	      if (routes_1[j].path == '*') {
	        window[GlobalRouter404] = routes_1[j].component;
	        break;
	      }
	    }
	  }
	}
	function getBasePath() {
	  return window[GlobalRouterBase];
	}
	/**
	* @desc: 获得路由.
	*/

	function getMatchedComponent(location, onLoad, onError) {
	  if (!window[GlobalRouter]) {
	    window[GlobalRouter] = [];
	  }

	  var noFileRouter = getRoutePathNoFile(getBasePath(), location.path);

	  var _loop_1 = function _loop_1(i) {
	    var routes = window[GlobalRouter][i];

	    var _loop_2 = function _loop_2(j) {
	      if (routes[j].path == noFileRouter) {
	        if (routes[j].component) {
	          onLoad(routes[j].component, function (component) {
	            routes[j].component = component;
	          });
	        } else {
	          if (onError) onError(new Error("cannot find component: " + routes[j].path));
	        }

	        return {
	          value: void 0
	        };
	      }
	    };

	    for (var j = 0; j < routes.length; j++) {
	      var state_2 = _loop_2(j);

	      if (_typeof(state_2) === "object") return state_2;
	    }
	  };

	  for (var i = 0; i < window[GlobalRouter].length; i++) {
	    var state_1 = _loop_1(i);

	    if (_typeof(state_1) === "object") return state_1.value;
	  } // 404.


	  if (window[GlobalRouter404]) {
	    onLoad(window[GlobalRouter404], function (component) {
	      window[GlobalRouter404] = component;
	    });
	  }

	  return null;
	}

	var InstanceOnRoute = '$BpInstanceOnRoute'; //--------------------------------------------------------
	// class of Router
	//--------------------------------------------------------

	var Html5History =
	/** @class */
	function () {
	  function Html5History() {}

	  Object.defineProperty(Html5History.prototype, "pageLength", {
	    /**
	     * 历史记录长度.
	     */
	    get: function get() {
	      return window.history.length;
	    },
	    enumerable: false,
	    configurable: true
	  });
	  Object.defineProperty(Html5History.prototype, "basePath", {
	    /**
	     * basePath
	     */
	    get: function get() {
	      return getBasePath();
	    },
	    enumerable: false,
	    configurable: true
	  });
	  Object.defineProperty(Html5History.prototype, "currentRoute", {
	    /**
	     * 当前的路由信息.
	     */
	    get: function get() {
	      var search = window.location.search || '';

	      if (search[0] == '?') {
	        search = search.substr(1);
	      }

	      var query = parseUrl(search);
	      var path = getRoutePathNoFile(this.basePath);
	      return {
	        path: path,
	        query: query,
	        state: window.history.state ? febs.utils.mergeMap(window.history.state) : null
	      };
	    },
	    enumerable: false,
	    configurable: true
	  });
	  /**
	   * 路由控制.
	   */

	  Html5History.prototype.push = function (path, trigger) {
	    var _this = this;

	    if (trigger === void 0) {
	      trigger = true;
	    }

	    var l;

	    if (typeof path === 'string') {
	      l = {
	        path: path
	      };
	    } else {
	      l = path;
	    }

	    var srcPath = l.path;
	    l.path = stringifyUrl(l.path, l.query);
	    l.path = getPathname(this.basePath, l.path);
	    window.history.pushState(l.state, null, l.path);

	    if (trigger) {
	      var location_1 = {
	        path: srcPath,
	        query: l.query,
	        state: l.state
	      };
	      setTimeout(function () {
	        _this._triggerRouteChanged(location_1, null);
	      }, 0);
	    }
	  };

	  Html5History.prototype.replace = function (path, trigger) {
	    var _this = this;

	    if (trigger === void 0) {
	      trigger = true;
	    }

	    var l;

	    if (typeof path === 'string') {
	      l = {
	        path: path
	      };
	    } else {
	      l = path;
	    }

	    var srcPath = l.path;
	    l.path = stringifyUrl(l.path, l.query);
	    l.path = getPathname(this.basePath, l.path);
	    window.history.replaceState(l.state, null, l.path);

	    if (trigger) {
	      var location_2 = {
	        path: srcPath,
	        query: l.query,
	        state: l.state
	      };
	      setTimeout(function () {
	        _this._triggerRouteChanged(location_2, 1);
	      }, 0);
	    }
	  };

	  Html5History.prototype.back = function () {
	    window.history.back();
	  };

	  Html5History.prototype.forward = function () {
	    window.history.forward();
	  };

	  Html5History.prototype.go = function (n) {
	    window.history.go(n);
	  };
	  /**
	   * 获得对应location的一个页面组件. (返回的是组件类, 而非创建出来的实例)
	   */


	  Html5History.prototype.getMatchedComponent = function (location,
	  /** 加载完成. */
	  onLoad,
	  /** 匹配不到指定的路由组件. */
	  onError) {
	    return getMatchedComponent(location, onLoad, onError);
	  };
	  /**
	   * 路由改变事件.
	   */


	  Html5History.prototype.on = function (eventType, handler) {
	    var _this = this;

	    if (eventType == 'routeChanged') {
	      if (!window[InstanceOnRoute]) {
	        window[InstanceOnRoute] = [];
	        window.addEventListener('popstate', function () {
	          var query = parseUrl(window.location.search);
	          var location = {
	            path: getCurrentRoutePath(_this.basePath),
	            query: febs.utils.mergeMap(query),
	            state: history.state
	          };

	          _this._triggerRouteChanged(location, null);
	        });
	      }

	      window[InstanceOnRoute].push(handler);
	    }

	    return this;
	  };

	  Html5History.prototype.off = function (eventType, handler) {
	    if (eventType == 'routeChanged') {
	      if (window[InstanceOnRoute]) {
	        var i = window[InstanceOnRoute].indexOf(handler);

	        if (i >= 0) {
	          window[InstanceOnRoute].splice(i, 1);
	        }
	      }
	    }

	    return this;
	  };

	  Html5History.prototype._triggerRouteChanged = function (location, type) {
	    if (window[InstanceOnRoute]) {
	      var listeners = window[InstanceOnRoute];

	      for (var i = 0; i < listeners.length; i++) {
	        listeners[i]({
	          path: location.path,
	          query: febs.utils.mergeMap(location.query),
	          state: febs.utils.mergeMap(location.state)
	        }, type);
	      }
	    }
	  };

	  return Html5History;
	}();

	var router = new Html5History();

	/**
	* @desc: 判断是否是vue对象.
	* @return: 
	*/

	function isVueObject(obj) {
	  if (obj && _typeof(obj) === 'object' && obj._isVue) return true;else return false;
	}
	/**
	* @desc: Component 是import的, 未创建.
	* @return: 
	*/


	function isVueComponent(obj) {
	  if (obj && _typeof(obj) === 'object' && typeof obj.render === 'function' && obj._compiled) {
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
	    } // vue. 
	    else if (isVueObject(obj)) {
	        obj = $(obj.$el);
	        obj = $('div').append(obj);
	        obj = obj.html();
	      } // string.
	      else if (typeof obj !== 'string') {
	          throw new Error('getDomHtmlString obj only can be vue object, Dom or string');
	        }
	  }

	  return obj;
	}

	var isHtmlDom = febs.dom.isDom;
	var getViewPort = febs.dom.getViewPort;
	var getDocumentPort = febs.dom.getDocumentPort;
	var getDocumentOffset = febs.dom.getDocumentOffset;
	var getElementOffset = febs.dom.getElementOffset;
	var addEventListener = febs.dom.addEventListener;
	var removeEventListener = febs.dom.removeEventListener; // function probeDom(maxTime:Number, condition:()=>boolean) {

	function probeDom(maxTime, condition, stop, start_at) {
	  if (!start_at) {
	    start_at = Date.now();
	  } else if (Date.now() - start_at >= maxTime) {
	    if (stop) {
	      stop();
	    }

	    return;
	  }

	  if (condition) {
	    requestAnimationFrame(function () {
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

	var dom = /*#__PURE__*/Object.freeze({
		__proto__: null,
		isVueObject: isVueObject,
		isVueComponent: isVueComponent,
		isHtmlDom: isHtmlDom,
		getDomHtmlString: getDomHtmlString,
		getViewPort: getViewPort,
		getDocumentPort: getDocumentPort,
		getDocumentOffset: getDocumentOffset,
		getElementOffset: getElementOffset,
		addEventListener: addEventListener,
		removeEventListener: removeEventListener,
		probeDom: probeDom
	});

	/**
	* @desc: 震动.
	*/

	function vibrate(pattern) {
	  if (navigator) {
	    var _vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

	    if (!_vibrate && __debug) {
	      console.log("vibrate not supported");
	    }

	    navigator.vibrate(pattern);
	  }
	}
	/**
	 * @desc: the browser is mobile.
	 */


	var browserIsMobile = febs.utils.browserIsMobile;
	/**
	 * @desc: the browser is ios.
	 */

	var browserIsIOS = febs.utils.browserIsIOS;
	/**
	 * @desc: the browser is phone.
	 */

	var browserIsPhone = febs.utils.browserIsPhone;
	/**
	 * @desc: the browser is weixin.
	 */

	var browserIsWeixin = febs.utils.browserIsWeixin;
	/**
	 * @desc: 判断是否是ie.
	 */

	var browserIsIE = febs.utils.browserIsIE;
	/**
	 * @desc: 判断ie版本号.
	 * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
	 *        如果是 edge 返回 'edge'
	 */

	var browserIEVer = febs.utils.browserIEVer;
	/**
	 * @desc: the browser is support html5.
	 */

	var browserIsSupportHtml5 = febs.utils.browserIsSupportHtml5;

	var device = /*#__PURE__*/Object.freeze({
		__proto__: null,
		vibrate: vibrate,
		browserIsMobile: browserIsMobile,
		browserIsIOS: browserIsIOS,
		browserIsPhone: browserIsPhone,
		browserIsWeixin: browserIsWeixin,
		browserIsIE: browserIsIE,
		browserIEVer: browserIEVer,
		browserIsSupportHtml5: browserIsSupportHtml5
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
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

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

	var SPECIES$4 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$4]) {
	    defineProperty(Constructor, SPECIES$4, {
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

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

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
	  // eslint-disable-next-line no-throw-literal
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

	var html = getBuiltIn('document', 'documentElement');

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

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
	  // eslint-disable-next-line no-prototype-builtins
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
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process$1) == 'process') {
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
	    !fails(post) &&
	    location.protocol !== 'file:'
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

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$2) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$2.domain)) parent.exit();
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

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
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

	// 25.4.1.5 NewPromiseCapability(C)
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

	var task$1 = task.set;










	var SPECIES$5 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$5] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
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
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
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
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
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
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
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
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
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
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
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
	      iterate_1(iterable, function (promise) {
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
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var Timer = /*#__PURE__*/function () {
	  function Timer() {
	    _classCallCheck(this, Timer);

	    this._timeoutList = [];
	    this._requestAniList = [];
	    this._intervalList = [];
	  }

	  _createClass(Timer, [{
	    key: "dispose",
	    value: function dispose() {
	      this.clearAll();
	    }
	    /**
	    * @desc: Promise方式计时器.(会在对象释放前安全停止)
	    * @return: Promise
	    */

	  }, {
	    key: "sleep",
	    value: function sleep(ms) {
	      var ctx = this;
	      return new Promise(function (resolve, reject) {
	        try {
	          if (ms >= 0) {
	            var timer = setTimeout(function () {
	              var i = ctx._timeoutList.indexOf(timer);

	              if (i >= 0) ctx._timeoutList.splice(i, 1);
	              resolve();
	            }, ms);

	            ctx._timeoutList.push(timer);
	          } else {
	            resolve();
	          }
	        } catch (err) {
	          reject(err);
	        }
	      });
	    }
	    /**
	    * @desc: 启动计时器.
	    */

	  }, {
	    key: "setTimeout",
	    value: function (_setTimeout) {
	      function setTimeout(_x, _x2) {
	        return _setTimeout.apply(this, arguments);
	      }

	      setTimeout.toString = function () {
	        return _setTimeout.toString();
	      };

	      return setTimeout;
	    }(function (fn, tm) {
	      var ctx = this;
	      var t = setTimeout(function () {
	        fn();

	        var i = ctx._timeoutList.indexOf(t);

	        if (i >= 0) ctx._timeoutList.splice(i, 1);
	      }, tm);
	      if (t) this._timeoutList.push(t);
	      return t;
	    })
	    /**
	    * @desc: 清除计时器.
	    */

	  }, {
	    key: "clearTimeout",
	    value: function (_clearTimeout) {
	      function clearTimeout(_x3) {
	        return _clearTimeout.apply(this, arguments);
	      }

	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };

	      return clearTimeout;
	    }(function (t) {
	      if (!t) return;
	      clearTimeout(t);

	      var i = this._timeoutList.indexOf(t);

	      if (i >= 0) this._timeoutList.splice(i, 1);
	    })
	    /**
	    * @desc: 启动计时器.
	    */

	  }, {
	    key: "setInterval",
	    value: function (_setInterval) {
	      function setInterval(_x4, _x5) {
	        return _setInterval.apply(this, arguments);
	      }

	      setInterval.toString = function () {
	        return _setInterval.toString();
	      };

	      return setInterval;
	    }(function (fn, tm) {
	      var t = setInterval(function () {
	        fn();
	      }, tm);
	      if (t) this._intervalList.push(t);
	      return t;
	    })
	    /**
	    * @desc: 清除计时器.
	    */

	  }, {
	    key: "clearInterval",
	    value: function (_clearInterval) {
	      function clearInterval(_x6) {
	        return _clearInterval.apply(this, arguments);
	      }

	      clearInterval.toString = function () {
	        return _clearInterval.toString();
	      };

	      return clearInterval;
	    }(function (t) {
	      if (!t) return;
	      clearInterval(t);

	      var i = this._intervalList.indexOf(t);

	      if (i >= 0) this._intervalList.splice(i, 1);
	    })
	    /**
	    * @desc: 启动帧动画.
	    */

	  }, {
	    key: "requestAnimationFrame",
	    value: function (_requestAnimationFrame) {
	      function requestAnimationFrame(_x7) {
	        return _requestAnimationFrame.apply(this, arguments);
	      }

	      requestAnimationFrame.toString = function () {
	        return _requestAnimationFrame.toString();
	      };

	      return requestAnimationFrame;
	    }(function (fn) {
	      if (!fn) return null;
	      var ctx = this;
	      var t = requestAnimationFrame(function (tm) {
	        fn(tm);

	        var i = ctx._requestAniList.indexOf(t);

	        if (i >= 0) ctx._requestAniList.splice(i, 1);
	      });
	      if (t) this._requestAniList.push(t);
	      return t;
	    })
	    /**
	    * @desc: 清除帧动画.
	    */

	  }, {
	    key: "cancelAnimationFrame",
	    value: function (_cancelAnimationFrame) {
	      function cancelAnimationFrame(_x8) {
	        return _cancelAnimationFrame.apply(this, arguments);
	      }

	      cancelAnimationFrame.toString = function () {
	        return _cancelAnimationFrame.toString();
	      };

	      return cancelAnimationFrame;
	    }(function (t) {
	      if (!t) return;
	      cancelAnimationFrame(t);

	      var i = this._requestAniList.indexOf(t);

	      if (i >= 0) this._requestAniList.splice(i, 1);
	    })
	    /**
	    * @desc: 清除所有计时器.
	    */

	  }, {
	    key: "clearAllTimeout",
	    value: function clearAllTimeout() {
	      var _iterator = _createForOfIteratorHelper(this._timeoutList),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var t = _step.value;

	          if (t) {
	            clearTimeout(t);
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      this._timeoutList = [];
	    }
	    /**
	    * @desc: 清除所有计时器.
	    */

	  }, {
	    key: "clearAllInterval",
	    value: function clearAllInterval() {
	      var _iterator2 = _createForOfIteratorHelper(this._intervalList),
	          _step2;

	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var t = _step2.value;

	          if (t) {
	            clearInterval(t);
	          }
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }

	      this._intervalList = [];
	    }
	    /**
	    * @desc: 清除所有帧动画.
	    */

	  }, {
	    key: "clearAllAnimationFrame",
	    value: function clearAllAnimationFrame() {
	      var _iterator3 = _createForOfIteratorHelper(this._requestAniList),
	          _step3;

	      try {
	        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	          var t = _step3.value;

	          if (t) {
	            Timer.cancelAnimationFrame(t);
	          }
	        }
	      } catch (err) {
	        _iterator3.e(err);
	      } finally {
	        _iterator3.f();
	      }

	      this._requestAniList = [];
	    }
	    /**
	    * @desc: 清除所有计时器与帧动画.
	    */

	  }, {
	    key: "clearAll",
	    value: function clearAll() {
	      this.clearAllTimeout();
	      this.clearAllAnimationFrame();
	      this.clearAllInterval();
	    }
	  }]);

	  return Timer;
	}();

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

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
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

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
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
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
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

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
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

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

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

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var defineProperty$2 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$2 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$2(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$2(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var charAt$1 = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$1(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6)
	};

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD$1 || !USES_TO_LENGTH$3) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$6 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$3 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$6];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$3(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

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
	var STRICT_METHOD$3 = arrayMethodIsStrict('sort');

	var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$3;

	// `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED$2 }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var nativeAssign = Object.assign;
	var defineProperty$3 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$3({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$3(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
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
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype$1.forEach = arrayForEach;
	  }
	}

	var hammer = createCommonjsModule(function (module) {
	  /*! Hammer.JS - v2.0.7 - 2016-04-22
	   * http://hammerjs.github.io/
	   *
	   * Copyright (c) 2016 Jorik Tangelder;
	   * Licensed under the MIT license */
	  (function (window, document, exportName, undefined$1) {

	    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	    var TEST_ELEMENT = document.createElement('div');
	    var TYPE_FUNCTION = 'function';
	    var round = Math.round;
	    var abs = Math.abs;
	    var now = Date.now;
	    /**
	     * set a timeout with a given scope
	     * @param {Function} fn
	     * @param {Number} timeout
	     * @param {Object} context
	     * @returns {number}
	     */

	    function setTimeoutContext(fn, timeout, context) {
	      return setTimeout(bindFn(fn, context), timeout);
	    }
	    /**
	     * if the argument is an array, we want to execute the fn on each entry
	     * if it aint an array we don't want to do a thing.
	     * this is used by all the methods that accept a single and array argument.
	     * @param {*|Array} arg
	     * @param {String} fn
	     * @param {Object} [context]
	     * @returns {Boolean}
	     */


	    function invokeArrayArg(arg, fn, context) {
	      if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	      }

	      return false;
	    }
	    /**
	     * walk objects and arrays
	     * @param {Object} obj
	     * @param {Function} iterator
	     * @param {Object} context
	     */


	    function each(obj, iterator, context) {
	      var i;

	      if (!obj) {
	        return;
	      }

	      if (obj.forEach) {
	        obj.forEach(iterator, context);
	      } else if (obj.length !== undefined$1) {
	        i = 0;

	        while (i < obj.length) {
	          iterator.call(context, obj[i], i, obj);
	          i++;
	        }
	      } else {
	        for (i in obj) {
	          obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	      }
	    }
	    /**
	     * wrap a method with a deprecation warning and stack trace
	     * @param {Function} method
	     * @param {String} name
	     * @param {String} message
	     * @returns {Function} A new function wrapping the supplied method.
	     */


	    function deprecate(method, name, message) {
	      var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	      return function () {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	        var log = window.console && (window.console.warn || window.console.log);

	        if (log) {
	          log.call(window.console, deprecationMessage, stack);
	        }

	        return method.apply(this, arguments);
	      };
	    }
	    /**
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} target
	     * @param {...Object} objects_to_assign
	     * @returns {Object} target
	     */


	    var assign;

	    if (typeof Object.assign !== 'function') {
	      assign = function assign(target) {
	        if (target === undefined$1 || target === null) {
	          throw new TypeError('Cannot convert undefined or null to object');
	        }

	        var output = Object(target);

	        for (var index = 1; index < arguments.length; index++) {
	          var source = arguments[index];

	          if (source !== undefined$1 && source !== null) {
	            for (var nextKey in source) {
	              if (source.hasOwnProperty(nextKey)) {
	                output[nextKey] = source[nextKey];
	              }
	            }
	          }
	        }

	        return output;
	      };
	    } else {
	      assign = Object.assign;
	    }
	    /**
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} dest
	     * @param {Object} src
	     * @param {Boolean} [merge=false]
	     * @returns {Object} dest
	     */


	    var extend = deprecate(function extend(dest, src, merge) {
	      var keys = Object.keys(src);
	      var i = 0;

	      while (i < keys.length) {
	        if (!merge || merge && dest[keys[i]] === undefined$1) {
	          dest[keys[i]] = src[keys[i]];
	        }

	        i++;
	      }

	      return dest;
	    }, 'extend', 'Use `assign`.');
	    /**
	     * merge the values from src in the dest.
	     * means that properties that exist in dest will not be overwritten by src
	     * @param {Object} dest
	     * @param {Object} src
	     * @returns {Object} dest
	     */

	    var merge = deprecate(function merge(dest, src) {
	      return extend(dest, src, true);
	    }, 'merge', 'Use `assign`.');
	    /**
	     * simple class inheritance
	     * @param {Function} child
	     * @param {Function} base
	     * @param {Object} [properties]
	     */

	    function inherit(child, base, properties) {
	      var baseP = base.prototype,
	          childP;
	      childP = child.prototype = Object.create(baseP);
	      childP.constructor = child;
	      childP._super = baseP;

	      if (properties) {
	        assign(childP, properties);
	      }
	    }
	    /**
	     * simple function bind
	     * @param {Function} fn
	     * @param {Object} context
	     * @returns {Function}
	     */


	    function bindFn(fn, context) {
	      return function boundFn() {
	        return fn.apply(context, arguments);
	      };
	    }
	    /**
	     * let a boolean value also be a function that must return a boolean
	     * this first item in args will be used as the context
	     * @param {Boolean|Function} val
	     * @param {Array} [args]
	     * @returns {Boolean}
	     */


	    function boolOrFn(val, args) {
	      if (_typeof(val) == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
	      }

	      return val;
	    }
	    /**
	     * use the val2 when val1 is undefined
	     * @param {*} val1
	     * @param {*} val2
	     * @returns {*}
	     */


	    function ifUndefined(val1, val2) {
	      return val1 === undefined$1 ? val2 : val1;
	    }
	    /**
	     * addEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */


	    function addEventListeners(target, types, handler) {
	      each(splitStr(types), function (type) {
	        target.addEventListener(type, handler, false);
	      });
	    }
	    /**
	     * removeEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */


	    function removeEventListeners(target, types, handler) {
	      each(splitStr(types), function (type) {
	        target.removeEventListener(type, handler, false);
	      });
	    }
	    /**
	     * find if a node is in the given parent
	     * @method hasParent
	     * @param {HTMLElement} node
	     * @param {HTMLElement} parent
	     * @return {Boolean} found
	     */


	    function hasParent(node, parent) {
	      while (node) {
	        if (node == parent) {
	          return true;
	        }

	        node = node.parentNode;
	      }

	      return false;
	    }
	    /**
	     * small indexOf wrapper
	     * @param {String} str
	     * @param {String} find
	     * @returns {Boolean} found
	     */


	    function inStr(str, find) {
	      return str.indexOf(find) > -1;
	    }
	    /**
	     * split string on whitespace
	     * @param {String} str
	     * @returns {Array} words
	     */


	    function splitStr(str) {
	      return str.trim().split(/\s+/g);
	    }
	    /**
	     * find if a array contains the object using indexOf or a simple polyFill
	     * @param {Array} src
	     * @param {String} find
	     * @param {String} [findByKey]
	     * @return {Boolean|Number} false when not found, or the index
	     */


	    function inArray(src, find, findByKey) {
	      if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	      } else {
	        var i = 0;

	        while (i < src.length) {
	          if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	            return i;
	          }

	          i++;
	        }

	        return -1;
	      }
	    }
	    /**
	     * convert array-like objects to real arrays
	     * @param {Object} obj
	     * @returns {Array}
	     */


	    function toArray(obj) {
	      return Array.prototype.slice.call(obj, 0);
	    }
	    /**
	     * unique array with objects based on a key (like 'id') or just by the array's value
	     * @param {Array} src [{id:1},{id:2},{id:1}]
	     * @param {String} [key]
	     * @param {Boolean} [sort=False]
	     * @returns {Array} [{id:1},{id:2}]
	     */


	    function uniqueArray(src, key, sort) {
	      var results = [];
	      var values = [];
	      var i = 0;

	      while (i < src.length) {
	        var val = key ? src[i][key] : src[i];

	        if (inArray(values, val) < 0) {
	          results.push(src[i]);
	        }

	        values[i] = val;
	        i++;
	      }

	      if (sort) {
	        if (!key) {
	          results = results.sort();
	        } else {
	          results = results.sort(function sortUniqueArray(a, b) {
	            return a[key] > b[key];
	          });
	        }
	      }

	      return results;
	    }
	    /**
	     * get the prefixed property
	     * @param {Object} obj
	     * @param {String} property
	     * @returns {String|Undefined} prefixed
	     */


	    function prefixed(obj, property) {
	      var prefix, prop;
	      var camelProp = property[0].toUpperCase() + property.slice(1);
	      var i = 0;

	      while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = prefix ? prefix + camelProp : property;

	        if (prop in obj) {
	          return prop;
	        }

	        i++;
	      }

	      return undefined$1;
	    }
	    /**
	     * get a unique id
	     * @returns {number} uniqueId
	     */


	    var _uniqueId = 1;

	    function uniqueId() {
	      return _uniqueId++;
	    }
	    /**
	     * get the window object of an element
	     * @param {HTMLElement} element
	     * @returns {DocumentView|Window}
	     */


	    function getWindowForElement(element) {
	      var doc = element.ownerDocument || element;
	      return doc.defaultView || doc.parentWindow || window;
	    }

	    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	    var SUPPORT_TOUCH = ('ontouchstart' in window);
	    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined$1;
	    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	    var INPUT_TYPE_TOUCH = 'touch';
	    var INPUT_TYPE_PEN = 'pen';
	    var INPUT_TYPE_MOUSE = 'mouse';
	    var INPUT_TYPE_KINECT = 'kinect';
	    var COMPUTE_INTERVAL = 25;
	    var INPUT_START = 1;
	    var INPUT_MOVE = 2;
	    var INPUT_END = 4;
	    var INPUT_CANCEL = 8;
	    var DIRECTION_NONE = 1;
	    var DIRECTION_LEFT = 2;
	    var DIRECTION_RIGHT = 4;
	    var DIRECTION_UP = 8;
	    var DIRECTION_DOWN = 16;
	    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	    var PROPS_XY = ['x', 'y'];
	    var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	    /**
	     * create new input type manager
	     * @param {Manager} manager
	     * @param {Function} callback
	     * @returns {Input}
	     * @constructor
	     */

	    function Input(manager, callback) {
	      var self = this;
	      this.manager = manager;
	      this.callback = callback;
	      this.element = manager.element;
	      this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	      // so when disabled the input events are completely bypassed.

	      this.domHandler = function (ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	          self.handler(ev);
	        }
	      };

	      this.init();
	    }

	    Input.prototype = {
	      /**
	       * should handle the inputEvent data and trigger the callback
	       * @virtual
	       */
	      handler: function handler() {},

	      /**
	       * bind the events
	       */
	      init: function init() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	      },

	      /**
	       * unbind the events
	       */
	      destroy: function destroy() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	      }
	    };
	    /**
	     * create new input type manager
	     * called by the Manager constructor
	     * @param {Hammer} manager
	     * @returns {Input}
	     */

	    function createInputInstance(manager) {
	      var Type;
	      var inputClass = manager.options.inputClass;

	      if (inputClass) {
	        Type = inputClass;
	      } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	      } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	      } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	      } else {
	        Type = TouchMouseInput;
	      }

	      return new Type(manager, inputHandler);
	    }
	    /**
	     * handle input events
	     * @param {Manager} manager
	     * @param {String} eventType
	     * @param {Object} input
	     */


	    function inputHandler(manager, eventType, input) {
	      var pointersLen = input.pointers.length;
	      var changedPointersLen = input.changedPointers.length;
	      var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	      var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
	      input.isFirst = !!isFirst;
	      input.isFinal = !!isFinal;

	      if (isFirst) {
	        manager.session = {};
	      } // source event is the normalized value of the domEvents
	      // like 'touchstart, mouseup, pointerdown'


	      input.eventType = eventType; // compute scale, rotation etc

	      computeInputData(manager, input); // emit secret event

	      manager.emit('hammer.input', input);
	      manager.recognize(input);
	      manager.session.prevInput = input;
	    }
	    /**
	     * extend the data with some usable properties like scale, rotate, velocity etc
	     * @param {Object} manager
	     * @param {Object} input
	     */


	    function computeInputData(manager, input) {
	      var session = manager.session;
	      var pointers = input.pointers;
	      var pointersLength = pointers.length; // store the first input to calculate the distance and direction

	      if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	      } // to compute scale and rotation we need to store the multiple touches


	      if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	      } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	      }

	      var firstInput = session.firstInput;
	      var firstMultiple = session.firstMultiple;
	      var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	      var center = input.center = getCenter(pointers);
	      input.timeStamp = now();
	      input.deltaTime = input.timeStamp - firstInput.timeStamp;
	      input.angle = getAngle(offsetCenter, center);
	      input.distance = getDistance(offsetCenter, center);
	      computeDeltaXY(session, input);
	      input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	      var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	      input.overallVelocityX = overallVelocity.x;
	      input.overallVelocityY = overallVelocity.y;
	      input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
	      input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	      input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	      input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
	      computeIntervalInputData(session, input); // find the correct target

	      var target = manager.element;

	      if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	      }

	      input.target = target;
	    }

	    function computeDeltaXY(session, input) {
	      var center = input.center;
	      var offset = session.offsetDelta || {};
	      var prevDelta = session.prevDelta || {};
	      var prevInput = session.prevInput || {};

	      if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	          x: prevInput.deltaX || 0,
	          y: prevInput.deltaY || 0
	        };
	        offset = session.offsetDelta = {
	          x: center.x,
	          y: center.y
	        };
	      }

	      input.deltaX = prevDelta.x + (center.x - offset.x);
	      input.deltaY = prevDelta.y + (center.y - offset.y);
	    }
	    /**
	     * velocity is calculated every x ms
	     * @param {Object} session
	     * @param {Object} input
	     */


	    function computeIntervalInputData(session, input) {
	      var last = session.lastInterval || input,
	          deltaTime = input.timeStamp - last.timeStamp,
	          velocity,
	          velocityX,
	          velocityY,
	          direction;

	      if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	        session.lastInterval = input;
	      } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	      }

	      input.velocity = velocity;
	      input.velocityX = velocityX;
	      input.velocityY = velocityY;
	      input.direction = direction;
	    }
	    /**
	     * create a simple clone from the input used for storage of firstInput and firstMultiple
	     * @param {Object} input
	     * @returns {Object} clonedInputData
	     */


	    function simpleCloneInputData(input) {
	      // make a simple copy of the pointers because we will get a reference if we don't
	      // we only need clientXY for the calculations
	      var pointers = [];
	      var i = 0;

	      while (i < input.pointers.length) {
	        pointers[i] = {
	          clientX: round(input.pointers[i].clientX),
	          clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	      }

	      return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	      };
	    }
	    /**
	     * get the center of all the pointers
	     * @param {Array} pointers
	     * @return {Object} center contains `x` and `y` properties
	     */


	    function getCenter(pointers) {
	      var pointersLength = pointers.length; // no need to loop when only one touch

	      if (pointersLength === 1) {
	        return {
	          x: round(pointers[0].clientX),
	          y: round(pointers[0].clientY)
	        };
	      }

	      var x = 0,
	          y = 0,
	          i = 0;

	      while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	      }

	      return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	      };
	    }
	    /**
	     * calculate the velocity between two points. unit is in px per ms.
	     * @param {Number} deltaTime
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Object} velocity `x` and `y`
	     */


	    function getVelocity(deltaTime, x, y) {
	      return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	      };
	    }
	    /**
	     * get the direction between two points
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Number} direction
	     */


	    function getDirection(x, y) {
	      if (x === y) {
	        return DIRECTION_NONE;
	      }

	      if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	      }

	      return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	    }
	    /**
	     * calculate the absolute distance between two points
	     * @param {Object} p1 {x, y}
	     * @param {Object} p2 {x, y}
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} distance
	     */


	    function getDistance(p1, p2, props) {
	      if (!props) {
	        props = PROPS_XY;
	      }

	      var x = p2[props[0]] - p1[props[0]],
	          y = p2[props[1]] - p1[props[1]];
	      return Math.sqrt(x * x + y * y);
	    }
	    /**
	     * calculate the angle between two coordinates
	     * @param {Object} p1
	     * @param {Object} p2
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} angle
	     */


	    function getAngle(p1, p2, props) {
	      if (!props) {
	        props = PROPS_XY;
	      }

	      var x = p2[props[0]] - p1[props[0]],
	          y = p2[props[1]] - p1[props[1]];
	      return Math.atan2(y, x) * 180 / Math.PI;
	    }
	    /**
	     * calculate the rotation degrees between two pointersets
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} rotation
	     */


	    function getRotation(start, end) {
	      return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	    }
	    /**
	     * calculate the scale factor between two pointersets
	     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} scale
	     */


	    function getScale(start, end) {
	      return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	    }

	    var MOUSE_INPUT_MAP = {
	      mousedown: INPUT_START,
	      mousemove: INPUT_MOVE,
	      mouseup: INPUT_END
	    };
	    var MOUSE_ELEMENT_EVENTS = 'mousedown';
	    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	    /**
	     * Mouse events input
	     * @constructor
	     * @extends Input
	     */

	    function MouseInput() {
	      this.evEl = MOUSE_ELEMENT_EVENTS;
	      this.evWin = MOUSE_WINDOW_EVENTS;
	      this.pressed = false; // mousedown state

	      Input.apply(this, arguments);
	    }

	    inherit(MouseInput, Input, {
	      /**
	       * handle mouse events
	       * @param {Object} ev
	       */
	      handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

	        if (eventType & INPUT_START && ev.button === 0) {
	          this.pressed = true;
	        }

	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	          eventType = INPUT_END;
	        } // mouse must be down


	        if (!this.pressed) {
	          return;
	        }

	        if (eventType & INPUT_END) {
	          this.pressed = false;
	        }

	        this.callback(this.manager, eventType, {
	          pointers: [ev],
	          changedPointers: [ev],
	          pointerType: INPUT_TYPE_MOUSE,
	          srcEvent: ev
	        });
	      }
	    });
	    var POINTER_INPUT_MAP = {
	      pointerdown: INPUT_START,
	      pointermove: INPUT_MOVE,
	      pointerup: INPUT_END,
	      pointercancel: INPUT_CANCEL,
	      pointerout: INPUT_CANCEL
	    }; // in IE10 the pointer types is defined as an enum

	    var IE10_POINTER_TYPE_ENUM = {
	      2: INPUT_TYPE_TOUCH,
	      3: INPUT_TYPE_PEN,
	      4: INPUT_TYPE_MOUSE,
	      5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

	    };
	    var POINTER_ELEMENT_EVENTS = 'pointerdown';
	    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

	    if (window.MSPointerEvent && !window.PointerEvent) {
	      POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	      POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	    }
	    /**
	     * Pointer events input
	     * @constructor
	     * @extends Input
	     */


	    function PointerEventInput() {
	      this.evEl = POINTER_ELEMENT_EVENTS;
	      this.evWin = POINTER_WINDOW_EVENTS;
	      Input.apply(this, arguments);
	      this.store = this.manager.session.pointerEvents = [];
	    }

	    inherit(PointerEventInput, Input, {
	      /**
	       * handle mouse events
	       * @param {Object} ev
	       */
	      handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	        var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

	        var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	          if (storeIndex < 0) {
	            store.push(ev);
	            storeIndex = store.length - 1;
	          }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	          removePointer = true;
	        } // it not found, so the pointer hasn't been down (so it's probably a hover)


	        if (storeIndex < 0) {
	          return;
	        } // update the event in the store


	        store[storeIndex] = ev;
	        this.callback(this.manager, eventType, {
	          pointers: store,
	          changedPointers: [ev],
	          pointerType: pointerType,
	          srcEvent: ev
	        });

	        if (removePointer) {
	          // remove from the store
	          store.splice(storeIndex, 1);
	        }
	      }
	    });
	    var SINGLE_TOUCH_INPUT_MAP = {
	      touchstart: INPUT_START,
	      touchmove: INPUT_MOVE,
	      touchend: INPUT_END,
	      touchcancel: INPUT_CANCEL
	    };
	    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	    /**
	     * Touch events input
	     * @constructor
	     * @extends Input
	     */

	    function SingleTouchInput() {
	      this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	      this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	      this.started = false;
	      Input.apply(this, arguments);
	    }

	    inherit(SingleTouchInput, Input, {
	      handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

	        if (type === INPUT_START) {
	          this.started = true;
	        }

	        if (!this.started) {
	          return;
	        }

	        var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	          this.started = false;
	        }

	        this.callback(this.manager, type, {
	          pointers: touches[0],
	          changedPointers: touches[1],
	          pointerType: INPUT_TYPE_TOUCH,
	          srcEvent: ev
	        });
	      }
	    });
	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */

	    function normalizeSingleTouches(ev, type) {
	      var all = toArray(ev.touches);
	      var changed = toArray(ev.changedTouches);

	      if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	      }

	      return [all, changed];
	    }

	    var TOUCH_INPUT_MAP = {
	      touchstart: INPUT_START,
	      touchmove: INPUT_MOVE,
	      touchend: INPUT_END,
	      touchcancel: INPUT_CANCEL
	    };
	    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	    /**
	     * Multi-user touch events input
	     * @constructor
	     * @extends Input
	     */

	    function TouchInput() {
	      this.evTarget = TOUCH_TARGET_EVENTS;
	      this.targetIds = {};
	      Input.apply(this, arguments);
	    }

	    inherit(TouchInput, Input, {
	      handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);

	        if (!touches) {
	          return;
	        }

	        this.callback(this.manager, type, {
	          pointers: touches[0],
	          changedPointers: touches[1],
	          pointerType: INPUT_TYPE_TOUCH,
	          srcEvent: ev
	        });
	      }
	    });
	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */

	    function getTouches(ev, type) {
	      var allTouches = toArray(ev.touches);
	      var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

	      if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	      }

	      var i,
	          targetTouches,
	          changedTouches = toArray(ev.changedTouches),
	          changedTargetTouches = [],
	          target = this.target; // get target touches from touches

	      targetTouches = allTouches.filter(function (touch) {
	        return hasParent(touch.target, target);
	      }); // collect touches

	      if (type === INPUT_START) {
	        i = 0;

	        while (i < targetTouches.length) {
	          targetIds[targetTouches[i].identifier] = true;
	          i++;
	        }
	      } // filter changed touches to only contain touches that exist in the collected target ids


	      i = 0;

	      while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	          changedTargetTouches.push(changedTouches[i]);
	        } // cleanup removed touches


	        if (type & (INPUT_END | INPUT_CANCEL)) {
	          delete targetIds[changedTouches[i].identifier];
	        }

	        i++;
	      }

	      if (!changedTargetTouches.length) {
	        return;
	      }

	      return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	      uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
	    }
	    /**
	     * Combined touch and mouse input
	     *
	     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	     * This because touch devices also emit mouse events while doing a touch.
	     *
	     * @constructor
	     * @extends Input
	     */


	    var DEDUP_TIMEOUT = 2500;
	    var DEDUP_DISTANCE = 25;

	    function TouchMouseInput() {
	      Input.apply(this, arguments);
	      var handler = bindFn(this.handler, this);
	      this.touch = new TouchInput(this.manager, handler);
	      this.mouse = new MouseInput(this.manager, handler);
	      this.primaryTouch = null;
	      this.lastTouches = [];
	    }

	    inherit(TouchMouseInput, Input, {
	      /**
	       * handle mouse and touch events
	       * @param {Hammer} manager
	       * @param {String} inputEvent
	       * @param {Object} inputData
	       */
	      handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
	            isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	          return;
	        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


	        if (isTouch) {
	          recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	          return;
	        }

	        this.callback(manager, inputEvent, inputData);
	      },

	      /**
	       * remove the event listeners
	       */
	      destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	      }
	    });

	    function recordTouches(eventType, eventData) {
	      if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	      }
	    }

	    function setLastTouch(eventData) {
	      var touch = eventData.changedPointers[0];

	      if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {
	          x: touch.clientX,
	          y: touch.clientY
	        };
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;

	        var removeLastTouch = function removeLastTouch() {
	          var i = lts.indexOf(lastTouch);

	          if (i > -1) {
	            lts.splice(i, 1);
	          }
	        };

	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	      }
	    }

	    function isSyntheticEvent(eventData) {
	      var x = eventData.srcEvent.clientX,
	          y = eventData.srcEvent.clientY;

	      for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x),
	            dy = Math.abs(y - t.y);

	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	          return true;
	        }
	      }

	      return false;
	    }

	    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1; // magical touchAction value

	    var TOUCH_ACTION_COMPUTE = 'compute';
	    var TOUCH_ACTION_AUTO = 'auto';
	    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

	    var TOUCH_ACTION_NONE = 'none';
	    var TOUCH_ACTION_PAN_X = 'pan-x';
	    var TOUCH_ACTION_PAN_Y = 'pan-y';
	    var TOUCH_ACTION_MAP = getTouchActionProps();
	    /**
	     * Touch Action
	     * sets the touchAction property or uses the js alternative
	     * @param {Manager} manager
	     * @param {String} value
	     * @constructor
	     */

	    function TouchAction(manager, value) {
	      this.manager = manager;
	      this.set(value);
	    }

	    TouchAction.prototype = {
	      /**
	       * set the touchAction value on the element or enable the polyfill
	       * @param {String} value
	       */
	      set: function set(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	          value = this.compute();
	        }

	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	          this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }

	        this.actions = value.toLowerCase().trim();
	      },

	      /**
	       * just re-set the touchAction value
	       */
	      update: function update() {
	        this.set(this.manager.options.touchAction);
	      },

	      /**
	       * compute the value for the touchAction property based on the recognizer's settings
	       * @returns {String} value
	       */
	      compute: function compute() {
	        var actions = [];
	        each(this.manager.recognizers, function (recognizer) {
	          if (boolOrFn(recognizer.options.enable, [recognizer])) {
	            actions = actions.concat(recognizer.getTouchAction());
	          }
	        });
	        return cleanTouchActions(actions.join(' '));
	      },

	      /**
	       * this method is called on each input cycle and provides the preventing of the browser behavior
	       * @param {Object} input
	       */
	      preventDefaults: function preventDefaults(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection; // if the touch action did prevented once this session

	        if (this.manager.session.prevented) {
	          srcEvent.preventDefault();
	          return;
	        }

	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	        if (hasNone) {
	          //do not prevent defaults if this is a tap gesture
	          var isTapPointer = input.pointers.length === 1;
	          var isTapMovement = input.distance < 2;
	          var isTapTouchTime = input.deltaTime < 250;

	          if (isTapPointer && isTapMovement && isTapTouchTime) {
	            return;
	          }
	        }

	        if (hasPanX && hasPanY) {
	          // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	          return;
	        }

	        if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	          return this.preventSrc(srcEvent);
	        }
	      },

	      /**
	       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	       * @param {Object} srcEvent
	       */
	      preventSrc: function preventSrc(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	      }
	    };
	    /**
	     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	     * @param {String} actions
	     * @returns {*}
	     */

	    function cleanTouchActions(actions) {
	      // none
	      if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	      }

	      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
	      // for different directions, e.g. horizontal pan but vertical swipe?)
	      // we need none (as otherwise with pan-x pan-y combined none of these
	      // recognizers will work, since the browser would handle all panning

	      if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	      } // pan-x OR pan-y


	      if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	      } // manipulation


	      if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	      }

	      return TOUCH_ACTION_AUTO;
	    }

	    function getTouchActionProps() {
	      if (!NATIVE_TOUCH_ACTION) {
	        return false;
	      }

	      var touchMap = {};
	      var cssSupports = window.CSS && window.CSS.supports;
	      ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	      });
	      return touchMap;
	    }
	    /**
	     * Recognizer flow explained; *
	     * All recognizers have the initial state of POSSIBLE when a input session starts.
	     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	     * Example session for mouse-input: mousedown -> mousemove -> mouseup
	     *
	     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	     * which determines with state it should be.
	     *
	     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	     * POSSIBLE to give it another change on the next cycle.
	     *
	     *               Possible
	     *                  |
	     *            +-----+---------------+
	     *            |                     |
	     *      +-----+-----+               |
	     *      |           |               |
	     *   Failed      Cancelled          |
	     *                          +-------+------+
	     *                          |              |
	     *                      Recognized       Began
	     *                                         |
	     *                                      Changed
	     *                                         |
	     *                                  Ended/Recognized
	     */


	    var STATE_POSSIBLE = 1;
	    var STATE_BEGAN = 2;
	    var STATE_CHANGED = 4;
	    var STATE_ENDED = 8;
	    var STATE_RECOGNIZED = STATE_ENDED;
	    var STATE_CANCELLED = 16;
	    var STATE_FAILED = 32;
	    /**
	     * Recognizer
	     * Every recognizer needs to extend from this class.
	     * @constructor
	     * @param {Object} options
	     */

	    function Recognizer(options) {
	      this.options = assign({}, this.defaults, options || {});
	      this.id = uniqueId();
	      this.manager = null; // default is enable true

	      this.options.enable = ifUndefined(this.options.enable, true);
	      this.state = STATE_POSSIBLE;
	      this.simultaneous = {};
	      this.requireFail = [];
	    }

	    Recognizer.prototype = {
	      /**
	       * @virtual
	       * @type {Object}
	       */
	      defaults: {},

	      /**
	       * set options
	       * @param {Object} options
	       * @return {Recognizer}
	       */
	      set: function set(options) {
	        assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

	        this.manager && this.manager.touchAction.update();
	        return this;
	      },

	      /**
	       * recognize simultaneous with an other recognizer.
	       * @param {Recognizer} otherRecognizer
	       * @returns {Recognizer} this
	       */
	      recognizeWith: function recognizeWith(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	          return this;
	        }

	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	        if (!simultaneous[otherRecognizer.id]) {
	          simultaneous[otherRecognizer.id] = otherRecognizer;
	          otherRecognizer.recognizeWith(this);
	        }

	        return this;
	      },

	      /**
	       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	       * @param {Recognizer} otherRecognizer
	       * @returns {Recognizer} this
	       */
	      dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	          return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	      },

	      /**
	       * recognizer can only run when an other is failing
	       * @param {Recognizer} otherRecognizer
	       * @returns {Recognizer} this
	       */
	      requireFailure: function requireFailure(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	          return this;
	        }

	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	        if (inArray(requireFail, otherRecognizer) === -1) {
	          requireFail.push(otherRecognizer);
	          otherRecognizer.requireFailure(this);
	        }

	        return this;
	      },

	      /**
	       * drop the requireFailure link. it does not remove the link on the other recognizer.
	       * @param {Recognizer} otherRecognizer
	       * @returns {Recognizer} this
	       */
	      dropRequireFailure: function dropRequireFailure(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	          return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);

	        if (index > -1) {
	          this.requireFail.splice(index, 1);
	        }

	        return this;
	      },

	      /**
	       * has require failures boolean
	       * @returns {boolean}
	       */
	      hasRequireFailures: function hasRequireFailures() {
	        return this.requireFail.length > 0;
	      },

	      /**
	       * if the recognizer can recognize simultaneous with an other recognizer
	       * @param {Recognizer} otherRecognizer
	       * @returns {Boolean}
	       */
	      canRecognizeWith: function canRecognizeWith(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	      },

	      /**
	       * You should use `tryEmit` instead of `emit` directly to check
	       * that all the needed recognizers has failed before emitting.
	       * @param {Object} input
	       */
	      emit: function emit(input) {
	        var self = this;
	        var state = this.state;

	        function emit(event) {
	          self.manager.emit(event, input);
	        } // 'panstart' and 'panmove'


	        if (state < STATE_ENDED) {
	          emit(self.options.event + stateStr(state));
	        }

	        emit(self.options.event); // simple 'eventName' events

	        if (input.additionalEvent) {
	          // additional event(panleft, panright, pinchin, pinchout...)
	          emit(input.additionalEvent);
	        } // panend and pancancel


	        if (state >= STATE_ENDED) {
	          emit(self.options.event + stateStr(state));
	        }
	      },

	      /**
	       * Check that all the require failure recognizers has failed,
	       * if true, it emits a gesture event,
	       * otherwise, setup the state to FAILED.
	       * @param {Object} input
	       */
	      tryEmit: function tryEmit(input) {
	        if (this.canEmit()) {
	          return this.emit(input);
	        } // it's failing anyway


	        this.state = STATE_FAILED;
	      },

	      /**
	       * can we emit?
	       * @returns {boolean}
	       */
	      canEmit: function canEmit() {
	        var i = 0;

	        while (i < this.requireFail.length) {
	          if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	            return false;
	          }

	          i++;
	        }

	        return true;
	      },

	      /**
	       * update the recognizer
	       * @param {Object} inputData
	       */
	      recognize: function recognize(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData); // is is enabled and allow recognizing?

	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	          this.reset();
	          this.state = STATE_FAILED;
	          return;
	        } // reset when we've reached the end


	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	          this.state = STATE_POSSIBLE;
	        }

	        this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
	        // so trigger an event

	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	          this.tryEmit(inputDataClone);
	        }
	      },

	      /**
	       * return the state of the recognizer
	       * the actual recognizing happens in this method
	       * @virtual
	       * @param {Object} inputData
	       * @returns {Const} STATE
	       */
	      process: function process(inputData) {},
	      // jshint ignore:line

	      /**
	       * return the preferred touch-action
	       * @virtual
	       * @returns {Array}
	       */
	      getTouchAction: function getTouchAction() {},

	      /**
	       * called when the gesture isn't allowed to recognize
	       * like when another is being recognized or it is disabled
	       * @virtual
	       */
	      reset: function reset() {}
	    };
	    /**
	     * get a usable string, used as event postfix
	     * @param {Const} state
	     * @returns {String} state
	     */

	    function stateStr(state) {
	      if (state & STATE_CANCELLED) {
	        return 'cancel';
	      } else if (state & STATE_ENDED) {
	        return 'end';
	      } else if (state & STATE_CHANGED) {
	        return 'move';
	      } else if (state & STATE_BEGAN) {
	        return 'start';
	      }

	      return '';
	    }
	    /**
	     * direction cons to string
	     * @param {Const} direction
	     * @returns {String}
	     */


	    function directionStr(direction) {
	      if (direction == DIRECTION_DOWN) {
	        return 'down';
	      } else if (direction == DIRECTION_UP) {
	        return 'up';
	      } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	      } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	      }

	      return '';
	    }
	    /**
	     * get a recognizer by name if it is bound to a manager
	     * @param {Recognizer|String} otherRecognizer
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer}
	     */


	    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	      var manager = recognizer.manager;

	      if (manager) {
	        return manager.get(otherRecognizer);
	      }

	      return otherRecognizer;
	    }
	    /**
	     * This recognizer is just used as a base for the simple attribute recognizers.
	     * @constructor
	     * @extends Recognizer
	     */


	    function AttrRecognizer() {
	      Recognizer.apply(this, arguments);
	    }

	    inherit(AttrRecognizer, Recognizer, {
	      /**
	       * @namespace
	       * @memberof AttrRecognizer
	       */
	      defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	      },

	      /**
	       * Used to check if it the recognizer receives valid input, like input.distance > 10.
	       * @memberof AttrRecognizer
	       * @param {Object} input
	       * @returns {Boolean} recognized
	       */
	      attrTest: function attrTest(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	      },

	      /**
	       * Process the input and return the state for the recognizer
	       * @memberof AttrRecognizer
	       * @param {Object} input
	       * @returns {*} State
	       */
	      process: function process(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	          return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	          if (eventType & INPUT_END) {
	            return state | STATE_ENDED;
	          } else if (!(state & STATE_BEGAN)) {
	            return STATE_BEGAN;
	          }

	          return state | STATE_CHANGED;
	        }

	        return STATE_FAILED;
	      }
	    });
	    /**
	     * Pan
	     * Recognized when the pointer is down and moved in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    function PanRecognizer() {
	      AttrRecognizer.apply(this, arguments);
	      this.pX = null;
	      this.pY = null;
	    }

	    inherit(PanRecognizer, AttrRecognizer, {
	      /**
	       * @namespace
	       * @memberof PanRecognizer
	       */
	      defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	      },
	      getTouchAction: function getTouchAction() {
	        var direction = this.options.direction;
	        var actions = [];

	        if (direction & DIRECTION_HORIZONTAL) {
	          actions.push(TOUCH_ACTION_PAN_Y);
	        }

	        if (direction & DIRECTION_VERTICAL) {
	          actions.push(TOUCH_ACTION_PAN_X);
	        }

	        return actions;
	      },
	      directionTest: function directionTest(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY; // lock to axis?

	        if (!(direction & options.direction)) {
	          if (options.direction & DIRECTION_HORIZONTAL) {
	            direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	            hasMoved = x != this.pX;
	            distance = Math.abs(input.deltaX);
	          } else {
	            direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	            hasMoved = y != this.pY;
	            distance = Math.abs(input.deltaY);
	          }
	        }

	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	      },
	      attrTest: function attrTest(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	      },
	      emit: function emit(input) {
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	        var direction = directionStr(input.direction);

	        if (direction) {
	          input.additionalEvent = this.options.event + direction;
	        }

	        this._super.emit.call(this, input);
	      }
	    });
	    /**
	     * Pinch
	     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    function PinchRecognizer() {
	      AttrRecognizer.apply(this, arguments);
	    }

	    inherit(PinchRecognizer, AttrRecognizer, {
	      /**
	       * @namespace
	       * @memberof PinchRecognizer
	       */
	      defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	      },
	      getTouchAction: function getTouchAction() {
	        return [TOUCH_ACTION_NONE];
	      },
	      attrTest: function attrTest(input) {
	        return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	      },
	      emit: function emit(input) {
	        if (input.scale !== 1) {
	          var inOut = input.scale < 1 ? 'in' : 'out';
	          input.additionalEvent = this.options.event + inOut;
	        }

	        this._super.emit.call(this, input);
	      }
	    });
	    /**
	     * Press
	     * Recognized when the pointer is down for x ms without any movement.
	     * @constructor
	     * @extends Recognizer
	     */

	    function PressRecognizer() {
	      Recognizer.apply(this, arguments);
	      this._timer = null;
	      this._input = null;
	    }

	    inherit(PressRecognizer, Recognizer, {
	      /**
	       * @namespace
	       * @memberof PressRecognizer
	       */
	      defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251,
	        // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low

	      },
	      getTouchAction: function getTouchAction() {
	        return [TOUCH_ACTION_AUTO];
	      },
	      process: function process(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	        this._input = input; // we only allow little movement
	        // and we've reached an end event, so a tap is possible

	        if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	          this.reset();
	        } else if (input.eventType & INPUT_START) {
	          this.reset();
	          this._timer = setTimeoutContext(function () {
	            this.state = STATE_RECOGNIZED;
	            this.tryEmit();
	          }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	          return STATE_RECOGNIZED;
	        }

	        return STATE_FAILED;
	      },
	      reset: function reset() {
	        clearTimeout(this._timer);
	      },
	      emit: function emit(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	          return;
	        }

	        if (input && input.eventType & INPUT_END) {
	          this.manager.emit(this.options.event + 'up', input);
	        } else {
	          this._input.timeStamp = now();
	          this.manager.emit(this.options.event, this._input);
	        }
	      }
	    });
	    /**
	     * Rotate
	     * Recognized when two or more pointer are moving in a circular motion.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    function RotateRecognizer() {
	      AttrRecognizer.apply(this, arguments);
	    }

	    inherit(RotateRecognizer, AttrRecognizer, {
	      /**
	       * @namespace
	       * @memberof RotateRecognizer
	       */
	      defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	      },
	      getTouchAction: function getTouchAction() {
	        return [TOUCH_ACTION_NONE];
	      },
	      attrTest: function attrTest(input) {
	        return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	      }
	    });
	    /**
	     * Swipe
	     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    function SwipeRecognizer() {
	      AttrRecognizer.apply(this, arguments);
	    }

	    inherit(SwipeRecognizer, AttrRecognizer, {
	      /**
	       * @namespace
	       * @memberof SwipeRecognizer
	       */
	      defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	      },
	      getTouchAction: function getTouchAction() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	      },
	      attrTest: function attrTest(input) {
	        var direction = this.options.direction;
	        var velocity;

	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	          velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	          velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	          velocity = input.overallVelocityY;
	        }

	        return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	      },
	      emit: function emit(input) {
	        var direction = directionStr(input.offsetDirection);

	        if (direction) {
	          this.manager.emit(this.options.event + direction, input);
	        }

	        this.manager.emit(this.options.event, input);
	      }
	    });
	    /**
	     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	     * a single tap.
	     *
	     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	     * multi-taps being recognized.
	     * @constructor
	     * @extends Recognizer
	     */

	    function TapRecognizer() {
	      Recognizer.apply(this, arguments); // previous time and center,
	      // used for tap counting

	      this.pTime = false;
	      this.pCenter = false;
	      this._timer = null;
	      this._input = null;
	      this.count = 0;
	    }

	    inherit(TapRecognizer, Recognizer, {
	      /**
	       * @namespace
	       * @memberof PinchRecognizer
	       */
	      defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300,
	        // max time between the multi-tap taps
	        time: 250,
	        // max time of the pointer to be down (like finger on the screen)
	        threshold: 9,
	        // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position

	      },
	      getTouchAction: function getTouchAction() {
	        return [TOUCH_ACTION_MANIPULATION];
	      },
	      process: function process(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	        this.reset();

	        if (input.eventType & INPUT_START && this.count === 0) {
	          return this.failTimeout();
	        } // we only allow little movement
	        // and we've reached an end event, so a tap is possible


	        if (validMovement && validTouchTime && validPointers) {
	          if (input.eventType != INPUT_END) {
	            return this.failTimeout();
	          }

	          var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	          var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	          this.pTime = input.timeStamp;
	          this.pCenter = input.center;

	          if (!validMultiTap || !validInterval) {
	            this.count = 1;
	          } else {
	            this.count += 1;
	          }

	          this._input = input; // if tap count matches we have recognized it,
	          // else it has began recognizing...

	          var tapCount = this.count % options.taps;

	          if (tapCount === 0) {
	            // no failing requirements, immediately trigger the tap event
	            // or wait as long as the multitap interval to trigger
	            if (!this.hasRequireFailures()) {
	              return STATE_RECOGNIZED;
	            } else {
	              this._timer = setTimeoutContext(function () {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	              }, options.interval, this);
	              return STATE_BEGAN;
	            }
	          }
	        }

	        return STATE_FAILED;
	      },
	      failTimeout: function failTimeout() {
	        this._timer = setTimeoutContext(function () {
	          this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	      },
	      reset: function reset() {
	        clearTimeout(this._timer);
	      },
	      emit: function emit() {
	        if (this.state == STATE_RECOGNIZED) {
	          this._input.tapCount = this.count;
	          this.manager.emit(this.options.event, this._input);
	        }
	      }
	    });
	    /**
	     * Simple way to create a manager with a default set of recognizers.
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */

	    function Hammer(element, options) {
	      options = options || {};
	      options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	      return new Manager(element, options);
	    }
	    /**
	     * @const {string}
	     */


	    Hammer.VERSION = '2.0.7';
	    /**
	     * default settings
	     * @namespace
	     */

	    Hammer.defaults = {
	      /**
	       * set if DOM events are being triggered.
	       * But this is slower and unused by simple implementations, so disabled by default.
	       * @type {Boolean}
	       * @default false
	       */
	      domEvents: false,

	      /**
	       * The value for the touchAction property/fallback.
	       * When set to `compute` it will magically set the correct value based on the added recognizers.
	       * @type {String}
	       * @default compute
	       */
	      touchAction: TOUCH_ACTION_COMPUTE,

	      /**
	       * @type {Boolean}
	       * @default true
	       */
	      enable: true,

	      /**
	       * EXPERIMENTAL FEATURE -- can be removed/changed
	       * Change the parent input target element.
	       * If Null, then it is being set the to main element.
	       * @type {Null|EventTarget}
	       * @default null
	       */
	      inputTarget: null,

	      /**
	       * force an input class
	       * @type {Null|Function}
	       * @default null
	       */
	      inputClass: null,

	      /**
	       * Default recognizer setup when calling `Hammer()`
	       * When creating a new Manager these will be skipped.
	       * @type {Array}
	       */
	      preset: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	      [RotateRecognizer, {
	        enable: false
	      }], [PinchRecognizer, {
	        enable: false
	      }, ['rotate']], [SwipeRecognizer, {
	        direction: DIRECTION_HORIZONTAL
	      }], [PanRecognizer, {
	        direction: DIRECTION_HORIZONTAL
	      }, ['swipe']], [TapRecognizer], [TapRecognizer, {
	        event: 'doubletap',
	        taps: 2
	      }, ['tap']], [PressRecognizer]],

	      /**
	       * Some CSS properties can be used to improve the working of Hammer.
	       * Add them to this method and they will be set when creating a new Manager.
	       * @namespace
	       */
	      cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',

	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',

	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',

	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',

	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',

	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	      }
	    };
	    var STOP = 1;
	    var FORCED_STOP = 2;
	    /**
	     * Manager
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */

	    function Manager(element, options) {
	      this.options = assign({}, Hammer.defaults, options || {});
	      this.options.inputTarget = this.options.inputTarget || element;
	      this.handlers = {};
	      this.session = {};
	      this.recognizers = [];
	      this.oldCssProps = {};
	      this.element = element;
	      this.input = createInputInstance(this);
	      this.touchAction = new TouchAction(this, this.options.touchAction);
	      toggleCssProps(this, true);
	      each(this.options.recognizers, function (item) {
	        var recognizer = this.add(new item[0](item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	      }, this);
	    }

	    Manager.prototype = {
	      /**
	       * set options
	       * @param {Object} options
	       * @returns {Manager}
	       */
	      set: function set(options) {
	        assign(this.options, options); // Options that need a little more setup

	        if (options.touchAction) {
	          this.touchAction.update();
	        }

	        if (options.inputTarget) {
	          // Clean up existing event listeners and reinitialize
	          this.input.destroy();
	          this.input.target = options.inputTarget;
	          this.input.init();
	        }

	        return this;
	      },

	      /**
	       * stop recognizing for this session.
	       * This session will be discarded, when a new [input]start event is fired.
	       * When forced, the recognizer cycle is stopped immediately.
	       * @param {Boolean} [force]
	       */
	      stop: function stop(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	      },

	      /**
	       * run the recognizers!
	       * called by the inputHandler function on every movement of the pointers (touches)
	       * it walks through all the recognizers and tries to detect the gesture that is being made
	       * @param {Object} inputData
	       */
	      recognize: function recognize(inputData) {
	        var session = this.session;

	        if (session.stopped) {
	          return;
	        } // run the touch-action polyfill


	        this.touchAction.preventDefaults(inputData);
	        var recognizer;
	        var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`

	        var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
	        // or when we're in a new session

	        if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	          curRecognizer = session.curRecognizer = null;
	        }

	        var i = 0;

	        while (i < recognizers.length) {
	          recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
	          // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	          // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	          //      that is being recognized.
	          // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	          //      this can be setup with the `recognizeWith()` method on the recognizer.

	          if (session.stopped !== FORCED_STOP && ( // 1
	          !curRecognizer || recognizer == curRecognizer || // 2
	          recognizer.canRecognizeWith(curRecognizer))) {
	            // 3
	            recognizer.recognize(inputData);
	          } else {
	            recognizer.reset();
	          } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	          // current active recognizer. but only if we don't already have an active recognizer


	          if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	            curRecognizer = session.curRecognizer = recognizer;
	          }

	          i++;
	        }
	      },

	      /**
	       * get a recognizer by its event name.
	       * @param {Recognizer|String} recognizer
	       * @returns {Recognizer|Null}
	       */
	      get: function get(recognizer) {
	        if (recognizer instanceof Recognizer) {
	          return recognizer;
	        }

	        var recognizers = this.recognizers;

	        for (var i = 0; i < recognizers.length; i++) {
	          if (recognizers[i].options.event == recognizer) {
	            return recognizers[i];
	          }
	        }

	        return null;
	      },

	      /**
	       * add a recognizer to the manager
	       * existing recognizers with the same event name will be removed
	       * @param {Recognizer} recognizer
	       * @returns {Recognizer|Manager}
	       */
	      add: function add(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	          return this;
	        } // remove existing


	        var existing = this.get(recognizer.options.event);

	        if (existing) {
	          this.remove(existing);
	        }

	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	        this.touchAction.update();
	        return recognizer;
	      },

	      /**
	       * remove a recognizer by name or instance
	       * @param {Recognizer|String} recognizer
	       * @returns {Manager}
	       */
	      remove: function remove(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	          return this;
	        }

	        recognizer = this.get(recognizer); // let's make sure this recognizer exists

	        if (recognizer) {
	          var recognizers = this.recognizers;
	          var index = inArray(recognizers, recognizer);

	          if (index !== -1) {
	            recognizers.splice(index, 1);
	            this.touchAction.update();
	          }
	        }

	        return this;
	      },

	      /**
	       * bind event
	       * @param {String} events
	       * @param {Function} handler
	       * @returns {EventEmitter} this
	       */
	      on: function on(events, handler) {
	        if (events === undefined$1) {
	          return;
	        }

	        if (handler === undefined$1) {
	          return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function (event) {
	          handlers[event] = handlers[event] || [];
	          handlers[event].push(handler);
	        });
	        return this;
	      },

	      /**
	       * unbind event, leave emit blank to remove all handlers
	       * @param {String} events
	       * @param {Function} [handler]
	       * @returns {EventEmitter} this
	       */
	      off: function off(events, handler) {
	        if (events === undefined$1) {
	          return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function (event) {
	          if (!handler) {
	            delete handlers[event];
	          } else {
	            handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	          }
	        });
	        return this;
	      },

	      /**
	       * emit event to the listeners
	       * @param {String} event
	       * @param {Object} data
	       */
	      emit: function emit(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	          triggerDomEvent(event, data);
	        } // no handlers, so skip it all


	        var handlers = this.handlers[event] && this.handlers[event].slice();

	        if (!handlers || !handlers.length) {
	          return;
	        }

	        data.type = event;

	        data.preventDefault = function () {
	          data.srcEvent.preventDefault();
	        };

	        var i = 0;

	        while (i < handlers.length) {
	          handlers[i](data);
	          i++;
	        }
	      },

	      /**
	       * destroy the manager and unbinds all events
	       * it doesn't unbind dom events, that is the user own responsibility
	       */
	      destroy: function destroy() {
	        this.element && toggleCssProps(this, false);
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	      }
	    };
	    /**
	     * add/remove the css properties as defined in manager.options.cssProps
	     * @param {Manager} manager
	     * @param {Boolean} add
	     */

	    function toggleCssProps(manager, add) {
	      var element = manager.element;

	      if (!element.style) {
	        return;
	      }

	      var prop;
	      each(manager.options.cssProps, function (value, name) {
	        prop = prefixed(element.style, name);

	        if (add) {
	          manager.oldCssProps[prop] = element.style[prop];
	          element.style[prop] = value;
	        } else {
	          element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	      });

	      if (!add) {
	        manager.oldCssProps = {};
	      }
	    }
	    /**
	     * trigger dom event
	     * @param {String} event
	     * @param {Object} data
	     */


	    function triggerDomEvent(event, data) {
	      var gestureEvent = document.createEvent('Event');
	      gestureEvent.initEvent(event, true, true);
	      gestureEvent.gesture = data;
	      data.target.dispatchEvent(gestureEvent);
	    }

	    assign(Hammer, {
	      INPUT_START: INPUT_START,
	      INPUT_MOVE: INPUT_MOVE,
	      INPUT_END: INPUT_END,
	      INPUT_CANCEL: INPUT_CANCEL,
	      STATE_POSSIBLE: STATE_POSSIBLE,
	      STATE_BEGAN: STATE_BEGAN,
	      STATE_CHANGED: STATE_CHANGED,
	      STATE_ENDED: STATE_ENDED,
	      STATE_RECOGNIZED: STATE_RECOGNIZED,
	      STATE_CANCELLED: STATE_CANCELLED,
	      STATE_FAILED: STATE_FAILED,
	      DIRECTION_NONE: DIRECTION_NONE,
	      DIRECTION_LEFT: DIRECTION_LEFT,
	      DIRECTION_RIGHT: DIRECTION_RIGHT,
	      DIRECTION_UP: DIRECTION_UP,
	      DIRECTION_DOWN: DIRECTION_DOWN,
	      DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	      DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	      DIRECTION_ALL: DIRECTION_ALL,
	      Manager: Manager,
	      Input: Input,
	      TouchAction: TouchAction,
	      TouchInput: TouchInput,
	      MouseInput: MouseInput,
	      PointerEventInput: PointerEventInput,
	      TouchMouseInput: TouchMouseInput,
	      SingleTouchInput: SingleTouchInput,
	      Recognizer: Recognizer,
	      AttrRecognizer: AttrRecognizer,
	      Tap: TapRecognizer,
	      Pan: PanRecognizer,
	      Swipe: SwipeRecognizer,
	      Pinch: PinchRecognizer,
	      Rotate: RotateRecognizer,
	      Press: PressRecognizer,
	      on: addEventListeners,
	      off: removeEventListeners,
	      each: each,
	      merge: merge,
	      extend: extend,
	      assign: assign,
	      inherit: inherit,
	      bindFn: bindFn,
	      prefixed: prefixed
	    }); // this prevents errors when Hammer is loaded in the presence of an AMD
	    //  style loader but by script tag, not by the loader.

	    var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line

	    freeGlobal.Hammer = Hammer;

	    if (typeof undefined$1 === 'function' && undefined$1.amd) {
	      undefined$1(function () {
	        return Hammer;
	      });
	    } else if ( module.exports) {
	      module.exports = Hammer;
	    } else {
	      window[exportName] = Hammer;
	    }
	  })(window, document, 'Hammer');
	});

	// class of bp.GestureRecognizer.
	//--------------------------------------------------------

	var GestureRecognizerImp =
	/** @class */
	function () {
	  function GestureRecognizerImp(recognizer) {
	    this.recognizer = recognizer;
	  }
	  /**
	   * @desc: 在指定手势识别失败后才识别到.
	   */


	  GestureRecognizerImp.prototype.requireFailure = function (ges) {
	    this.recognizer.requireFailure(ges.recognizer);
	  };

	  return GestureRecognizerImp;
	}(); //--------------------------------------------------------
	// class of bp.Gesture.
	//--------------------------------------------------------


	var GestureImp
	/*implements bp.Gesture*/
	=
	/** @class */
	function () {
	  function GestureImp(dom) {
	    this.ges = new hammer.Manager(dom);
	    this.tapHandles = new Map();
	    this.tapRecognizers = [null, null, null];
	    this.panHandles = new Map();
	    this.panRecognizers = [null, null, null, null];
	    this.pinchHandles = new Map();
	    this.rotateHandles = new Map();
	    this.pressHandles = new Map();
	    this.swipeHandles = new Map();
	    this.swipeRecognizers = [null, null, null];
	  }
	  /**
	  * @desc: 事件监听.
	  */


	  GestureImp.prototype.on = function (event, handler) {
	    var handles;

	    switch (event) {
	      case 'tap':
	        handles = this.tapHandles;
	        break;

	      case 'pan':
	        handles = this.panHandles;
	        break;

	      case 'pinch':
	        handles = this.pinchHandles;
	        break;

	      case 'rotate':
	        handles = this.rotateHandles;
	        break;

	      case 'press':
	        handles = this.pressHandles;
	        break;

	      case 'swipe':
	        handles = this.swipeHandles;
	        break;

	      default:
	        throw new Error('bp.Gesture.on error param event');
	    }

	    if (handles.has(handler)) {
	      return this;
	    }

	    var h = function h(e) {
	      handler(e);
	    };

	    handles.set(handler, h);
	    this.ges.on(event, h);
	    return this;
	  };
	  /**
	  * @desc: 移除事件监听.
	  */


	  GestureImp.prototype.off = function (event, handler) {
	    var handles;

	    switch (event) {
	      case 'tap':
	        handles = this.tapHandles;
	        break;

	      case 'pan':
	        handles = this.panHandles;
	        break;

	      case 'pinch':
	        handles = this.pinchHandles;
	        break;

	      case 'rotate':
	        handles = this.rotateHandles;
	        break;

	      case 'press':
	        handles = this.pressHandles;
	        break;

	      case 'swipe':
	        handles = this.swipeHandles;
	        break;

	      default:
	        throw new Error('bp.Gesture.off error param event');
	    }

	    if (handler) {
	      var listener = handles.get(handler);

	      if (listener) {
	        handles["delete"](handler);
	        this.ges.off(event, listener);
	      }
	    } else {
	      this.ges.off(event);
	      handles.clear();
	    }

	    return this;
	  };
	  /**
	  * @desc: 添加tap手势识别.
	  *         只能识别 tapCount=1,2,3 的情景.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  * @return: 对同一个tapCount值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
	  */


	  GestureImp.prototype.enableTapRecognizer = function (cfg) {
	    if (!cfg) cfg = {
	      tapCount: 1
	    };

	    if (!cfg.tapCount) {
	      cfg.tapCount = 1;
	    }

	    if (cfg.tapCount < 1 || cfg.tapCount > 3) {
	      throw new Error("bp.Gesture.addTapGesture error params: " + cfg.tapCount);
	    }

	    if (this.tapRecognizers[cfg.tapCount - 1]) {
	      return this.tapRecognizers[cfg.tapCount - 1];
	    }

	    var recognizer = this.ges.add(new hammer.Tap({
	      event: 'tap',
	      taps: cfg.tapCount
	    }));
	    this.tapRecognizers[cfg.tapCount - 1] = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers(); // 设置.触发条件以及并发.


	    this._requireFailure(this.tapRecognizers);

	    this._setupDefaultRequireFailure();

	    return this.tapRecognizers[cfg.tapCount - 1];
	  };
	  /**
	  * @desc: 取消tap手势识别.
	  */


	  GestureImp.prototype.disableTapRecognizer = function (cfg) {
	    if (!cfg) cfg = {
	      tapCount: 1
	    };

	    if (!cfg.tapCount) {
	      cfg.tapCount = 1;
	    }

	    if (this.tapRecognizers[cfg.tapCount - 1]) {
	      var ges = this.tapRecognizers[cfg.tapCount - 1];
	      this.tapRecognizers[cfg.tapCount - 1] = null;
	      this.ges.remove(ges.recognizer);
	    }
	  };
	  /**
	  * @desc: 添加pan手势识别.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  * @return: 对同一个pointers值, 只能添加一个手势识别对象; 重复添加, 将返回上一次添加的识别对象.
	  */


	  GestureImp.prototype.enablePanRecognizer = function (cfg) {
	    if (!cfg.pointers) {
	      cfg.pointers = 1;
	    }

	    var pointers = cfg.pointers;

	    if (0 > pointers || pointers > 3) {
	      throw new Error('bp.Gesture.enablePanRecognizer error param pointers, must in [1,3]');
	    }

	    if (!(browserIsMobile() || browserIsPhone())) {
	      cfg.pointers = 1;
	      pointers = 1;
	    }

	    var index = pointers - 1;

	    if (this.panRecognizers[index]) {
	      return this.panRecognizers[index];
	    }

	    var recognizer = this.ges.add(new hammer.Pan({
	      event: 'pan'
	    }));
	    this.panRecognizers[index] = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers(); // 设置.触发条件以及并发.


	    this._requireFailure(this.panRecognizers);

	    this._setupDefaultRequireFailure();

	    return this.panRecognizers[index];
	  };
	  /**
	  * @desc: 取消pan手势识别.
	  */


	  GestureImp.prototype.disablePanRecognizer = function (cfg) {
	    var pointers = cfg.pointers;

	    if (!(browserIsMobile() || browserIsPhone())) {
	      cfg.pointers = 1;
	      pointers = 1;
	    }

	    if (this.panRecognizers[pointers - 1]) {
	      this.ges.remove(this.panRecognizers[pointers - 1].recognizer);
	      this.panRecognizers[pointers - 1] = null;
	    }
	  };
	  /**
	  * @desc: 添加pinch手势识别.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  */


	  GestureImp.prototype.enablePinchRecognizer = function () {
	    if (this.pinchRecognizer) {
	      return this.pinchRecognizer;
	    }

	    var recognizer = this.ges.add(new hammer.Pinch({
	      event: 'pinch'
	    }));
	    this.pinchRecognizer = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers();

	    this._setupDefaultRequireFailure();

	    return this.pinchRecognizer;
	  };
	  /**
	  * @desc: 取消pinch手势识别.
	  */


	  GestureImp.prototype.disablePinchRecognizer = function () {
	    if (this.pinchRecognizer) {
	      this.ges.remove(this.pinchRecognizer.recognizer);
	      this.pinchRecognizer = null;
	    }
	  };
	  /**
	  * @desc: 添加rotate手势识别.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  */


	  GestureImp.prototype.enableRotateRecognizer = function () {
	    if (this.rotateRecognizer) {
	      return this.rotateRecognizer;
	    }

	    var recognizer = this.ges.add(new hammer.Rotate({
	      event: 'rotate'
	    }));
	    this.rotateRecognizer = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers();

	    this._setupDefaultRequireFailure();

	    return this.rotateRecognizer;
	  };
	  /**
	  * @desc: 取消rotate手势识别.
	  */


	  GestureImp.prototype.disableRotateRecognizer = function () {
	    if (this.rotateRecognizer) {
	      this.ges.remove(this.rotateRecognizer.recognizer);
	      this.rotateRecognizer = null;
	    }
	  };
	  /**
	  * @desc: 添加press手势识别. 允许设置按压时间等.
	  *         只能有一个press手势识别.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  * @param duration: 按压时间. ms
	  */


	  GestureImp.prototype.enablePressRecognizer = function (cfg) {
	    if (this.pressRecognizer) {
	      return this.pressRecognizer;
	    }

	    var recognizer = this.ges.add(new hammer.Rotate({
	      event: 'press',
	      time: cfg.duration
	    }));
	    this.pressRecognizer = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers();

	    this._setupDefaultRequireFailure();

	    return this.pressRecognizer;
	  };
	  /**
	  * @desc: 取消rotate手势识别.
	  */


	  GestureImp.prototype.disablePressRecognizer = function () {
	    if (this.pressRecognizer) {
	      this.ges.remove(this.pressRecognizer.recognizer);
	      this.pressRecognizer = null;
	    }
	  };
	  /**
	  * @desc: 添加swipe手势识别.
	  *         - 相同的pointers值, 只能有一个swipe手势识别.
	  *         - 桌面端pointers无效.
	  * @description 默认手势enable操作会重置默认手势的requireFailure关系.
	  */


	  GestureImp.prototype.enableSwipeRecognizer = function (cfg) {
	    if (!cfg) cfg = {};

	    if (!cfg.velocity) {
	      cfg.velocity = 0.3;
	    }

	    if (!cfg.distance) {
	      cfg.distance = 10;
	    }

	    if (!cfg.pointers) {
	      cfg.pointers = 1;
	    }

	    var pointers = cfg.pointers;

	    if (0 > pointers || pointers > 3) {
	      throw new Error('bp.Gesture.enableSwipeRecognizer error param pointers, must in [1,3]');
	    }

	    if (!(browserIsMobile() || browserIsPhone())) {
	      cfg.pointers = 1;
	      pointers = 1;
	    }

	    if (this.swipeRecognizers[pointers - 1]) {
	      this.swipeRecognizers[pointers - 1].recognizer.set({
	        velocity: cfg.velocity,
	        threshold: cfg.distance,
	        pointers: cfg.pointers
	      });
	      return this.swipeRecognizers[pointers - 1];
	    }

	    var recognizer = this.ges.add(new hammer.Swipe({
	      event: 'swipe',
	      velocity: cfg.velocity,
	      threshold: cfg.distance,
	      pointers: cfg.pointers
	    }));
	    this.swipeRecognizers[pointers - 1] = new GestureRecognizerImp(recognizer);

	    this._concurrenceRecognizers();

	    this._setupDefaultRequireFailure();

	    return this.swipeRecognizers[pointers - 1];
	  };
	  /**
	  * @desc: 取消swipe手势识别.
	  */


	  GestureImp.prototype.disableSwipeRecognizer = function (cfg) {
	    if (!cfg) cfg = {};

	    if (!cfg.pointers) {
	      cfg.pointers = 1;
	    }

	    var pointers = cfg.pointers;

	    if (pointers > 0 && pointers < 4) {
	      if (!(browserIsMobile() || browserIsPhone())) {
	        cfg.pointers = 1;
	        pointers = 1;
	      }

	      if (this.swipeRecognizers[pointers - 1]) {
	        this.ges.remove(this.swipeRecognizers[pointers - 1].recognizer);
	        this.swipeRecognizers[pointers - 1] = null;
	      }
	    }
	  };
	  /**
	  * @desc: 同步触发.
	  */


	  GestureImp.prototype._concurrenceRecognizers = function () {
	    var recognizers = this.panRecognizers.concat(this.tapRecognizers).concat(this.pinchRecognizer).concat(this.pressRecognizer).concat(this.rotateRecognizer).concat(this.swipeRecognizers);
	    var firstRecognizer = null;

	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i]) {
	        if (firstRecognizer) {
	          firstRecognizer.recognizer.recognizeWith(recognizers[i].recognizer);
	          firstRecognizer = recognizers[i];
	        } else {
	          firstRecognizer = recognizers[i];
	        }
	      }
	    }
	  };
	  /**
	  * @desc: 对指定的手势识别数组进行 0->1->2 方式的requireFailure设置.
	  */


	  GestureImp.prototype._requireFailure = function (recognizers) {
	    // 设置.触发条件以及并发.
	    var firstRecognizer = null;

	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i]) {
	        // 清理所有的设置.
	        recognizers[i].recognizer.requireFail = [];

	        if (firstRecognizer) {
	          firstRecognizer.recognizer.requireFailure(recognizers[i].recognizer);
	          firstRecognizer = recognizers[i];
	        } else {
	          firstRecognizer = recognizers[i];
	        }
	      }
	    }
	  };
	  /**
	  * @desc: 设置默认的requireFailure关系.
	  *
	  */


	  GestureImp.prototype._setupDefaultRequireFailure = function () {};

	  return GestureImp;
	}();

	var GlobalIcons = '$BpGlobalIcons';

	var Instance = function Instance() {
	  if (!window[GlobalIcons]) {
	    window[GlobalIcons] = new IconsData();
	  }

	  return window[GlobalIcons];
	};

	var IconsData =
	/** @class */
	function () {
	  function IconsData() {
	    this.installed = false;
	    this.icons = {}; //new Set();

	    this.icons_svgPath = {}; //new Map();

	    this.icons_alias = {}; //new Map();

	    this.icons_font = {}; //new Map();
	  }

	  return IconsData;
	}();

	function clearIcon(name) {
	  if (name && name.length > 0) {
	    delete Instance().icons[name];
	    delete Instance().icons_font[name];
	    delete Instance().icons_svgPath[name];
	    delete Instance().icons_alias[name];
	  }
	}
	/**
	* @desc: 列表所有的图标.
	* @return:
	*/


	function list() {
	  // return Instance().icons.keys();
	  return Object.keys(Instance().icons);
	}
	/**
	* @desc: 获取图标.
	*/


	function getIcon(iconName) {
	  var srcName = Instance().icons_alias[iconName];

	  if (srcName) {
	    iconName = srcName;
	  }

	  if (Instance().icons.hasOwnProperty(iconName)) {
	    var obj = {};
	    var v1 = Instance().icons_font[iconName];

	    if (v1) {
	      obj.type = 'font';
	      obj.value = v1;
	      return obj;
	    }

	    var v2 = Instance().icons_svgPath[iconName];

	    if (v2) {
	      obj.type = 'svg';
	      obj.value = v2;
	      return obj;
	    }
	  }

	  return null;
	}
	/**
	* @desc: 注册svg图标.
	*         可以webpack获取文件的发布路径: registerSvgIcon(iconName, require('fielpath'));
	* @param filePath: svg 文件路径;
	*/


	function registerSvgIcon(iconName, filePath) {
	  clearIcon(iconName);
	  Instance().icons[iconName] = true;
	  Instance().icons_svgPath[iconName] = filePath;
	}
	/**
	* @desc: 注册字体图标.
	*         e.g. registerFontIcon(iconName, 'bp-iconBack');
	* @param className: 可以指定一个类名或一组类名.
	* @return 返回当前的图标, 可以继续添加子图标.
	*/


	function registerFontIcon(iconName, className) {
	  clearIcon(iconName);
	  Instance().icons[iconName] = true;
	  var children = [];
	  Instance().icons_font[iconName] = {
	    className: className,
	    children: children
	  };
	  return children;
	}
	/**
	* @desc: 为指定图标注册一个新名称.
	*        如果名称已经存在则发生异常.
	*/


	function registerAliasIcon(aliasName, srcIconName) {
	  if (!Instance().icons.hasOwnProperty(srcIconName)) {
	    throw new Error('icon name `' + srcIconName + '` isn\'t existed!');
	  }

	  if (!Instance().icons.hasOwnProperty(aliasName)) {
	    Instance().icons_alias[aliasName] = srcIconName;
	  }
	}

	function registerDefault() {
	  if (!Instance().installed) {
	    registerFontIcon('arrowDown', 'bp-iconArrowDown');
	    registerFontIcon('arrowLeft', 'bp-iconArrowLeft');
	    registerFontIcon('arrowRight', 'bp-iconArrowRight');
	    registerFontIcon('arrowUp', 'bp-iconArrowUp');
	    registerFontIcon('cancel', 'bp-iconCancel');
	    registerFontIcon('delete', 'bp-iconDelete');
	    registerFontIcon('edit', 'bp-iconEdit');
	    registerFontIcon('heartFill', 'bp-iconHeartFill');
	    registerFontIcon('heart', 'bp-iconHeart');
	    registerFontIcon('locationPin', 'bp-iconLocationPin');
	    registerFontIcon('location', 'bp-iconLocation');
	    registerFontIcon('menu', 'bp-iconMenu');
	    registerFontIcon('minus', 'bp-iconMinus');
	    registerFontIcon('more', 'bp-iconMore');
	    registerFontIcon('ok', 'bp-iconOk');
	    registerFontIcon('plus', 'bp-iconPlus');
	    registerFontIcon('setting', 'bp-iconSetting');
	    registerFontIcon('starFill', 'bp-iconStarFill');
	    registerFontIcon('star', 'bp-iconStar');
	    registerFontIcon('user', 'bp-iconUser');
	    registerFontIcon('loading', 'bp-iconLoading').push('path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'path7', 'path8', 'path9', 'path10', 'path11', 'path12');
	    Instance().installed = true;
	  }
	}

	registerDefault();
	var Icons = {
	  list: list,
	  registerAliasIcon: registerAliasIcon,
	  registerFontIcon: registerFontIcon,
	  registerSvgIcon: registerSvgIcon,
	  registerDefault: registerDefault,
	  getIcon: getIcon
	};

	var bpLibs = {};
	Object.defineProperty(bpLibs, 'router', {
	  get: function get() {
	    return router;
	  }
	});
	Object.defineProperty(bpLibs, 'dom', {
	  get: function get() {
	    return dom;
	  }
	});
	Object.defineProperty(bpLibs, 'device', {
	  get: function get() {
	    return device;
	  }
	});
	Object.defineProperty(bpLibs, 'icons', {
	  get: function get() {
	    return Icons;
	  }
	});
	Object.defineProperty(bpLibs, 'registerApp', {
	  get: function get() {
	    return registerApp;
	  }
	});
	Object.defineProperty(bpLibs, 'Timer', {
	  get: function get() {
	    return Timer;
	  }
	});
	Object.defineProperty(bpLibs, 'Gesture', {
	  get: function get() {
	    return GestureImp;
	  }
	});

	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

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

	var defineProperty$4 = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;





	var setInternalState$4 = internalState.set;



	var MATCH$1 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;

	var FORCED$3 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$2 || fails(function () {
	  re2[MATCH$1] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor
	if (FORCED$3) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y$2) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(
	      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
	      thisIsRegExp ? this : RegExpPrototype$1,
	      RegExpWrapper
	    );

	    if (UNSUPPORTED_Y$2 && sticky) setInternalState$4(result, { sticky: sticky });

	    return result;
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$4(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$1 = getOwnPropertyNames(NativeRegExp);
	  var index = 0;
	  while (keys$1.length > index) proxy(keys$1[index++]);
	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var smoothscroll = createCommonjsModule(function (module, exports) {
	  /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
	  (function () {

	    function polyfill() {
	      // aliases
	      var w = window;
	      var d = document; // return if scroll behavior is supported and polyfill is not forced

	      if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
	        return;
	      } // globals


	      var Element = w.HTMLElement || w.Element;
	      var SCROLL_TIME = 468; // object gathering original scroll methods

	      var original = {
	        scroll: w.scroll || w.scrollTo,
	        scrollBy: w.scrollBy,
	        elementScroll: Element.prototype.scroll || scrollElement,
	        scrollIntoView: Element.prototype.scrollIntoView
	      }; // define timing method

	      var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
	      /**
	       * indicates if a the current browser is made by Microsoft
	       * @method isMicrosoftBrowser
	       * @param {String} userAgent
	       * @returns {Boolean}
	       */

	      function isMicrosoftBrowser(userAgent) {
	        var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];
	        return new RegExp(userAgentPatterns.join('|')).test(userAgent);
	      }
	      /*
	       * IE has rounding bug rounding down clientHeight and clientWidth and
	       * rounding up scrollHeight and scrollWidth causing false positives
	       * on hasScrollableSpace
	       */


	      var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
	      /**
	       * changes scroll position inside an element
	       * @method scrollElement
	       * @param {Number} x
	       * @param {Number} y
	       * @returns {undefined}
	       */

	      function scrollElement(x, y) {
	        this.scrollLeft = x;
	        this.scrollTop = y;
	      }
	      /**
	       * returns result of applying ease math function to a number
	       * @method ease
	       * @param {Number} k
	       * @returns {Number}
	       */


	      function ease(k) {
	        return 0.5 * (1 - Math.cos(Math.PI * k));
	      }
	      /**
	       * indicates if a smooth behavior should be applied
	       * @method shouldBailOut
	       * @param {Number|Object} firstArg
	       * @returns {Boolean}
	       */


	      function shouldBailOut(firstArg) {
	        if (firstArg === null || _typeof(firstArg) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
	          // first argument is not an object/null
	          // or behavior is auto, instant or undefined
	          return true;
	        }

	        if (_typeof(firstArg) === 'object' && firstArg.behavior === 'smooth') {
	          // first argument is an object and behavior is smooth
	          return false;
	        } // throw error when behavior is not supported


	        throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
	      }
	      /**
	       * indicates if an element has scrollable space in the provided axis
	       * @method hasScrollableSpace
	       * @param {Node} el
	       * @param {String} axis
	       * @returns {Boolean}
	       */


	      function hasScrollableSpace(el, axis) {
	        if (axis === 'Y') {
	          return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
	        }

	        if (axis === 'X') {
	          return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
	        }
	      }
	      /**
	       * indicates if an element has a scrollable overflow property in the axis
	       * @method canOverflow
	       * @param {Node} el
	       * @param {String} axis
	       * @returns {Boolean}
	       */


	      function canOverflow(el, axis) {
	        var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];
	        return overflowValue === 'auto' || overflowValue === 'scroll';
	      }
	      /**
	       * indicates if an element can be scrolled in either axis
	       * @method isScrollable
	       * @param {Node} el
	       * @param {String} axis
	       * @returns {Boolean}
	       */


	      function isScrollable(el) {
	        var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
	        var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');
	        return isScrollableY || isScrollableX;
	      }
	      /**
	       * finds scrollable parent of an element
	       * @method findScrollableParent
	       * @param {Node} el
	       * @returns {Node} el
	       */


	      function findScrollableParent(el) {
	        while (el !== d.body && isScrollable(el) === false) {
	          el = el.parentNode || el.host;
	        }

	        return el;
	      }
	      /**
	       * self invoked function that, given a context, steps through scrolling
	       * @method step
	       * @param {Object} context
	       * @returns {undefined}
	       */


	      function step(context) {
	        var time = now();
	        var value;
	        var currentX;
	        var currentY;
	        var elapsed = (time - context.startTime) / SCROLL_TIME; // avoid elapsed times higher than one

	        elapsed = elapsed > 1 ? 1 : elapsed; // apply easing to elapsed time

	        value = ease(elapsed);
	        currentX = context.startX + (context.x - context.startX) * value;
	        currentY = context.startY + (context.y - context.startY) * value;
	        context.method.call(context.scrollable, currentX, currentY); // scroll more if we have not reached our destination

	        if (currentX !== context.x || currentY !== context.y) {
	          w.requestAnimationFrame(step.bind(w, context));
	        }
	      }
	      /**
	       * scrolls window or element with a smooth behavior
	       * @method smoothScroll
	       * @param {Object|Node} el
	       * @param {Number} x
	       * @param {Number} y
	       * @returns {undefined}
	       */


	      function smoothScroll(el, x, y) {
	        var scrollable;
	        var startX;
	        var startY;
	        var method;
	        var startTime = now(); // define scroll context

	        if (el === d.body) {
	          scrollable = w;
	          startX = w.scrollX || w.pageXOffset;
	          startY = w.scrollY || w.pageYOffset;
	          method = original.scroll;
	        } else {
	          scrollable = el;
	          startX = el.scrollLeft;
	          startY = el.scrollTop;
	          method = scrollElement;
	        } // scroll looping over a frame


	        step({
	          scrollable: scrollable,
	          method: method,
	          startTime: startTime,
	          startX: startX,
	          startY: startY,
	          x: x,
	          y: y
	        });
	      } // ORIGINAL METHODS OVERRIDES
	      // w.scroll and w.scrollTo


	      w.scroll = w.scrollTo = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset, // use top prop, second argument if present or fallback to scrollY
	          arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
	      }; // w.scrollBy


	      w.scrollBy = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0])) {
	          original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
	      }; // Element.prototype.scroll and Element.prototype.scrollTo


	      Element.prototype.scroll = Element.prototype.scrollTo = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          // if one number is passed, throw error to match Firefox implementation
	          if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
	            throw new SyntaxError('Value could not be converted');
	          }

	          original.elementScroll.call(this, // use left prop, first number argument or fallback to scrollLeft
	          arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft, // use top prop, second argument or fallback to scrollTop
	          arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);
	          return;
	        }

	        var left = arguments[0].left;
	        var top = arguments[0].top; // LET THE SMOOTHNESS BEGIN!

	        smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
	      }; // Element.prototype.scrollBy


	      Element.prototype.scrollBy = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
	          return;
	        }

	        this.scroll({
	          left: ~~arguments[0].left + this.scrollLeft,
	          top: ~~arguments[0].top + this.scrollTop,
	          behavior: arguments[0].behavior
	        });
	      }; // Element.prototype.scrollIntoView


	      Element.prototype.scrollIntoView = function () {
	        // avoid smooth behavior if not required
	        if (shouldBailOut(arguments[0]) === true) {
	          original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        var scrollableParent = findScrollableParent(this);
	        var parentRects = scrollableParent.getBoundingClientRect();
	        var clientRects = this.getBoundingClientRect();

	        if (scrollableParent !== d.body) {
	          // reveal element inside parent
	          smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top); // reveal parent in viewport unless is fixed

	          if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
	            w.scrollBy({
	              left: parentRects.left,
	              top: parentRects.top,
	              behavior: 'smooth'
	            });
	          }
	        } else {
	          // reveal element in viewport
	          w.scrollBy({
	            left: clientRects.left,
	            top: clientRects.top,
	            behavior: 'smooth'
	          });
	        }
	      };
	    }

	    {
	      // commonjs
	      module.exports = {
	        polyfill: polyfill
	      };
	    }
	  })();
	});
	var smoothscroll_1 = smoothscroll.polyfill;

	function install(Vue, ctx, g) {
	  // kick off the polyfill!
	  // eslint-disable-next-line
	  if (!!!g.navigator.userAgent.toLowerCase().match(/chrome/) && !g.$srcScrollTo) {
	    g.$srcScrollTo = (window || window).scrollTo;
	    smoothscroll.polyfill();
	  }
	}

	var s_timer = '$BpTimer';
	function beforeCreate(Vue, ctx) {
	  if (!ctx[s_timer]) {
	    ctx[s_timer] = new Timer();
	    Object.defineProperty(ctx, '$timer', {
	      get: function get() {
	        return ctx[s_timer];
	      }
	    });
	    Object.defineProperty(ctx, '$bpTimer', {
	      get: function get() {
	        return ctx[s_timer];
	      }
	    });
	  }
	}
	function beforeDestroy(Vue, ctx) {
	  if (ctx[s_timer]) {
	    ctx[s_timer].dispose();
	    ctx[s_timer] = null;
	  }
	}

	var defineProperty$5 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$5(FunctionPrototype, NAME, {
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

	var bpIcon = {
	  name: 'bpIcon',
	  props: {
	    name: {
	      type: String,
	      required: true
	    },
	    width: {
	      type: String,
	      required: false
	    },
	    height: {
	      type: String,
	      required: false
	    },
	    color: {
	      type: String,
	      required: false
	    },
	    event: {
	      validator: function validator(value) {
	        var type = _typeof(value);

	        return !value || type === 'string' || Array.isArray(value);
	      },
	      "default": 'click'
	    }
	  },
	  mounted: function mounted() {},
	  render: function render(createElement) {
	    var _this = this;

	    var icon = Icons.getIcon(this.name);

	    if (!icon) {
	      console.log('icon: ' + this.name + ' isn\'t registered');
	      return createElement('i', {
	        "class": ['bp-icon'],
	        style: {}
	      }, this.$slots["default"]);
	    }

	    icon = icon || {
	      value: ''
	    };
	    var dataRender = {
	      "class": ['bp-icon'],
	      style: {}
	    };

	    if (this.width) {
	      dataRender.style.width = this.width;
	    }

	    if (this.height) {
	      dataRender.style.height = this.height;
	    }

	    if (dataRender.style.width && !dataRender.style.height) {
	      dataRender.style.height = dataRender.style.width;
	    } else if (!dataRender.style.width && dataRender.style.height) {
	      dataRender.style.width = dataRender.style.height;
	    } // event.


	    var handler = function handler(name) {
	      var _this2 = this;

	      _newArrowCheck(this, _this);

	      return function (e) {
	        _newArrowCheck(this, _this2);

	        this.$emit(name, e);
	      }.bind(this);
	    }.bind(this);

	    var on = {};

	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) {
	        _newArrowCheck(this, _this);

	        on[e] = handler(e);
	      }.bind(this));
	    } else {
	      on[this.event] = handler(this.event);
	    }

	    dataRender.on = on; // svg.

	    if (icon.type == 'svg') {
	      dataRender.style.backgroundImage = "url(".concat(icon.value, ")");
	      return createElement('i', dataRender, this.$slots["default"]);
	    } else {
	      dataRender["class"].push(icon.value.className);
	      var children = [];

	      for (var i = 0; i < icon.value.children.length; i++) {
	        var data1 = {
	          "class": []
	        };
	        data1["class"] = [icon.value.children[i]];
	        children.push(createElement('i', data1));
	      }

	      if (this.$slots["default"]) {
	        children.push(this.$slots["default"]);
	      }

	      if (dataRender.style.width) {
	        dataRender.style.fontSize = dataRender.style.width;
	      }

	      if (this.color) {
	        dataRender.style.color = this.color;
	      }

	      return createElement('i', dataRender, children);
	    }
	  }
	};

	var _Vue;

	function makeInstall() {
	  return function install$1(vue, options) {
	    if (install$1.installed && _Vue === vue) return;
	    install$1.installed = true;
	    _Vue = vue;
	    var g = window || window;
	    install(vue, this, g);
	    vue.mixin({
	      mounted: function mounted() {},
	      beforeCreate: function beforeCreate$1() {
	        beforeCreate(vue, this);
	      },
	      created: function created() {},
	      beforeDestroy: function beforeDestroy$1() {
	        beforeDestroy(vue, this);
	      }
	    });
	    Object.defineProperty(vue.prototype, '$bpLibs', {
	      get: function get() {
	        return bpLibs;
	      }
	    });
	    vue.component('bpIcon', bpIcon);
	  };
	}

	function VuePlugin () {
	  bpLibs.icons.registerDefault();
	  return {
	    install: makeInstall()
	  };
	}

	// if (process.env.NODE_ENV == 'development') {

	(window || window).bpLibs = bpLibs; // }

	bpLibs.VuePlugin = VuePlugin;
	bpLibs.VueObject = {
	  bpIcon: bpIcon
	};

	return bpLibs;

})));
//# sourceMappingURL=index.js.map
