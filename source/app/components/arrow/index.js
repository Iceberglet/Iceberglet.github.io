import React from 'react'
import './index.scss'
import { onHover, onExit } from 'app/cursor'

export const Arrow = React.createClass({
  propTypes: {
    fontSize: React.PropTypes.string,
    rotation: React.PropTypes.number,
    onClick: React.PropTypes.func,
    enabled: React.PropTypes.bool,
    color: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps(){
    return {
      fontSize: '30px', rotation: 0, enabled: true, color: 'white'
    }
  },

  onClick(){
    if(this.props.enabled){
      this.props.onClick()
    }
  },

  render(){
    let enabled = this.props.enabled? 'enabled' : '', {color, fontSize, rotation} = this.props
    let cb = this.props.enabled? {onMouseEnter: onHover } : {};
    return <div onClick={this.onClick} className='arrow' style={{...this.props.style, color, fontSize, transform: `rotate(${rotation}deg)`}} {...cb} onMouseLeave={onExit}>
      <i className={'fa fa-angle-up main ' + enabled} />
      <i className={'fa fa-angle-up sidekick ' + enabled} />
    </div>
  }
})
