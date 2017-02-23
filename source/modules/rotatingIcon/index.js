import React from 'react'
import { KeyFrame } from 'keyframe'
import './rotatingIcon.css'

const getRandomRotation = ()=>`rotate(${Math.random()*360}deg)`

export const RotatingIcon = React.createClass({
  propTypes: {
    sizeInPx: React.PropTypes.number,
    strokeSize: React.PropTypes.number,
    color: React.PropTypes.string,
    antiClockWise: React.PropTypes.bool
  },

  getDefaultProps(){
    return {
      sizeInPx: 150,
      strokeSize: 5,
      color: '#227dff',
      antiClockWise: false
    }
  },

  render(){
    let antiClock = this.props.antiClockWise? 1 : -1
    let radius = Math.round(this.props.sizeInPx / 2)
    let svgSize = this.props.sizeInPx + Math.ceil(this.props.strokeSize * 2)
    let xy = svgSize / 2
    let circum = Math.round(this.props.sizeInPx * Math.PI)
    let actualRadius = Math.round(radius)
    let actualCircum = Math.round(actualRadius*2*Math.PI)

    let animationName = 'rotate-icon-' + Math.round(radius)
    let animationStyle = {animation: animationName + ' 2s infinite ease-in-out', transform: getRandomRotation(), animationDelay: `${Math.random()*2}s`}
    let keyFrameDetail = {
      '0%': {
        strokeDashoffset: -actualCircum * antiClock
      },
      '50%': {
        strokeDashoffset: 0
      },
      '100%': {
        strokeDashoffset: actualCircum * antiClock
      }
    }

    let containerStyle = {
      width: svgSize + 'px',
      height: svgSize + 'px'
    }
    return (<div className='rotating-icon' style={containerStyle}>
      <KeyFrame animationName={animationName} animationDetails={keyFrameDetail}/>
      {<svg className='rotate-inv' style={{...containerStyle, strokeDashoffset: actualCircum}}>
        <circle className={this.props.antiClockWise? 'circle-rotate-inv': 'circle-rotate'} style={animationStyle} cx={xy} cy={xy} r={actualRadius} fill='transparent' stroke={this.props.color}
        strokeWidth={this.props.strokeSize} strokeLinecap='miter' strokeDasharray={actualCircum} strokeLinejoin='square'
        />
      </svg>}
    </div>)
  }
})
