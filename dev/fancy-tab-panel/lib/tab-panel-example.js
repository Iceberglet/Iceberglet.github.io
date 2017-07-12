'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanelExample = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tabPanelBase = require('./tab-panel-base');

var _tab = require('./tab');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPanelExample = exports.TabPanelExample = _react2.default.createClass({
  displayName: 'TabPanelExample',
  render: function render() {
    return _react2.default.createElement(_tabPanelBase.TabPanelBase, { items: [new _tab.Tab('Intro'), new _tab.Tab('Tab 1'), new _tab.Tab('Tab 2'), new _tab.Tab('Tab 3')] });
  }
});
//# sourceMappingURL=tab-panel-example.js.map