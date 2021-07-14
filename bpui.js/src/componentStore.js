
// const SymComponent = Symbol('$BpSymCompon?ent');
var SymComponent = ('$BpSymComponent');


export function setComponent(name, com) {
  if (!window[SymComponent]) {
    window[SymComponent] = {};
  }
  window[SymComponent][name] = com;
}

export function getComponent(name) {
  if (!window[SymComponent]) {
    window[SymComponent] = {};
  }

  if (window[SymComponent][name]) {
    return window[SymComponent][name];
  }

  return null;
}