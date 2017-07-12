import React from 'react'
import ReactDOM from 'react-dom'
import { Scope } from './scope'
import './space-navigator.scss'
import {registerToMouse, unsubFromMouse} from 'utils'

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
    this.subscribeToParallax(1, this.refs.backdrop)
    this.subscribeToParallax(5, this.refs.overlay)
  },

  subscribeToParallax(amount, target){
    let el = ReactDOM.findDOMNode(target)
    if(el){
      this.unsubscribeParallax(el);
      ((e)=>{
        registerToMouse((x, y)=>{
          let leftPerc = x / window.innerWidth
          e.style.left = (leftPerc - 0.5) * amount * 10 + 'px'
          let topPerc = y / window.innerHeight
          e.style.top = (topPerc - 0.5) * amount * 10 / window.innerWidth * window.innerHeight + 'px'
        })
      })(el)
    }
  },
  unsubscribeParallax(element){
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
          <div className='background' ref='backdrop'>
            <div className='title'>Unleash the Unimaginable</div>
            <img src={'resources/space2.jpg'}/>
          </div>
          <div className='overlay' ref='overlay'>
            {this.state.mouseIn && <Scope ref='middle' targetNode={this.state.targetNode}/>}
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
            <div className='test-box' ref={x=>{this.targetable.push(x)}} />
          </div>
        </div>)
  }
})
