'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanelCore = exports.Tab = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

require('./index.scss');

var _util = require('./util');

var _calculator = require('./calculator');

var _constants = require('./constants');

var _tabGhostHandle = require('./tab-ghost-handle');

var _tab = require('./tab');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tab = _tab.Tab;


var iconStyle = {
  width: _constants.CROSS_WIDTH + 'px'
};

var TabPanelCore = exports.TabPanelCore = _react2.default.createClass({
  displayName: 'TabPanelCore',

  propTypes: {
    onSelectTab: _react2.default.PropTypes.func.isRequired,
    selected: _react2.default.PropTypes.number.isRequired,
    onAddTab: _react2.default.PropTypes.func,
    onRemoveTab: _react2.default.PropTypes.func,
    allowRemoveAll: _react2.default.PropTypes.bool,
    allowDnD: _react2.default.PropTypes.bool,
    onFinishDrag: _react2.default.PropTypes.func.isRequired,
    items: _react2.default.PropTypes.array },

  getDefaultProps: function getDefaultProps() {
    return {
      allowDnD: true,
      allowRemoveAll: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    var _this = this;

    var newOnes = props.items.filter(function (i) {
      return !_this.state.items.find(function (ii) {
        return ii.id === i.id;
      });
    });

    var toDelete = this.state.items.filter(function (i) {
      return !props.items.find(function (ii) {
        return ii.id === i.id;
      });
    });


    newOnes.forEach(function (o) {
      return o.type = 'entering';
    });

    this.recalculateTabPositions(null, props.items.slice(0), toDelete);
  },
  getInitialState: function getInitialState() {
    var stateItems = this.props.items.slice(0);
    return {
      totalWidth: 0,
      tabPositions: null,
      items: stateItems };
  },
  recalculateTabPositions: function recalculateTabPositions(totalWidth, items) {
    var _this2 = this;

    var toDelete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    totalWidth = totalWidth || this.state.totalWidth;
    items = items || this.state.items;
    var res = (0, _calculator.calculate)(totalWidth, items.length, this.props.onRemoveTab, _constants.MAX_TAB_WIDTH);
    this.setState({
      totalWidth: totalWidth, items: items,
      toDelete: toDelete,
      tabPositions: res
    }, function () {
      setTimeout(function () {
        _this2.setState(function (s) {
          s.items.forEach(function (o) {
            if (o.type === 'entering') o.type = 'normal';
          });
          s.toDelete = [];
        });
      }, _constants.TAB_ANIMATION_DURATION);
    });
  },
  onContainerResize: function onContainerResize(contentRect) {
    var _contentRect$bounds = contentRect.bounds,
        width = _contentRect$bounds.width,
        height = _contentRect$bounds.height;

    if (this.props.onAddTab) {
      width -= _constants.ADD_WIDTH;
    }
    this.recalculateTabPositions(width);
  },
  onClickRemove: function onClickRemove(e, id) {
    e.stopPropagation();
    this.props.onRemoveTab(id);
  },
  updateDrag: function updateDrag(oldIdx, newIdx, callback) {
    this.setState(function (s) {
      var replacedTab = s.items[oldIdx];
      s.items[oldIdx] = s.items[newIdx];
      s.items[newIdx] = replacedTab;
    }, callback);
  },
  startDrag: function startDrag(e, idx, id) {
    this.props.onSelectTab(id);

    if (this.props.allowDnD) {
      var selObj = window.getSelection();
      selObj.removeAllRanges();
      document.onselectstart = function () {
        return false;
      };

      this.setState({
        tabDragState: new _tab.TabDragState(e, this.state.tabPositions, this.state.items, idx, this.endDrag, this.updateDrag)
      });
    }
  },
  endDrag: function endDrag() {
    var _this3 = this;

    delete this.state.tabDragState;
    document.onselectstart = null;
    this.setState({
      tabDragState: null
    }, function () {
      return _this3.props.onFinishDrag(_this3.state.items);
    });
  },
  renderTab: function renderTab(tab, idx) {
    var _this4 = this;

    var id = tab.id,
        title = tab.title;

    if (this.state.totalWidth > 0 && this.state.tabPositions) {
      var _state$tabPositions$i = this.state.tabPositions[idx],
          width = _state$tabPositions$i.width,
          left = _state$tabPositions$i.left,
          wedgeWidth = _state$tabPositions$i.wedgeWidth,
          contentWidth = _state$tabPositions$i.contentWidth;

      var tabTitleWidth = this.props.onRemoveTab ? contentWidth - _constants.CROSS_WIDTH : contentWidth;
      var tabStyle = {
        height: _constants.TAB_HEIGHT + 'px',
        left: left + 'px',
        width: width + 'px'
      };
      var tabContentStyle = (0, _extends3.default)({}, tabStyle, {
        left: wedgeWidth + 'px',
        width: contentWidth + 'px'
      });
      var pathD = 'M ' + width + ' ' + _constants.TAB_HEIGHT + ' L ' + (width - wedgeWidth) + ' 1 L ' + wedgeWidth + ' 1 L 0 ' + _constants.TAB_HEIGHT;
      if (id !== this.props.selected) {
        pathD += ' Z';
      }

      if (tab.type === 'ghostPlaceholder') {
        if (!this.state.tabDragState || !this.state.tabPositions) return null;
        var _pathD = 'M ' + width + ' ' + _constants.TAB_HEIGHT + ' L ' + (width - wedgeWidth) + ' 1 L ' + wedgeWidth + ' 1 L 0 ' + _constants.TAB_HEIGHT;
        return _react2.default.createElement(
          _tabGhostHandle.TabGhostHandle,
          { tabDragState: this.state.tabDragState, key: id, tabStyle: tabStyle, title: title },
          _react2.default.createElement(
            'svg',
            null,
            _react2.default.createElement('path', { d: _pathD })
          ),
          _react2.default.createElement(
            'div',
            { className: 'tab-content', style: tabContentStyle },
            _react2.default.createElement(
              'div',
              { className: 'tab-title no-select', style: { width: tabTitleWidth, lineHeight: _constants.TAB_HEIGHT + 'px' } },
              title
            )
          )
        );
      }

      var tabClass = 'tab ' + (id === this.props.selected && ' selected ') + (tab.type === 'entering' && ' entering ');

      return _react2.default.createElement(
        'div',
        { style: tabStyle, key: id, className: tabClass },
        _react2.default.createElement(
          'svg',
          null,
          _react2.default.createElement('path', { d: pathD })
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-content', style: tabContentStyle },
          _react2.default.createElement(
            'div',
            { className: 'tab-title no-select', style: { width: tabTitleWidth, lineHeight: _constants.TAB_HEIGHT + 'px' }, onMouseDown: function onMouseDown(e) {
                return _this4.startDrag(e, idx, id);
              } },
            title
          ),
          this.props.onRemoveTab && (this.state.items.length > 1 || this.props.allowRemoveAll) ? _react2.default.createElement(
            'div',
            { className: 'tab-delete-icon', style: (0, _extends3.default)({}, iconStyle, { height: _constants.TAB_HEIGHT + 'px' }) },
            _react2.default.createElement('i', { className: 'fa fa-times', onClick: function onClick(e) {
                return _this4.onClickRemove(e, id);
              } })
          ) : null
        )
      );
    }
    return null;
  },
  renderAddIcon: function renderAddIcon() {
    var toLeft = 0;
    if (this.state.tabPositions && this.state.tabPositions.length > 0) {
      var lastTab = this.state.tabPositions.max(function (s) {
        return s.left;
      });
      toLeft = lastTab.left + lastTab.width;
    }
    return _react2.default.createElement(
      'div',
      { className: 'tab-add-button', style: { left: toLeft + 'px', height: _constants.TAB_HEIGHT + 'px', width: _constants.ADD_WIDTH + 'px' } },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 100 100', onClick: this.props.onAddTab },
        _react2.default.createElement('path', { d: 'M 20 20 L 80 20 L 80 80 L 20 80 Z' })
      ),
      _react2.default.createElement('i', { className: 'fa fa-plus' })
    );
  },
  render: function render() {
    var _this5 = this;

    var map = (0, _util.arrayToMap)(this.state.items, function (tab) {
      return tab.id.toString();
    });
    return _react2.default.createElement(
      'div',
      { className: 'fancy-tab-panel' },
      _react2.default.createElement(
        _reactMeasure2.default,
        { bounds: true, onResize: this.onContainerResize },
        function (_ref) {
          var measureRef = _ref.measureRef;
          return _react2.default.createElement(
            'div',
            { className: 'top-panel', ref: measureRef, style: { height: _constants.PANEL_HEIGHT + 'px' } },
            (0, _keys2.default)(map).map(function (id) {
              var tab = map[id];
              var idx = _this5.state.items.indexOf(tab);
              return _this5.renderTab(tab, idx);
            }),
            _this5.props.onAddTab ? _this5.renderAddIcon() : null
          );
        }
      )
    );
  }
});
//# sourceMappingURL=tab-panel-core.js.map