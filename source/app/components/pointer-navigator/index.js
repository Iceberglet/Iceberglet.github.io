import React from 'react'
import { Marking } from './marking'
import './pointer-navigator.css'

export const PointerNavigator = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  getInitialState(){
    return {
      curr: 0
    }
  },

  renderList(){
    let res = this.props.items.map(i=><div className='navigator-item' key={i}>
                                        <div className='navigator-item-text no-select'>{i}</div>
                                        <Marking />
                                      </div>)
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
    let length = this.props.items.length
    let top = Math.max(0, length - 2*this.state.curr - 1)
    let btm = Math.max(0, 2*this.state.curr + 1 - length)
    return (<div className='pointer-navigator'>
        {this.renderDummies(top, 'top')}
        {this.renderList()}
        {this.renderDummies(btm, 'btm')}
      </div>)
  }
})
