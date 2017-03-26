import React from 'react'
import { randomBetween } from 'util'
import './index.scss'

//offsetting a and b
const generateGradient = (scale) => {
  let x = randomBetween(0, scale)
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
  let range = allowBackwardTrace ? 0.7 : 0.35;
  for(let i = 0; i < num; i++){
    let newX = (i+1) * chunk + randomBetween(-range*chunk, range*chunk), newY = randomBetween(h / 4, 3 * h / 4)
    nodes.push([Math.round(newX), Math.round(newY), ...generateGradient(scale)])
  }
  nodes.push([w, 0.5*h, scale, 0])
  return nodes;
}

const generatePath = (nodes) =>{
  let paths = []
  for(let i = 0; i < nodes.length - 1; i++){
    let n = nodes[i], n1 = nodes[i+1]
    let d = `M ${n[0]} ${n[1]} C ${n[2] + n[0]} ${n[3] + n[1]} ${n1[0] - n1[2]} ${n1[1] - n1[3]} ${n1[0]} ${n1[1]}`
    paths.push(d)
  }
  return paths;
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
      width: 500,
      height: 150,
      stroke: 'red',
      strokeWidth: 1
    }
  },

  getInitialState(){
    let paths = generatePath(computeNodes(this.props.height, this.props.width, this.props.nodes, this.props.tinyLoop))
    return {paths}
  },

  render(){
    return <svg className={'bezier-arrow'} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
      {this.state.paths.map((D, i)=>{
        return <path d={D} key={i} stroke={this.props.stroke} strokeWidth={this.props.strokeWidth} fill='none'/>
      })}
    </svg>;
  }
})
