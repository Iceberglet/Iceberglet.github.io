import React from 'react'
import Measure from 'react-measure'
import './index.scss'
import {postpone} from 'util'
import {calculate} from './calculator'
import {TAB_HEIGHT, PANEL_HEIGHT, MAX_TAB_WIDTH, CROSS_WIDTH, ADD_WIDTH, PANEL_BUFFER_HEIGHT} from './constants'

//Logic
//1. Use measure to get individual tab size
//2. Calculate the max content width available
//3. Calculate the "left" size

const iconStyle = {
  width: CROSS_WIDTH+'px'
}

export const FancyTabPanel = React.createClass({
  propTypes: {
    onSelectTab: React.PropTypes.func,
    selected: React.PropTypes.number,
    onAddTab: React.PropTypes.func,
    onRemoveTab: React.PropTypes.func,
    allowRemoveAll: React.PropTypes.bool,
    items: React.PropTypes.array    //map of tabId to tabContent
  },

  componentWillReceiveProps(props){
    this.recalculateTabStates(null, props.items)
  },

  getInitialState(){
    return {
      totalWidth: 0,
      tabStates: null,
      items: this.props.items
    }
  },

  recalculateTabStates(totalWidth, items){
    totalWidth = totalWidth || this.state.totalWidth
    items = items || this.state.items
    let res = calculate(totalWidth, items.length, this.props.onRemoveTab, MAX_TAB_WIDTH)
    this.setState({
      totalWidth, items,
      tabStates: res
    })
  },

  onContainerResize(contentRect){
    let {width, height} = contentRect.bounds
    console.log('Panel Container ReSize: ', width, height)
    if(this.props.onAddTab){
      width -= ADD_WIDTH
    }
    this.recalculateTabStates(width)
  },

  onClickRemove(e, id){
    e.stopPropagation();
    this.props.onRemoveTab(id)
  },

  //Required: calculatedTabState
  renderTab({id, content}, idx){
    if(this.state.totalWidth > 0 && this.state.tabStates){
      let {width, left, wedgeWidth, contentWidth} = this.state.tabStates[idx]
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
      } else {
        tabStyle.zIndex = 999
      }
      return <div style={tabStyle} key={id} className={'tab ' + (id===this.props.selected && 'selected')} onClick={(e)=>this.props.onSelectTab(id)}>
        <svg>
          <path d={pathD}/>
        </svg>
        <div className='tab-content' style={tabContentStyle}>
          <div className='tab-title no-select' style={{width: tabTitleWidth}}>{content}</div>
          {this.props.onRemoveTab? <div className='tab-delete-icon' style={{...iconStyle, height: TAB_HEIGHT+'px'}}>
            <i className='fa fa-times' onClick={(e)=>this.onClickRemove(e, id)}/>
          </div> : null}
        </div>
      </div>
    }
    return null
  },

  renderAddIcon(){
      let toLeft = 0;
      if(this.state.tabStates){
        let lastTab = this.state.tabStates.max(s=>s.left)
        toLeft = lastTab.left + lastTab.width
      }
      return <div className='tab-add-button' style={{left: toLeft+'px', height: TAB_HEIGHT+'px', width: ADD_WIDTH +'px'}}>
        <svg viewBox='0 0 100 100' onClick={this.props.onAddTab}>
          <path d='M 5 22 L 70 22 L 100 78 L 35 78 Z'/>
        </svg>
      </div>
  },

  render(){
    return (
      <div className='fancy-tab-panel'>
        <Measure bounds onResize={this.onContainerResize}>
          {({ measureRef }) =>
            <div className='top-panel' ref={measureRef} style={{height: PANEL_HEIGHT+'px'}}>
              {this.state.items.map(this.renderTab)}
              {this.props.onAddTab? this.renderAddIcon() : null}
            </div>
          }
        </Measure>
      </div>)
  }
})
