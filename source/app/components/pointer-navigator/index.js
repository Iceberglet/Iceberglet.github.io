import React from 'react'
// import ReactResizeDetector from 'react-resize-detector'
import ReactDOM from 'react-dom'
import { Marking } from './marking'
import { getTransformStyle } from 'util'
import './pointer-navigator.css'

export const PointerNavigator = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemHeight: React.PropTypes.number,
    onSelect: React.PropTypes.func.isRequired,
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
      offset: 0
    }
  },

  componentDidMount(){
    // this.onResize()
  },

  // onResize(){
  //   this.setState({
  //     containerHeight: ReactDOM.findDOMNode(this.containerNode).offsetHeight
  //   })
  // },

  scrollMultipler: 50,
  scrollDelay: 100,   //If action happens within 100ms, do not recompute place
  scrollTimeout: null,

  onScroll(e){
    let offset = this.state.offset + this.scrollMultipler * (e.deltaY > 0? -1 : 1)
    this.setState({
      offset
    }, ()=>{
      if(this.scrollTimeout){
        window.clearTimeout(this.scrollTimeout)
      }
      this.scrollTimeout = setTimeout(this.recomputeOffset, this.scrollDelay)
    })
  },

  //Called after scroll finish
  recomputeOffset(){
    let i = Math.round(- this.state.offset / this.props.itemHeight)
    i = Math.max(0, i)
    i = Math.min(i, this.props.items.length - 1)
    this.scrollTimeout = null;
    this.setScrollToItem(i)
  },

  setScrollToItem(i){
    let offset = - i * this.props.itemHeight;
    let needToInvoke = this.state.curr !== i
    this.setState({
      offset, curr: i
    }, ()=>{
      this.props.onSelect && this.props.onSelect(i)
    })
  },

  renderList(){
    let res = this.props.items.map((n,i)=>{
      let name = 'navigator-item'
      if(this.state.curr === i){
        name += ' navigator-current'
      }
      return (<div className={name} key={i} onClick={()=>{this.setScrollToItem(i)}}>
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
    let length = this.props.items.length;
    let top = length - 1 + this.props.paddingDummies
    let btm = this.props.paddingDummies
    return (<div className='pointer-navigator' ref={(c)=>{this.containerNode = c}} onWheel={this.onScroll}>
        {/*<ReactResizeDetector handleHeight onResize={this.onResize} />*/}
        <div className='navigator-pointer' key='pointer'/>
        <div className='navigator-container' style={getTransformStyle('translate(0px, '+this.state.offset+'px)')}>
          {this.renderDummies(top, 'top')}
          {this.renderList()}
          {this.renderDummies(btm, 'btm')}
        </div>
        <div className='gradient-mask' key='mask'/>
      </div>)
  }
})
