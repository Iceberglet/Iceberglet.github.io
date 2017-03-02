import React from 'react'
import ReactResizeDetector from 'react-resize-detector'
import ReactDOM from 'react-dom'
import { Marking } from './marking'
import { getTransformStyle } from 'util'
import './pointer-navigator.css'

export const PointerNavigator = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemHeight: React.PropTypes.number,
    paddingDummies: React.PropTypes.number
  },

  getDefaultProps(){
    return {
      paddingDummies: 20,
      itemHeight: 40
    }
  },

  getInitialState(){
    return {
      curr: 0,
      containerHeight: null
    }
  },

  onSelect(i){
    this.setState({
      curr: i
    })
  },

  componentDidMount(){
    this.onResize()
  },

  onResize(){
    this.setState({
      containerHeight: ReactDOM.findDOMNode(this.containerNode).offsetHeight
    })
  },

  renderList(){
    let res = this.props.items.map((n,i)=>{
      let name = 'navigator-item'
      if(this.state.curr === i){
        name += ' navigator-current'
      }
      return (<div className={name} key={i} onClick={()=>{this.onSelect(i)}}>
                <div className={'navigator-item-text no-select'}>{n}</div>
                <Marking />
              </div>)
    })
    return res
  },

  renderDummies(number, keyPrefix){
    if(number==0)
      return null
    let list = []
    for(let i = 0; i<number; i++){
      list.push(<div className='navigator-item' key={keyPrefix+i}><Marking /></div>)
    }
    return list;
  },

  render(){
    if(this.state.containerHeight===null){  //Before initialization
      return (<div className='pointer-navigator' ref={(c)=>{this.containerNode = c}}></div>)
    }
    let length = this.props.items.length
    let H = this.state.containerHeight, h = this.props.itemHeight;
    let offset = - this.state.curr * h;
    // let top = Math.max(0, length - 2*this.state.curr - 1) + this.props.paddingDummies
    // let btm = Math.max(0, 2*this.state.curr + 1 - length) + this.props.paddingDummies
    let top = length - 1 + this.props.paddingDummies
    let btm = this.props.paddingDummies
    return (<div className='pointer-navigator' ref={(c)=>{this.containerNode = c}}>
        <ReactResizeDetector handleHeight onResize={this.onResize} />
        <div className='navigator-pointer' key='pointer'/>
        <div className='navigator-container' style={getTransformStyle('translate(0px, '+offset+'px)')}>
          {this.renderDummies(top, 'top')}
          {this.renderList()}
          {this.renderDummies(btm, 'btm')}
        </div>
      </div>)
  }
})
