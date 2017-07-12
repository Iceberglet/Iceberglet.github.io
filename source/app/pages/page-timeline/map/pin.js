import React from 'react'
import './pin.scss'

const pinRadius = 18;
const pinHeight = 60;
const pinTop = 8;
const pinBottom = 2;

export default class Pin extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }

  render(){
    return <g className='map-pin'>
      <path d={`m ${this.props.x + pinBottom/2} ${this.props.y} l ${(pinTop-pinBottom)/2} ${-pinHeight} h ${-pinTop} l ${(pinTop-pinBottom)/2} ${pinHeight} z`}/>
      <circle cx={this.props.x} cy={this.props.y - pinHeight} r={pinRadius} />
    </g>
  }
}
