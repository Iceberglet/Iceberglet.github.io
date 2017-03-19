import React from 'react'
import ReactDOM from 'react-dom'
import {registerToMouse, unsubFromMouse} from 'util'
import './cursor.scss'

const sizeOfNormalCursor = 32

//******* For Outside World to Commnuicate ************
let registeredCursor = null;
let currentTarget = null;
export const onHover = (e)=>{
  //activate cursor
  currentTarget = e.target
  registeredCursor.setStatus('active', currentTarget)
}
export const onEnlarge = (e)=>{
  currentTarget = e.target
  registeredCursor.setStatus('enlarged', currentTarget)
}
export const onExit = (e)=>{
  //deactivate cursor
  if(currentTarget !== e.target){
    return;
  } else {
    currentTarget = null
    registeredCursor.setStatus('inactive', currentTarget)
  }
}
// export const setColor = (...args)=>{
//   if(registeredCursor){
//     registeredCursor.setColor(...args)
//   } else {
//     console.error('No registeredCursor')
//   }
// }


//***************** Cursor Definition *******************
export const Cursor = React.createClass({
  propTypes: {
    cursorColor: React.PropTypes.object
  },

  componentWillReceiveProps(props){
    if(props.cursorColor){
      this.setState({
        ...this.parseCursorColor(props.cursorColor)
      })
    }
  },

  parseCursorColor(cursorColor){
    let colorObj = {}
    Object.keys(cursorColor).forEach(status=>{
      let [r, g, b] = cursorColor[status]
      let color1 = `rgba(${r}, ${g}, ${b}, 1)`, color2 = `rgba(${r}, ${g}, ${b}, 0.8)`
      colorObj[status] = {color1, color2}
    })
    return colorObj
  },

  getInitialState(){
    return {
      status: 'inactive',
      ...this.parseCursorColor(this.props.cursorColor)
      // inactive: {
      //   color1: 'black',
      //   color2: 'cyan'
      // },
      // active: {
      //   color1: 'red',
      //   color2: 'blue'
      // },
      // enlarged: {
      //   color1: 'yellow',
      //   color2: 'green'
      // }
    }
  },

  // setColor(r, g, b, status){
  //   let color1 = `rgba(${r}, ${g}, ${b}, 1)`, color2 = `rgba(${r}, ${g}, ${b}, 0.8)`
  //   this.setState({
  //     [status]: {
  //       color1, color2
  //     }
  //   })
  // },

  setStatus(status, el){
    if(status !== 'enlarged'){
      this.setState({
        status, style: null
      }, ()=>{this.subscribeToMovement(true)})
    } else {
      let rect = el.getBoundingClientRect()
      let y = (rect.top + rect.bottom) / 2, x = (rect.left + rect.right) / 2
      let size = Math.max(Math.sqrt(rect.height * rect.height + rect.width * rect.width), sizeOfNormalCursor) * 1.2+ 'px'
      this.setState({
        status,
        style: {
          top: y, left: x, width: size, height: size
        }
      }, ()=>{
        this.subscribeToMovement(false)
      })
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
    if(registeredCursor){
      console.error('You already have a cursor!!')
    }
    registeredCursor = this
    this.subscribeToMovement(true)
  },

  componentWillUnmount(){
    this.subscribeToMovement(false)
  },

  render(){
    let {status, style} = this.state     //active, inactive, enlarged
    let {color1, color2} = this.state[status]
    return (<div className={'cursor'} ref='scope' style={style}>
        <svg className='item'>
          <defs>
            <linearGradient id="activeGradient">
                <stop offset="0%"  stopColor={this.state.active.color1}/>
                <stop offset="100%" stopColor={this.state.active.color2}/>
            </linearGradient>
            <linearGradient id="inactiveGradient">
                <stop offset="0%"  stopColor={this.state.inactive.color1}/>
                <stop offset="100%" stopColor={this.state.inactive.color2}/>
            </linearGradient>
            <linearGradient id="enlargedGradient">
                <stop offset="0%"  stopColor={this.state.enlarged.color1}/>
                <stop offset="100%" stopColor={this.state.enlarged.color2}/>
            </linearGradient>
          </defs>
        </svg>
        {/*status==='inactive' ||*/ <svg className={'item outer-wheel rotatable ' + status} viewBox='-10 -10 120 120'>
          <path d='M 50 2 A 48 48 0 0 1 98 50 ' strokeWidth='4' fill='none'/>
          <path d='M 2 50 A 48 48 0 0 0 50 98' strokeWidth='4' fill='none'/>
        </svg>}
        <svg className={'item outer-wheel ' + status} viewBox='-10 -10 120 120'>
           <circle cx="50" cy="50" r={this.props.targetNode? '48' : '25'} strokeWidth='4'/>
           {!this.props.targetNode && <circle cx="50" cy="50" r={'4'} strokeWidth='2'/>}
        </svg>
        <svg className={'item pins ' + status} viewBox='0 0 100 100'>
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
