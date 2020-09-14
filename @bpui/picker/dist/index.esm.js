/*!
 * bpui picker v0.1.30
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

import { dom, string, utils } from 'febs-browser';
import bpLibs from '@bpui/libs';
import bpDialog from '@bpui/dialog';

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

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
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

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

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
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$1
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

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$2
};

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

var nativePromiseConstructor = global_1.Promise;

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

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

var SPECIES$1 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
};

var html = getBuiltIn('document', 'documentElement');

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process = global_1.process;
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
  if (classofRaw(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
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
var process$1 = global_1.process;
var Promise$1 = global_1.Promise;
var IS_NODE = classofRaw(process$1) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$1.domain)) parent.exit();
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
      process$1.nextTick(flush);
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

var process$2 = global_1.process;
var versions = process$2 && process$2.versions;
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

var task$1 = task.set;










var SPECIES$2 = wellKnownSymbol('species');
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
  constructor[SPECIES$2] = FakePromise;
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

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
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
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
var thisNumberValue = function (value) {
  if (typeof value != 'number' && classofRaw(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
var stringRepeat = ''.repeat || function repeat(count) {
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
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
_export({ target: 'Number', proto: true, forced: FORCED$1 }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor$1(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor$1(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
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
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + stringRepeat.call('0', fractDigits);
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







var SPECIES$3 = wellKnownSymbol('species');

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

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
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

var max$1 = Math.max;
var min$2 = Math.min;
var floor$2 = Math.floor;
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
        var position = max$1(min$2(toInteger(result.index), S.length), 0);
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
            var f = floor$2(n / 10);
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

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var arrayPush = [].push;
var min$3 = Math.min;
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
          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

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
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
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
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

var POS_CENTER = 120;
var POS_CELL_HEIGHT = 40;
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
        dom.removeEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
        dom.removeEventListener(target, 'touchend', mobile_onTouchend_picker, true);
        dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
        dom.addEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
        dom.addEventListener(target, 'touchend', mobile_onTouchend_picker, true);
        dom.addEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
      } else {
        dom.removeEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
        dom.removeEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
        dom.removeEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
        dom.addEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
        dom.addEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
        dom.addEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
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
    dom.removeEventListener(target, 'touchmove', mobile_onTouchmove_picker, true);
    dom.removeEventListener(target, 'touchend', mobile_onTouchend_picker, true);
    dom.removeEventListener(target, 'touchcancel', mobile_onTouchcancel_picker, true);
  } else {
    dom.removeEventListener(target, 'mousemove', mobile_onTouchmove_picker, true);
    dom.removeEventListener(target, 'mouseup', mobile_onTouchend_picker, true);
    dom.removeEventListener(target, 'mouseout', mobile_onTouchcancel_picker, true);
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
    var off = -(touch.clientY - dom.getElementOffset(event.currentTarget).top);
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

  if (string.isEmpty(offset)) {
    offset = 0;
  } else {
    offset = offset.split(',');
    offset = offset[1] || '0';
    offset = string.trim(offset);
    offset = string.replace(offset, 'px', '');
    offset = parseFloat(offset);
  }

  return offset;
}

var script = {
  components: {
    bpIcon: bpLibs.VueObject.bpIcon,
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
        return _typeof(value) === 'object' || Array.isArray(value);
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
      visibleReal: false,
      visibleRealByProperty: false,

      /**
       * @desc: 数据源.
       */
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

      if (this.noEmitUpdateWatch) {
        this.noEmitUpdateWatch = false;
        return;
      }

      if (v === vOld) return;

      var t = _typeof(v);

      if (t === 'string' || t === 'number') {
        this.value0 = v;
        this.$nextTick(function () {
          _newArrowCheck(this, _this);

          this.setSelect(0, v, false);
        }.bind(this));
      } else if (Array.isArray(v)) {
        if (isArrayEqual(v, vOld)) {
          return;
        }

        this.$nextTick(function () {
          _newArrowCheck(this, _this);

          for (var i = 0; i < v.length && i < this.groupCount; i++) {
            this['value' + i] = v[i];
            this.setSelect(i, v[i], false);
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
      if (v == oldVal) return;
      this.$emit('update:visible', v);

      if (v) {
        var value = this.getValue();

        if (Array.isArray(value)) {
          for (var i = 0; i < value.length && i < 4; i++) {
            this.setSelect(i, value[i], false);
          }
        } else {
          this.setSelect(0, value, false);
        }
      }

      if (!v && !this.visibleRealByProperty) {
        this._onCancel();
      }

      this.visibleRealByProperty = false;
    },
    datasource: function datasource(val, oldVal) {
      var _this2 = this;

      if (val && oldVal) {
        if (isArrayEqualByKey(val, oldVal, ['label', 'value', 'children'])) {
          return;
        }
      }

      var isShow = this.visibleReal;

      if (isShow) {
        this.timer.sleep(300).then(function () {
          _newArrowCheck(this, _this2);

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
    this.timer = new bpLibs.Timer();
  },
  beforeMount: function beforeMount() {
    if (!this.datasource) {
      throw new Error('picker must have datasource');
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
    },

    /**
     * @desc: 设置指定组的当前选中值.
     * @param groupIndex: 组索引.
     * @param value: 匹配值.
     * @param trigger: 是否触发change事件.
     */
    setSelect: function setSelect(groupIndex, value) {
      var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
                  this.realDatasource.picker_changed(groupIndex, this);
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

    /**
     * @desc: 获得当前界面上选中的元素的值.
     * @param groupIndex: 明确指定后可以获得指定组的值.
     * @return 值.
     */
    getSelect: function getSelect() {
      var groupIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var data = this['items' + groupIndex];

      if (data) {
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

            if (data[offset]) {
              return utils.mergeMap(data[offset]);
            }
          } // if.

        }

        return data[0] ? data[0] : {};
      } // if.


      return {};
    },
    getValue: function getValue() {
      var v;

      if (this.groupCount == 1) {
        v = this.value0;
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
        v = this.getSelect(0).value;
      } else if (this.groupCount == 2) {
        v = [this.getSelect(0).value, this.getSelect(1).value];
      } else if (this.groupCount == 3) {
        v = [this.getSelect(0).value, this.getSelect(1).value, this.getSelect(2).value];
      } else {
        v = [this.getSelect(0).value, this.getSelect(1).value, this.getSelect(2).value, this.getSelect(3).value];
      }

      this.$emit('change', v);
    },
    _onConfirm: function _onConfirm() {
      var v;

      if (this.groupCount == 1) {
        this.value0 = this.getSelect(0).value;
        v = this.value0;
      } else if (this.groupCount == 2) {
        this.value0 = this.getSelect(0).value;
        this.value1 = this.getSelect(1).value;
        v = [this.value0, this.value1];
      } else if (this.groupCount == 3) {
        this.value0 = this.getSelect(0).value;
        this.value1 = this.getSelect(1).value;
        this.value2 = this.getSelect(2).value;
        v = [this.value0, this.value1, this.value2];
      } else {
        this.value0 = this.getSelect(0).value;
        this.value1 = this.getSelect(1).value;
        this.value2 = this.getSelect(2).value;
        this.value3 = this.getSelect(3).value;
        v = [this.value0, this.value1, this.value2, this.value3];
      }

      this.noEmitUpdateWatch = true;
      this.$emit('input', v);
      this.$emit('confirm', this);
    },
    _bindEvent: function _bindEvent() {
      var _this3 = this;

      var elHd = this.$refs.agentToolbar;
      var elMain = $(this.$refs.agentMain);
      var elBd = elMain.children('.bp-picker__group').children('.bp-picker__mask');
      var elBc = elMain.children('.bp-picker__group').children('.bp-picker__content'); // let elIndic = elBd.next('.bp-picker__indicator');

      if (elBc[0]) {
        for (var i = 0; i < elBc.length; i++) {
          $(elBc[i]).off('change').on('change', function (event) {
            _newArrowCheck(this, _this3);

            var group = parseInt($(event.currentTarget).attr('data-group'));
            this.realDatasource.picker_changed(group, this);

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

        for (var _i = 0; _i < elBd.length; _i++) {
          dom.removeEventListener(elBd[_i], namestart, mobile_onTouchstart_picker, true);
          dom.removeEventListener(elBd[_i], namemove, mobile_onTouchmove_picker, true);
          dom.removeEventListener(elBd[_i], nameend, mobile_onTouchend_picker, true);
          dom.removeEventListener(elBd[_i], namecancel, mobile_onTouchcancel_picker, true);
          dom.addEventListener(elBd[_i], namestart, mobile_onTouchstart_picker, true); // elBd[i].addEventListener(namemove, mobile_onTouchmove_picker, true);
          // elBd[i].addEventListener(nameend, mobile_onTouchend_picker, true);
          // elBd[i].addEventListener(namecancel, mobile_onTouchcancel_picker, true);
        }
      } // if.

    },

    /**
    * @desc: 重新获取指定组的数据源.
    * @return Promise. - resolve(value)
    */
    refreshDatasource: function refreshDatasource(groupIndex) {
      var _this4 = this;

      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new Promise(function (resolve, reject) {
        var _this5 = this;

        _newArrowCheck(this, _this4);

        var needEvent = false;
        var value;

        try {
          this.realDatasource.picker_datasource(groupIndex, this, function (ds) {
            var _this6 = this;

            _newArrowCheck(this, _this5);

            try {
              value = ds.value;

              if (!Array.isArray(ds.datasource)) {
                throw new Error('picker datasource must is Array');
              }

              if (!(!!this['items' + groupIndex] && !!ds.datasource)) needEvent = true;
              this['items' + groupIndex] = ds.datasource;
            } catch (e) {
              reject(e);
            }

            this.$nextTick(function () {
              var _this7 = this;

              _newArrowCheck(this, _this6);

              setTimeout(function () {
                _newArrowCheck(this, _this7);

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
      var _this8 = this;

      var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.realDatasource.picker_datasource_groups(function (groupCount) {
        var _this9 = this;

        _newArrowCheck(this, _this8);

        if (groupCount <= 0 || groupCount > 4) {
          throw new Error('picker group count must in [1,4]');
        }

        this.groupCount = groupCount;
        var p = new Promise(function (resolve) {
          _newArrowCheck(this, _this9);

          return resolve();
        }.bind(this));

        for (var i = 0; i < groupCount; i++) {
          p = p.then(utils.sleep(1).then(this.refreshDatasource(i, trigger)));
        }

        this.$nextTick(function () {
          var _this10 = this;

          _newArrowCheck(this, _this9);

          p.then(function () {
            _newArrowCheck(this, _this10);

            this._bindEvent();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    },

    /**
     * @desc: 初始化真实datasource.
     */
    _initRealDatasource: function _initRealDatasource(datasource) {
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
// https://tc39.github.io/ecma262/#sec-isarray
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
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
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
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$2 }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
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
    attrs: {
      visible: _vm.visibleReal,
      maskClose: _vm.maskClose,
      mask: _vm.mask,
      preventEvent: true
    },
    on: {
      "update:visible": function updateVisible($event) {
        _vm.visibleReal = $event;
      }
    }
  }, [_c("div", {
    staticClass: "bp-widget__contentWrap",
    "class": _vm.pageClass,
    style: _vm.pageStyle
  }, [_vm.$slots["toolbar"] ? _c("div", {
    staticClass: "bp-picker__toolbar bp-ellipsis"
  }, [_vm._t("toolbar")], 2) : _c("div", {
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
    on: {
      click: _vm._onConfirm
    }
  }, [_vm._v(_vm._s(_vm.confirmBtnText))])]), _vm._v(" "), _c("div", {
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
  }, _vm._l(_vm.items0, function (item, index) {
    return _c("div", {
      key: "_1" + index,
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
  })])])])]);
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

function ds_years(from, to, yearText) {
  var now = new Date();

  if (!from) {
    from = now.getFullYear() - 80;
  }

  if (!to) {
    to = now.getFullYear() + 80;
  }

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


function ds_months(monthText) {
  var ds = [];

  for (var i = 0; i < 12; i++) {
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


function ds_days(year, month, dateText) {
  var date = new Date(year, month + 1, 1, 0, 0, 0, 0);
  date.setTime(date.getTime() - 1000 * 60 * 60 * 23);
  var maxDate = date.getDate();
  var ds = [];

  for (var i = 1; i <= maxDate; i++) {
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
    this.yearText = cfg.yearText || '年';
    this.monthText = cfg.monthText || '月';
    this.dateText = cfg.dateText || '日';
    this.yearFrom = cfg.yearFrom;
    this.yearTo = cfg.yearTo;
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
        var now = new Date();
        callback({
          datasource: ds_years(this.yearFrom, this.yearTo, this.yearText),
          value: now.getFullYear()
        });
        return;
      } else if (groupIndex == 1) {
        var _now = new Date();

        callback({
          datasource: ds_months(this.monthText),
          value: _now.getMonth()
        });
        return;
      } else if (groupIndex == 2) {
        var value0 = picker.getSelect(0).value;
        var value1 = picker.getSelect(1).value;
        var value2 = picker.getSelect(2).value;

        var _now2 = new Date();

        var ds = ds_days(value0 ? value0 : _now2.getFullYear(), null === value1 || undefined === value1 ? _now2.getMonth() : value1, this.dateText);
        callback({
          datasource: ds,
          value: value2 ? value2 : _now2.getDate()
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
        picker.refreshDatasource(2).then(function (value) {
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

function ds_hours(hourText) {
  var ds = [];

  for (var i = 0; i < 24; i++) {
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


function ds_mins(minuteText) {
  var ds = [];

  for (var i = 0; i < 60; i++) {
    ds.push({
      label: (i < 10 ? '0' + i : i) + (minuteText ? ' ' + minuteText : ''),
      value: i
    });
  }

  return ds;
}

var _default$4 = /*#__PURE__*/function () {
  /**
  * @param ds: [{label:'', value:0, children:[]}, ],  // 数据源.
  */
  function _default(cfg) {
    _classCallCheck(this, _default);

    cfg = cfg || {};
    this.hourText = cfg.hourText || '时';
    this.minuteText = cfg.minuteText || '分';
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
        var now = new Date();
        callback({
          datasource: ds_hours(this.hourText),
          value: now.getHours()
        });
      } else if (groupIndex == 1) {
        var _now = new Date();

        callback({
          datasource: ds_mins(this.minuteText),
          value: _now.getMinutes()
        });
      }
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

var index = {
  bpPicker: __vue_component__,
  PickerDateDatasource: _default$3,
  PickerDoubleDatasource: _default$1,
  PickerSingleDatasource: _default,
  PickerThreeDatasource: _default$2,
  PickerTimeDatasource: _default$4
};

export default index;
//# sourceMappingURL=index.esm.js.map
