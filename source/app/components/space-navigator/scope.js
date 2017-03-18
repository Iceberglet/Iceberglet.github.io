import React from 'react'
import ReactDOM from 'react-dom'
import {registerToMouse, unsubFromMouse} from 'util'

const sizeOfNormalCursor = 80

export const Scope = React.createClass({
  propTypes: {
    // motherNode: React.PropTypes.node,
    targetNode: React.PropTypes.node
  },

  componentWillReceiveProps(props){
    if(props.targetNode){
      let rect = props.targetNode.getBoundingClientRect()
      let y = (rect.top + rect.bottom) / 2, x = (rect.left + rect.right) / 2
      let size = Math.max(Math.sqrt(rect.height * rect.height + rect.width * rect.width), sizeOfNormalCursor) * 1.2+ 'px'
      this.setState({
        style: {
          top: y, left: x, width: size, height: size
        }
      }, ()=>{
        this.subscribeToMovement(false)
      })
    } else {
      this.subscribeToMovement(true)
    }
  },

  subscribeToMovement(flag){
    if(flag){
      let scopeEl = ReactDOM.findDOMNode(this.refs.scope)
      this.f = registerToMouse((x, y)=>{
        scopeEl.style.top = y+'px'
        scopeEl.style.left = x+'px'
      })
    } else {
      unsubFromMouse(this.f)
    }
  },

  componentDidMount(){
    this.subscribeToMovement(true)
  },

  componentWillUnmount(){
    this.subscribeToMovement(false)
  },

  render(){
    let inactiveClass = this.props.targetNode ? 'active' : 'inactive'
    let style = this.props.targetNode && this.state.style
    return (<div className={'scope'} ref='scope' style={style}>
        <defs>
          <linearGradient id="MyGradient">
              <stop offset="5%"  stopColor="rgba(0,0,0,0)"/>
              <stop offset="95%" stopColor="rgba(255,0,0,1)"/>
          </linearGradient>
        </defs>
        <svg className={'item outer-wheel rotatable ' + inactiveClass} viewBox='-10 -10 120 120'>
          <path d='M 50 2 A 48 48 0 0 1 98 50 ' strokeWidth='4' fill='none'/>
          <path d='M 2 50 A 48 48 0 0 0 50 98' strokeWidth='4' fill='none'/>
        </svg>
        <svg className={'item outer-wheel ' + inactiveClass} viewBox='-10 -10 120 120'>
           <circle cx="50" cy="50" r="50" fill='none' strokeWidth='2'/>
        </svg>
        <svg className={'item pins ' + inactiveClass} viewBox='0 0 100 100'>
          <path d='M 49 0 L 51 0 L 50 18 Z' strokeWidth='0' style={{transform: 'translate(0, -200%)'}}/>
          <path d='M 100 49 L 100 51 L 82 50 Z' strokeWidth='0' style={{transform: 'translate(200%, 0)'}}/>
          <path d='M 49 100 L 51 100 L 50 82 Z' strokeWidth='0' style={{transform: 'translate(0, 200%)'}}/>
          <path d='M 0 49 L 0 51 L 18 50 Z' strokeWidth='0' style={{transform: 'translate(-200%, 0)'}}/>
        </svg>
    </div>)
  }
})

//  <circle cx="50" cy="50" r="49" stroke='cyan' fill='none'/>

  // <path d='M 0 50 A 50 50 0 0 1 50 0 ' stroke='cyan' strokeWidth='1'/>
  // <path d='M 100 50 A 50 50 0 0 1 50 100 ' stroke='cyan' strokeWidth='1'/>
