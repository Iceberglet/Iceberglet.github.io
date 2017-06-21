const idGenerator = function(){
  let counter = 0;
  return function(){
    counter++;
    return counter;
  }
}

const idGen = idGenerator();

// const statuses = ['normal', 'ghost', 'entering', 'exitting']
export const Tab = function(title, status='normal'){
  this.id = idGen();
  this.title = title;
  this.status = status;
}
export const TabMeta = function(width, wedgeWidth, contentWidth){
  this.width = width;
  this.wedgeWidth = wedgeWidth;
  this.contentWidth = contentWidth;
}


const clamp = (val, min, max)=>{
  if(min >= max) {
    throw new Error('Min is larger than max', min, max)
  }
  return Math.min(max, Math.max(val, min))
}
//The functional wrapper for dragging tabs
//Initializes with the first mouse down event, the tabStates and the tabs, and the tab index being dragged
export const TabDragState = function(e, tabPositions, tabs, tabIndex, cleanUpCallback, updateCallback){
  this._startx = e.clientX
  this._tabStates = tabPositions
  // this._leftmost = tabPositions.max(p=>-p.left).left
  this._rightmost = tabPositions.max(p=>p.left).left + 100
  this._tabStart = tabPositions[tabIndex].left
  this._tabWidth = tabPositions[0].width - tabPositions[0].wedgeWidth //minus the wedge
  this._moveBuffer = 0.05 * this._tabWidth
  this.currentGhostIdx = tabIndex

  //ghost place holder
  this.tabGhost = tabs[tabIndex]
  this.tabGhost.type = 'ghostPlaceholder'

  this.tabs = tabs      //the array of tabs containing the ghost placeholder. the states will mutate its order
  this.ghostHandle = null

  //document listeners:
  this._updatePos = updatePosition.bind(this)
  this._endDrag = endDrag.bind(this)
  this._cleanUpCallback = cleanUpCallback
  this._updateCallback = updateCallback
  document.addEventListener('mousemove', this._updatePos)
  document.addEventListener('mouseup', this._endDrag)
  document.addEventListener('mouseleave', this._endDrag)
}

//Feed mouse drag event
//Returns the ghost position
const updatePosition = function(e){
  this.draggingPos = e.clientX;
  //update the ghost handle
  if(this.ghostHandle && this.ghostHandle.updateLeft){
    let ghostLeft = clamp(this.draggingPos - this._startx + this._tabStart, 0, this._rightmost)
    // console.log('Ghost Drag:', this._tabWidth, ghostLeft)
    this.ghostHandle.updateLeft(ghostLeft)
    //See if need to swap position of ghost placeholder
    //Find the tab for which left <= ghostHandleLeft <= nextTabLeft
    let newIdx = this._tabStates.findIndex(t=>t.left + this._moveBuffer - this._tabWidth / 2  < ghostLeft && ghostLeft< t.left + this._tabWidth / 2 - this._moveBuffer)
    if(newIdx >= 0 && newIdx !== this.currentGhostIdx){
      if(this._lock){
        console.log('Unable to swap now. status is locked')
        return this;
      }
      this._lock = true;
      this._updateCallback(this.currentGhostIdx, newIdx, ()=>{
        this.currentGhostIdx = newIdx;
        this._lock = false;
      })
    }
  }
  return this;
}

//Feed mouse up event
const endDrag = function(e){
  //Restore the ghost placeholder to be rendered normally again
  this.tabGhost.type = 'normal'
  //Clean up the listener
  document.removeEventListener('mousemove', this._updatePos)
  document.removeEventListener('mouseup', this._endDrag)
  document.removeEventListener('mouseleave', this._endDrag)
  this._cleanUpCallback()
  return this;
}

TabDragState.prototype.setGhost = function(ghostHandle){
  this.ghostHandle = ghostHandle
}
