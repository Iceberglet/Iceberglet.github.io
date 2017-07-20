import React from 'react'
import './pin.scss'

const pinRadius = 18;
const pinHeight = 40;
const pinTop = 6;
const pinBottom = 2;

export default class Pin extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }

  //First path is the pin
  //Second the Sphere
  //Third is light reflection
  render(){
    let _34 = pinRadius*3/4, _2 = pinRadius/2, _4 = pinRadius/4, _38 = pinRadius*3/8
    return <g className='map-pin'>
      <path d={`m ${this.props.x + pinBottom/2} ${this.props.y} l ${(pinTop-pinBottom)/2} ${-pinHeight} h ${-pinTop} l ${(pinTop-pinBottom)/2} ${pinHeight} z`}/>
      <g>
        <circle cx={this.props.x} cy={this.props.y - pinHeight} r={pinRadius} />
        <path d={`m ${this.props.x + _2} ${this.props.y - pinHeight} c 0 ${_4}, ${-_4} ${_2}, ${-_2} ${_2}`
                +` v ${_4} c ${_38} 0, ${_34} ${-_38}, ${_34} ${-_34} z`} />
      </g>
    </g>
  }
}
