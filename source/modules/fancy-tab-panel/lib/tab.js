'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabDragState = exports.Tab = undefined;

var _util = require('./util');

var idGen = (0, _util.idGenerator)();

var clamp = function clamp(val, min, max) {
  if (min >= max) {
    throw new Error('Min is larger than max', min, max);
  }
  return Math.min(max, Math.max(val, min));
};

var types = ['normal', 'junk', 'ghostPlaceholder', 'ghostHandle', 'entering', 'exiting'];
var Tab = exports.Tab = function Tab(title) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';

  this.id = idGen();
  this.title = title;
  this.type = type;
};

Tab.prototype.kill = function () {
  this.type = 'junk';
};
Tab.prototype.normalize = function () {
  this.type = 'normal';
};

var TabDragState = exports.TabDragState = function TabDragState(e, tabPositions, tabs, tabIndex, cleanUpCallback, updateCallback) {
  this._startx = e.clientX;
  this._tabStates = tabPositions;

  this._rightmost = tabPositions.max(function (p) {
    return p.left;
  }).left + 100;
  this._tabStart = tabPositions[tabIndex].left;
  this._tabWidth = tabPositions[0].width - tabPositions[0].wedgeWidth;
  this._moveBuffer = 0.05 * this._tabWidth;
  this.currentGhostIdx = tabIndex;

  this.tabGhost = tabs[tabIndex];
  this.tabGhost.type = 'ghostPlaceholder';

  this.tabs = tabs;
  this.ghostHandle = null;

  this._updatePos = updatePosition.bind(this);
  this._endDrag = endDrag.bind(this);
  this._cleanUpCallback = cleanUpCallback;
  this._updateCallback = updateCallback;
  document.addEventListener('mousemove', this._updatePos);
  document.addEventListener('mouseup', this._endDrag);
  document.addEventListener('mouseleave', this._endDrag);
};

var updatePosition = function updatePosition(e) {
  var _this = this;

  this.draggingPos = e.clientX;

  if (this.ghostHandle && this.ghostHandle.updateLeft) {
    var ghostLeft = clamp(this.draggingPos - this._startx + this._tabStart, 0, this._rightmost);

    this.ghostHandle.updateLeft(ghostLeft);

    var newIdx = this._tabStates.findIndex(function (t) {
      return t.left + _this._moveBuffer - _this._tabWidth / 2 < ghostLeft && ghostLeft < t.left + _this._tabWidth / 2 - _this._moveBuffer;
    });
    if (newIdx >= 0 && newIdx !== this.currentGhostIdx) {
      if (this._lock) {
        console.log('Unable to swap now. status is locked');
        return this;
      }
      this._lock = true;
      this._updateCallback(this.currentGhostIdx, newIdx, function () {
        _this.currentGhostIdx = newIdx;
        _this._lock = false;
      });
    }
  }
  return this;
};

var endDrag = function endDrag(e) {
  this.tabGhost.type = 'normal';

  document.removeEventListener('mousemove', this._updatePos);
  document.removeEventListener('mouseup', this._endDrag);
  document.removeEventListener('mouseleave', this._endDrag);
  this._cleanUpCallback();
  return this;
};

TabDragState.prototype.setGhost = function (ghostHandle) {
  this.ghostHandle = ghostHandle;
};
//# sourceMappingURL=tab.js.map