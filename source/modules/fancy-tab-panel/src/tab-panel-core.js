import React from 'react'
import Measure from 'react-measure'
import './index.scss'
import {postpone, arrayToMap} from './util'
import {calculate} from './calculator'
import {TAB_HEIGHT, PANEL_HEIGHT, MAX_TAB_WIDTH, CROSS_WIDTH, ADD_WIDTH, TAB_ANIMATION_DURATION} from './constants'
import {TabGhostHandle} from './tab-ghost-handle'
import {TabDragState, Tab} from './tab'

export {Tab}

//Logic
//1. Use measure to get individual tab size
//2. Calculate the max content width available
//3. Calculate the "left" size

const iconStyle = {
  width: CROSS_WIDTH+'px'
}

export const TabPanelCore = React.createClass({
  propTypes: {
    onSelectTab: React.PropTypes.func.isRequired,
    selected: React.PropTypes.number.isRequired,
    onAddTab: React.PropTypes.func,
    onRemoveTab: React.PropTypes.func,
    allowRemoveAll: React.PropTypes.bool,
    allowDnD: React.PropTypes.bool,
    onFinishDrag: React.PropTypes.func.isRequired,
    items: React.PropTypes.array    //map of tabId to tabContent
  },

  getDefaultProps(){
    return {
      allowDnD: true,
      allowRemoveAll: false
    }
  },

  componentWillReceiveProps(props){
    //compare with existing items and decide which ones are new, which ones are to be deleted
    let newOnes = props.items.filter(i => !this.state.items.find(ii=>ii.id===i.id))
    // console.log('Detected new tabs', newOnes)
    let toDelete = this.state.items.filter(i => !props.items.find(ii=>ii.id===i.id))
    // console.log('Detected deleted tabs', toDelete)

    newOnes.forEach(o=>o.type='entering')
    //combine the two lists of tabs
    this.recalculateTabPositions(null, props.items.slice(0), toDelete)
  },

  getInitialState(){
    let stateItems = this.props.items.slice(0)
    return {
      totalWidth: 0,
      tabPositions: null,
      items: stateItems   //copy into another array
    }
  },

  recalculateTabPositions(totalWidth, items, toDelete = []){
    totalWidth = totalWidth || this.state.totalWidth
    items = items || this.state.items
    let res = calculate(totalWidth, items.length, this.props.onRemoveTab, MAX_TAB_WIDTH)
    this.setState({
      totalWidth, items,
      toDelete,
      tabPositions: res
    }, ()=>{
      setTimeout(()=>{
        this.setState(s=>{
          s.items.forEach(o=>{
            if(o.type==='entering')
              o.type='normal'
          })
          s.toDelete = []
        })
      }, TAB_ANIMATION_DURATION)
    })
  },

  onContainerResize(contentRect){
    let {width, height} = contentRect.bounds
    if(this.props.onAddTab){
      width -= ADD_WIDTH
    }
    this.recalculateTabPositions(width)
  },

  onClickRemove(e, id){
    e.stopPropagation();
    this.props.onRemoveTab(id)
  },

  updateDrag(oldIdx, newIdx, callback){
    this.setState(s=>{
      //swap
      let replacedTab = s.items[oldIdx]
      s.items[oldIdx] = s.items[newIdx]
      s.items[newIdx] = replacedTab
    }, callback)
  },

  startDrag(e, idx, id){
    this.props.onSelectTab(id)

    if(this.props.allowDnD){
      // Remove all existing selections on document, since they mess up the drag and drop effect
      let selObj = window.getSelection()
      selObj.removeAllRanges()
      document.onselectstart = ()=>false  //prevent select start

      this.setState({
        tabDragState: new TabDragState(e, this.state.tabPositions, this.state.items, idx, this.endDrag, this.updateDrag)
      })
    }
  },

  endDrag(){
    delete this.state.tabDragState
    document.onselectstart = null  //enable select start
    this.setState({
      tabDragState: null
    }, ()=>this.props.onFinishDrag(this.state.items))
  },

  //Required: calculatedTabState
  renderTab(tab, idx){
    let {id, title} = tab
    if(this.state.totalWidth > 0 && this.state.tabPositions){
      let {width, left, wedgeWidth, contentWidth} = this.state.tabPositions[idx]
      let tabTitleWidth = this.props.onRemoveTab? contentWidth - CROSS_WIDTH : contentWidth;
      let tabStyle = {
        height: TAB_HEIGHT + 'px',
        left: left+'px',
        width: width+'px'
      }
      let tabContentStyle = {
        ...tabStyle,
        left: wedgeWidth + 'px',
        width: contentWidth + 'px'
      }
      let pathD = `M ${width} ${TAB_HEIGHT} L ${width - wedgeWidth} 1 L ${wedgeWidth} 1 L 0 ${TAB_HEIGHT}`
      if(id !== this.props.selected) {
        pathD += ' Z'
      }

      if(tab.type === 'ghostPlaceholder'){
        //A free moving, semi transparent ghost that does not interfere with other tabs
        //Its position depends on the mouse position
        if(!this.state.tabDragState || !this.state.tabPositions)
          return null;
        let pathD = `M ${width} ${TAB_HEIGHT} L ${width - wedgeWidth} 1 L ${wedgeWidth} 1 L 0 ${TAB_HEIGHT}`
        return <TabGhostHandle tabDragState={this.state.tabDragState} key={id} tabStyle={tabStyle} title={title}>
          <svg>
            <path d={pathD}/>
          </svg>
          <div className='tab-content' style={tabContentStyle}>
            <div className='tab-title no-select' style={{width: tabTitleWidth, lineHeight: TAB_HEIGHT+'px'}}>{title}</div>
          </div>
        </TabGhostHandle>
      }

      //set transform scale for newly entered
      let tabClass = 'tab ' + (id===this.props.selected && ' selected ') + (tab.type === 'entering' && ' entering ')

      return <div style={tabStyle} key={id} className={tabClass}>
        <svg>
          <path d={pathD}/>
        </svg>
        <div className='tab-content' style={tabContentStyle}>
          <div className='tab-title no-select' style={{width: tabTitleWidth, lineHeight: TAB_HEIGHT+'px'}} onMouseDown={(e)=>this.startDrag(e, idx, id)}>{title}</div>
          {this.props.onRemoveTab && (this.state.items.length > 1 || this.props.allowRemoveAll)? <div className='tab-delete-icon' style={{...iconStyle, height: TAB_HEIGHT+'px'}}>
            <i className='fa fa-times' onClick={(e)=>this.onClickRemove(e, id)}/>
          </div> : null}
        </div>
      </div>
    }
    return null
  },

  renderAddIcon(){
      let toLeft = 0;
      if(this.state.tabPositions && this.state.tabPositions.length > 0){
        let lastTab = this.state.tabPositions.max(s=>s.left)
        toLeft = lastTab.left + lastTab.width
      }
      return <div className='tab-add-button' style={{left: toLeft+'px', height: TAB_HEIGHT+'px', width: ADD_WIDTH +'px'}}>
        <svg viewBox='0 0 100 100' onClick={this.props.onAddTab}>
          {/*<path d='M 5 22 L 70 22 L 100 78 L 35 78 Z'/>*/}
          <path d='M 20 20 L 80 20 L 80 80 L 20 80 Z'/>
        </svg>
        <i className='fa fa-plus'/>
      </div>
  },

  render(){
    // a trick to make sure tabs are rendered in a FIXED order, because re-arranging DOM elements has undefined behaviour in browsers
    let map = arrayToMap(this.state.items, tab=>tab.id.toString())
    return (
      <div className='fancy-tab-panel'>
        <Measure bounds onResize={this.onContainerResize}>
          {({ measureRef }) =>
            <div className='top-panel' ref={measureRef} style={{height: PANEL_HEIGHT+'px'}}>
              {Object.keys( map ).map(id=>{
                let tab = map[id]
                let idx = this.state.items.indexOf(tab)
                return this.renderTab(tab, idx)
              })}
              {this.props.onAddTab? this.renderAddIcon() : null}
            </div>
          }
        </Measure>
      </div>)
  }
})
