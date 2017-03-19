import React from 'react'
import './top-bar.scss'
import { onHover, onExit } from 'app/cursor'

const MenuItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  render(){
    return (<div className='menu-item' onClick={()=>this.props.onClick(this.props.name)} onMouseOver={onHover} onMouseLeave={onExit}>{this.props.name}</div>)
  }
})


export const TopBar = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array,
    onSelectPage: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  },
  render(){
    return (<div className='top-bar' style={this.props.style}>
      {this.props.menuItems.map((str, i)=>{
        return <MenuItem name={str} onClick={this.props.onSelectPage} key={str} ref={str}/>
      })}
    </div>)
  }
})
