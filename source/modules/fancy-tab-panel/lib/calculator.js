'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate = undefined;

var _constants = require('./constants');

var calculate = exports.calculate = function calculate(totalWidth, number) {
  var considersCrossButton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var maxTabWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;
  var wedgePercentage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.12;

  var tabWidth = totalWidth / (number + wedgePercentage);
  tabWidth = Math.min(maxTabWidth, tabWidth);
  if (considersCrossButton) {
    tabWidth = Math.max(tabWidth, _constants.CROSS_WIDTH);
  }
  var tabWidthFull = tabWidth * (1 + wedgePercentage);
  var wedgeWidth = tabWidth * wedgePercentage;
  var contentWidth = tabWidth - wedgeWidth;

  var res = [],
      left = 0;
  for (var i = 0; i < number; i++) {
    res.push({
      width: tabWidthFull,
      wedgeWidth: wedgeWidth, left: left, contentWidth: contentWidth
    });
    left += tabWidth;
  }
  return res;
};
//# sourceMappingURL=calculator.js.map