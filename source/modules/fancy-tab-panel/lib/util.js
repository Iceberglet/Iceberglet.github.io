'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var postpone = exports.postpone = function postpone(func) {
  var graceTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

  var timer = void 0;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    var timer = setTimeout(function () {
      return func();
    }, graceTime);
  };
};

var arrayToMap = exports.arrayToMap = function arrayToMap(arr, keyProvider) {
  var res = {};
  if (!arr || !(arr instanceof Array)) {
    throw new Error('Received non array: ', arr);
  }
  if (!keyProvider || !(typeof keyProvider === 'function')) {
    throw new Error('Received non function: ', keyProvider);
  }
  arr.forEach(function (item) {
    return res[keyProvider(item)] = item;
  });
  return res;
};

var idGenerator = exports.idGenerator = function idGenerator() {
  var counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

Array.prototype.max = function (f) {
  var idx = 0,
      max = f ? f(this[0]) : this[0];
  for (var i = 1; i < this.length; i++) {
    var item = f ? f(this[i]) : this[i];
    if (item > max) {
      idx = i;
      max = item;
    }
  }
  return this[idx];
};
//# sourceMappingURL=util.js.map