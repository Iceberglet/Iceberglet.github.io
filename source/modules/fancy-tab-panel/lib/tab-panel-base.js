'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanelBase = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tab = require('./tab');

var _fancyTabPanel = require('./fancy-tab-panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPanelBase = exports.TabPanelBase = _react2.default.createClass({
  displayName: 'TabPanelBase',
  getInitialState: function getInitialState() {
    var items = [new _tab.Tab('Intro'), new _tab.Tab('Tab 1'), new _tab.Tab('Tab 2'), new _tab.Tab('Tab 3')];
    return {
      items: items, selected: items[0].id
    };
  },
  onSelectTab: function onSelectTab(id) {
    this.setState({ selected: id });
  },
  onAddTab: function onAddTab() {
    this.setState(function (s) {
      var tab = new _tab.Tab('New Tab');
      s.items.push(tab);
      s.selected = tab.id;
      return s;
    });
  },
  onRemoveTab: function onRemoveTab(id) {
    this.setState(function (s) {
      var deleted = s.items.findIndex(function (item) {
        return item.id === id;
      });
      s.items.splice(deleted, 1);
      if (id === s.selected) {
        if (s.items.length > 0) s.selected = s.items[s.items.length - 1].id;
      }
      return s;
    });
  },
  onFinishDrag: function onFinishDrag(items) {
    this.setState({
      items: items
    });
  },
  render: function render() {
    var _this = this;

    var item = this.state.items.find(function (item) {
      return item.id === _this.state.selected;
    }) || {};
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_fancyTabPanel.FancyTabPanel, { onSelectTab: this.onSelectTab,
        onAddTab: this.onAddTab,
        onRemoveTab: this.onRemoveTab,
        onFinishDrag: this.onFinishDrag,
        selected: this.state.selected,
        items: this.state.items
      }),
      _react2.default.createElement(
        'div',
        null,
        'You Just Selected ' + item.title
      )
    );
  }
});
//# sourceMappingURL=tab-panel-base.js.map