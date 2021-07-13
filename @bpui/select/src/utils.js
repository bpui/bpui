var _toString = Object.prototype.toString;
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

const looseEqual = function(a, b) {
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};

const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};


export function isArrayEqualByKey(v1, v2, keys) {
  if (!v1 && !v2) {
    return true;
  }

  if (Array.isArray(v1) && Array.isArray(v2) && v1.length == v2.length) {
    for (let i = 0; i < v1.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (Array.isArray(v1[i][keys[j]])) {
          if (!isArrayEqualByKey(v1[i][keys[j]], v2[i][keys[j]], keys)) {
            return false;
          }
        }
        else if (v1[i][keys[j]] != v2[i][keys[j]]) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}