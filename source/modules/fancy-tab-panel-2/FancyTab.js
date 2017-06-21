import React from 'react'
import ReactDOM from 'react-dom'
import {TAB_HEIGHT} from './constants'

const iconStyle = {
  width: CROSS_WIDTH+'px',
  height: TAB_HEIGHT+'px'
}

export const FancyTab = React.createClass({
  propTypes: {
    isSelected: React.PropTypes.bool,
    tabObj: React.PropTypes.object,   //contains id, title, status
    tabMeta: React.PropTypes.object,  //width, wedgeWidth, contentWidth
    left: React.PropTypes.number,   //left

    onRemoveTab: React.PropTypes.func,//Handles Removal
    onMouseDown: React.PropTypes.func   //Handles both DnD and Selection
  },

  render(){
    let {tabMeta, tabObj, isSelected} = this.props
    let {width, wedgeWidth, contentWidth} = tabMeta
    let tabStyle = {
      height: TAB_HEIGHT + 'px',
      left: tabMeta.left+'px',
      width: tabMeta.width+'px'
    }
    let tabContentStyle = {
      ...tabStyle,
      left: wedgeWidth + 'px',
      width: contentWidth + 'px'
    }
    //set transform scale for newly entered
    let tabClass = 'tab ' + (tabObj.id===isSelected && ' selected ') +
                            (tabObj.status === 'entering' && ' entering ') +
                            (tabObj.status === 'exitting' && ' exitting ')

    let pathD = `M ${width} ${TAB_HEIGHT} L ${width - wedgeWidth} 1 L ${wedgeWidth} 1 L 0 ${TAB_HEIGHT}`

    return <div style={tabStyle} key={tabObj.id} className={tabClass}>
      <svg>
        <path d={pathD}/>
      </svg>
      <div className='tab-content' style={tabContentStyle}>
        <div className='tab-title no-select' style={{width: tabTitleWidth, lineHeight: TAB_HEIGHT+'px'}}
            onMouseDown={(e)=>this.props.onMouseDown(e, idx, id)}>
            {title}
        </div>
        {this.props.onRemoveTab? <div className='tab-delete-icon' style={iconStyle}>
          <i className='fa fa-times' onClick={(e)=>this.props.onRemoveTab(e, tabObj.id)}/>
        </div> : null}
      </div>
    </div>
  }
})
