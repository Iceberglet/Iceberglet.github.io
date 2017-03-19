import React from 'react'
import './top-bar.scss'
import { onHover, onExit } from 'app/cursor'

const MenuItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  render(){
    return (<div className='menu-item' onMouseOver={onHover} onMouseLeave={onExit}>{this.props.name}</div>)
  }
})


export const TopBar = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array,
    onSelectPage: React.PropTypes.func.isRequired
  },
  render(){
    return (<div className='top-bar'>
      {this.props.menuItems.map((str, i)=>{
        return <MenuItem name={str} onClick={this.onSelectPage} key={str} ref={str}/>
      })}
    </div>)
  }
})
