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
    return (<div className={'menu-item ' + this.props.active} onClick={()=>this.props.onClick(this.props.name)} onMouseOver={onHover} onMouseLeave={onExit}>
      <div className='text'>{this.props.name}</div>
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
