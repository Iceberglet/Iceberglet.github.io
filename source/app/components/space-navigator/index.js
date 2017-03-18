import React from 'react'
import ReactDOM from 'react-dom'
import { Scope } from './scope'
import './space-navigator.scss'
import {registerToMouse, unsubFromMouse} from 'util'

const cursorSize = 80

export const SpaceNavigator = React.createClass({
  getInitialState(){
    return {
      mouseIn: false
    }
  },
  componentDidMount(){
    let canvas = this
    //For targetable items
    this.targetable.forEach(r=>{
      let c = ReactDOM.findDOMNode(r)
      c.addEventListener('mouseover', ()=>{
        canvas.setState({
          targetNode: c
        })
      })
      c.addEventListener('mouseout', ()=>{
        canvas.setState({
          targetNode: null
        })
      })
    })

    //For parallax items
    // let scopeEl = ReactDOM.findDOMNode(this.refs.scope)
    // this.f = registerToMouse((x, y)=>{
    //   scopeEl.style.top = y+'px'
    //   scopeEl.style.left = x+'px'
    // })
  },
  componentWillUnmount(){
    delete this.canvas
  },
  mouseIn(){
    this.setState({
      mouseIn: true
    })
  },
  mouseLeave(){
    this.setState({
      mouseIn: false
    })
  },
  render(){
    this.targetable = []
    return (<div className='space-navigator' onMouseEnter={this.mouseIn} onMouseLeave={this.mouseLeave} >
          <div className='background' ref='slowest'>
            <img src={'resources/space2.jpg'}/>
          </div>
          <div className='overlay'>
            {this.state.mouseIn && <Scope ref='cursor' targetNode={this.state.targetNode}/>}
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
          </div>
        </div>)
  }
})
