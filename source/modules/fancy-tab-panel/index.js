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
    items: React.PropTypes.array    //array of strings
  },

  componentWillReceiveProps(props){

  },

  getInitialState(){
    return {
      totalWidth: 0,
      tabStates: null
    }
  },

  recalculateTabStates(){
    let res = calculate(this.state.totalWidth, this.props.items.length, this.props.onRemoveTab, MAX_TAB_WIDTH)
    this.setState({
      tabStates: res
    })
  },

  onContainerResize(contentRect){
    let {width, height} = contentRect.bounds
    console.log('Panel Container ReSize: ', width, height)
    this.setState({
      totalWidth: width
    }, this.recalculateTabStates)
  },

  //Required: calculatedTabState
  renderTab(title, idx){
    if(this.state.totalWidth > 0 && this.state.tabStates){
      let {width, left, wedgeWidth, contentWidth} = this.state.tabStates[idx]
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
      if(idx !== this.props.selected) {
        pathD += ' Z'
      } else {
        tabStyle.zIndex = 999
      }
      return <div style={tabStyle} key={title} className={'tab ' + (idx===this.props.selected && 'selected')} onClick={(e)=>this.props.onSelectTab(idx, title)}>
        <svg viewBox={`0 0 ${width} ${TAB_HEIGHT}`}>
          <path d={pathD}/>
        </svg>
        <div className='tab-content' style={tabContentStyle}>{title}
          {this.props.onRemoveTab? <div className='tab-delete-icon' style={{...iconStyle, height: TAB_HEIGHT+'px'}} onClick={(e)=>this.props.onRemoveTab(idx, title)}>
            <i className='fa fa-times'/>
          </div> : null}
        </div>
      </div>
    }
    return null
  },

  render(){
    return (
      <div className='fancy-tab-panel'>
        <Measure bounds onResize={this.onContainerResize}>
          {({ measureRef }) => <div className='top-panel' ref={measureRef} style={{height: PANEL_HEIGHT+'px'}}>
              {this.props.items.map(this.renderTab)}
            </div>
          }
        </Measure>
      </div>)
  }
})
