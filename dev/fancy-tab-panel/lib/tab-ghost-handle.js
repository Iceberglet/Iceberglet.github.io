'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabGhostHandle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabGhostHandle = exports.TabGhostHandle = _react2.default.createClass({
  displayName: 'TabGhostHandle',

  propTypes: {
    tabDragState: _react2.default.PropTypes.object,

    tabStyle: _react2.default.PropTypes.object,
    children: _react2.default.PropTypes.node
  },

  componentDidMount: function componentDidMount() {
    this.props.tabDragState.setGhost(this);
    this.ghostEl = _reactDom2.default.findDOMNode(this.refs.ghost);
  },
  updateLeft: function updateLeft(left) {
    this.ghostEl.style.left = left + 'px';
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'tab-ghost-handle', style: this.props.tabStyle, ref: 'ghost' },
      this.props.children
    );
  }
});
//# sourceMappingURL=tab-ghost-handle.js.map