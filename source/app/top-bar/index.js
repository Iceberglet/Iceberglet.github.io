import React from 'react'
import './top-bar.scss'
import { onHover, onExit } from 'app/cursor'

const MenuItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    lineColor: React.PropTypes.string,
    active: React.PropTypes.node,
    onClick: React.PropTypes.func
  },
  render(){
    let eventListener = !this.props.active ? {
      onMouseEnter: onHover,
      onClick: ()=>{
        this.props.onClick(this.props.name)
      }
    } : {}
    return (<div className={'menu-item ' + this.props.active} {...eventListener} onMouseLeave={onExit}>
      <div className='text no-select'>{this.props.name}</div>
      <div className='underline' style={{ background:this.props.lineColor }}/>
    </div>)
  }
})


export const TopBar = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array,
    currentItem: React.PropTypes.string,
    onSelectPage: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  },
  render(){
    return (<div className='top-bar' style={this.props.style}>
      {this.props.menuItems.map((str, i)=>{
        return <MenuItem name={str} onClick={this.props.onSelectPage} key={str} ref={str}
                lineColor={this.props.style.color} active={str===this.props.currentItem && 'active'}/>
      })}
    </div>)
  }
})
