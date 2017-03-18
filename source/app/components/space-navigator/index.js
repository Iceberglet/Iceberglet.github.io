import React from 'react'
import ReactDOM from 'react-dom'
import { Scope } from './scope'
import './space-navigator.scss'

const cursorSize = 80

export const SpaceNavigator = React.createClass({
  getInitialState(){
    return {
      mouseIn: false
    }
  },
  componentDidMount(){
    let canvas = this
    Object.keys(this.refs).forEach(r=>{
      let c = ReactDOM.findDOMNode(this.refs[r])
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
    return (<div className='space-navigator' onMouseEnter={this.mouseIn} onMouseLeave={this.mouseLeave} >
          {this.state.mouseIn && <Scope ref='cursor' targetNode={this.state.targetNode}/>}
          <div className='test-box' ref='testBox' />
          <div className='test-box' ref='testBox1' />
          <div className='test-box' ref='testBox2' />
    </div>)
  }
})
