import React from 'react'
import { randomBetween } from 'util'
import './index.scss'

//offsetting a and b
const generateGradient = (scale, positive) => {
  let x = positive ? randomBetween(0.3*scale, scale) : - randomBetween(0.3*scale, scale)
  let y = Math.sqrt(Math.pow(scale, 2) - Math.pow(x, 2))
  // console.log('x, y: ', x, y)
  return [Math.round(x), Math.round(y)]
}

//Getting the x and y coordinates of the nodes from random.
const computeNodes = (h, w, num, allowBackwardTrace) => {
  //first and last should have fixed positions and gradient
  //x, y, gradientX, gradientY
  //gradientX and gradientY satisfy (gx^2 +gy^2 = 0.25 * min(h, w)^2, gradientX < 0.5 * min(h, w) )
  let nodes = [], scale = Math.min(h, w) / 2, chunk = w / (num+1)
  nodes.push([0, 0.5*h, scale, 0])
  let range = 0.15;
  for(let i = 0; i < num; i++){
    let isTop = Math.random() > 0.5, isBack = Math.random() > 1;
    let newX = (i+1) * chunk + randomBetween(-range*chunk, range*chunk), newY = isTop? randomBetween(h / 10, 2 * h / 5) : randomBetween(3 * h / 5, 9 * h / 10)
    nodes.push([Math.round(newX), Math.round(newY), ...generateGradient(scale, isBack)])
  }
  nodes.push([w, 0.5*h, scale, 0])
  return nodes;
}

const generatePath = (nodes) =>{
  let n = nodes[0], n1 = nodes[1]
  let d = `M ${n[0]} ${n[1]} C ${n[2] + n[0]} ${n[3] + n[1]} ${n1[0] - n1[2]} ${n1[1] - n1[3]} ${n1[0]} ${n1[1]}`;
  for(let i = 1; i < nodes.length - 1; i++){
    n = nodes[i], n1 = nodes[i+1];
    d += ` S ${n1[0] - n1[2]} ${n1[1] - n1[3]} ${n1[0]} ${n1[1]}`
  }
  return d;
}

//Creates a curvy arrow extending from mid-left to mid-right
//The container can then be rotated and scaled to fit
//NOTE: Must provide a bounding box with position. This class creates an element that fills the bounding box
export const RandomBezierCurveArrow = React.createClass({
  propTypes: {
    nodes: React.PropTypes.number,
    tinyLoop: React.PropTypes.bool,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    stroke: React.PropTypes.string,   //color
    strokeWidth: React.PropTypes.number //width
  },

  getDefaultProps(){
    return {
      nodes: 2,
      tinyLoop: true,
      width: 1800,
      height: 300,
      stroke: 'red',
      strokeWidth: 5
    }
  },

  getInitialState(){
    let path = generatePath(computeNodes(this.props.height, this.props.width, this.props.nodes, this.props.tinyLoop))
    return {path}
  },

  render(){
    let {width, height, stroke, strokeWidth} = this.props;
    return <svg className={'bezier-arrow'} viewBox={`${- 2 * height} 0 ${width + 2 * height} ${height}`}>
      <path d={this.state.path} key={'stroke'} stroke={stroke} strokeWidth={strokeWidth} fill='none'/>
      <path key={'arrow'} d={`M ${width - 0.15*height} ${0.4*height} L ${width} ${0.5*height} L ${width-0.15*height} ${0.6*height}`} stroke={stroke} strokeWidth={strokeWidth} fill='none'/>
    </svg>;
  }
})
