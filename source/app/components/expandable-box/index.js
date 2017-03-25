import React from 'react'
import './index.scss'

export const ExpandableBox=React.createClass({
  propTypes:{
    color: React.PropTypes.string,
    width: React.PropTypes.number,
    style: React.PropTypes.object
  },
  getDefaultProps(){
    return {
      color: 'cyan', width: 1
    }
  },
  render(){
    return <div className='expandable-box-container' style={this.props.style}>
      <div className='box-label'>
        {this.props.children[0]  /* The first children is the one shown by default */}
      </div>
      <div className='box-content'>
        <div className='border'/>
        <div className='content-holder'>
          {this.props.children[1]  /* The second children is the one that appears on hover */}
        </div>
      </div>
    </div>
  }
})
