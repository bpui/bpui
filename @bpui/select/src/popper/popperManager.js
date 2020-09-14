const Instances = {};
const PoperManager = {};
const keyPrefix = '_poper_key_'
const uid = 0;

PoperManager.register = function (vm) {
  const _key = `${keyPrefix}${++uid}`;
  Instances[_key] = vm;
  return _key;
}
PoperManager.unRegister = function (key) {
  Instances[key] = null;
  delete Instances[key];
}
PoperManager.getItem = function (key) {
  return Instances[key] || null;
}

function Poper({
  referrenceEl,
  el
}) {

}



export default PoperManager
