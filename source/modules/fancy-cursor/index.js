import React from 'react'
import ReactDOM from 'react-dom'
import {registerToMouse, unsubFromMouse} from 'utils'
import './cursor.scss'

const sizeOfNormalCursor = 32

//******* For Outside World to Commnuicate ************
let registeredCursor = null;
let currentTarget = null;
const onHover = (e)=>{
  //activate cursor
  currentTarget = e.target
  registeredCursor && registeredCursor.setStatus('active', currentTarget)
}
// const onEnlarge = (e)=>{
//   currentTarget = e.target
//   registeredCursor && registeredCursor.setStatus('enlarged', currentTarget)
// }
const onExit = (e)=>{
  registeredCursor && registeredCursor.setStatus('inactive', null)
  currentTarget = null
}
export const cursorCallback = {
  onMouseEnter: onHover, onMouseLeave: onExit
}

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
      let color1 = `rgba(${r}, ${g}, ${b}, 1)`, color2 = `rgba(${r}, ${g}, ${b}, 0.7)`
      colorObj[status] = {color1, color2}
    })
    return colorObj
  },

  getInitialState(){
    return {
      status: 'inactive',
      ...this.parseCursorColor(this.props.cursorColor)
    }
  },

  setStatus(status, el){
    if(status !== 'enlarged'){
      this.setState({
        status, style: null
      }, ()=>{this.subscribeToMovement(true)})
    }
    // else {
    //   let rect = el.getBoundingClientRect()
    //   let y = (rect.top + rect.bottom) / 2, x = (rect.left + rect.right) / 2
    //   let size = Math.max(Math.sqrt(rect.height * rect.height + rect.width * rect.width), sizeOfNormalCursor) * 1.2+ 'px'
    //   this.setState({
    //     status,
    //     style: {
    //       top: y, left: x, width: size, height: size
    //     }
    //   }, ()=>{
    //     this.subscribeToMovement(false)
    //   })
    // }
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
    registeredCursor = null
    this.subscribeToMovement(false)
  },

  renderArrow(status){
    switch(status){
      case 'inactive' : return (<svg className='cursor-arrow' viewBox='-10 -10 120 120'>
              <path d='M 50 0 L 85 100 L 50 76 L 15 100 Z' fill = 'url(#inactiveGradient)'/>
            </svg>);
      case 'active' : return (<svg className='cursor-arrow' viewBox='-10 -10 120 120'>
            <path d='M 50 0 L 85 92 L 50 62 L 15 92 Z' fill = 'url(#activeGradient)'/>
            <path className='moving' d='M 50 72 L 85 100 L 85 110 L 50 90 L 15 110 L 15 100 Z' fill = 'url(#activeGradient)'/>
          </svg>)
      // case 'enlarged' : return (<svg>
      //   <svg className={'cursor-arrow outer-wheel rotatable ' + status} viewBox='-10 -10 120 120'>
      //     <path d='M 50 2 A 48 48 0 0 1 98 50 ' strokeWidth='4' fill='none'/>
      //     <path d='M 2 50 A 48 48 0 0 0 50 98' strokeWidth='4' fill='none'/>
      //   </svg>}
      //   <svg className={'cursor-arrow outer-wheel ' + status} viewBox='-10 -10 120 120'>
      //      <circle cx="50" cy="50" r={this.props.targetNode? '48' : '25'} strokeWidth='4'/>
      //      {!this.props.targetNode && <circle cx="50" cy="50" r={'4'} strokeWidth='2'/>}
      //   </svg>
      //   <svg className={'cursor-arrow pins ' + status} viewBox='0 0 100 100'>
      //     <path d='M 49 0 L 51 0 L 50 18 Z' strokeWidth='0' style={{transform: 'translate(0, -200%)'}}/>
      //     <path d='M 100 49 L 100 51 L 82 50 Z' strokeWidth='0' style={{transform: 'translate(200%, 0)'}}/>
      //     <path d='M 49 100 L 51 100 L 50 82 Z' strokeWidth='0' style={{transform: 'translate(0, 200%)'}}/>
      //     <path d='M 0 49 L 0 51 L 18 50 Z' strokeWidth='0' style={{transform: 'translate(-200%, 0)'}}/>
      //   </svg>
      // </svg>)
    }
    console.error('Unknown Status', status)
  },

  render(){
    let {status, style} = this.state     //active, inactive, enlarged
    let {color1, color2} = this.state[status]
    return (<div className={'cursor'} ref='scope' style={style}>
        <svg className='cursor-arrow'>
          <defs>
            <linearGradient id="activeGradient">
                <stop offset="0%"  stopColor={this.state.active.color1}/>
                <stop offset="100%" stopColor={this.state.active.color2}/>
            </linearGradient>
            <linearGradient id="inactiveGradient">
                <stop offset="0%"  stopColor={this.state.inactive.color1}/>
                <stop offset="100%" stopColor={this.state.inactive.color2}/>
            </linearGradient>
            {/*<linearGradient id="enlargedGradient">
                <stop offset="0%"  stopColor={this.state.enlarged.color1}/>
                <stop offset="100%" stopColor={this.state.enlarged.color2}/>
            </linearGradient>*/}
          </defs>
        </svg>
        {
            this.renderArrow(status)
        }
        {/**/}
    </div>)
  }
})

//  <circle cx="50" cy="50" r="49" stroke='cyan' fill='none'/>

  // <path d='M 0 50 A 50 50 0 0 1 50 0 ' stroke='cyan' strokeWidth='1'/>
  // <path d='M 100 50 A 50 50 0 0 1 50 100 ' stroke='cyan' strokeWidth='1'/>
