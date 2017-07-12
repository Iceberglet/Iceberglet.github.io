import React from 'react'
import ReactDOM from 'react-dom'
import {map_data, map_meta_data} from './data'
import {registerToMouse, unsubFromMouse} from 'util'
import SquareButton from 'square-button'
import './world-map.scss'

const MAG_MAX = 5;
const MAG_MIN = 1;

const RandomColorList = ['red', 'brown', 'orange', 'purple']

export default class WorldMap extends React.Component {
  static propTypes = {
    renderOption: React.PropTypes.object,   //country._id: color
    mag: React.PropTypes.number,
    translateX: React.PropTypes.number,
    translateY: React.PropTypes.number
  }

  static defaultProps = {
    mag: 1,
    translateX: 0,
    translateY: 0
  }

  componentDidMount=()=>{
    let gEl =  ReactDOM.findDOMNode(this.refs.map)
    this.setState({
      mapElement: gEl
    })
  }

  renderCountry=(country, idx)=>{
    let color = RandomColorList[idx % RandomColorList.length]
    let c = this.props.renderOption[country._id]
    if(c){
      style.fill = 'green'
    }
    return <path key={country._id} d={country._d} className={'country ' + color}/>
  }

  render(){
    let {mag, translateX, translateY} = this.props
    let style = {
      transform: `scale(${mag}, ${mag})`
    }
    let gStyle = {
      transform: `translate(${translateX}px, ${translateY}px)`,
      strokeWidth: 1 / mag + 'px'
    }
    return <div className='occupy world-map'>
      <svg style={style} width='100%' height='100%' viewBox={map_meta_data.viewBox}>
        <g style={gStyle} ref='map'>
          {map_data.map(this.renderCountry)}
          {this.props.children}
        </g>
      </svg>
    </div>
  }
}
