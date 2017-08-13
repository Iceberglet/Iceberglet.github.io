import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import {NameCardData} from './data'

import './index.scss'

const ANIMATION_TIME = 500;
const INTERVAL = ANIMATION_TIME / NameCardData.length;

class NameCardItem extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.array
  }

  render(){
    return <CSSTransition in={this.props.show} classNames='name-card-item' timeout={ANIMATION_TIME}
                          mountOnEnter unmountOnExit appear>
      <div className='name-card-item'>
        <div className='item-title'>{this.props.title + ' :'}</div>
        <div className='item-content'>
          {this.props.content.map((c, i)=><div key={i} className='item-content-row'>{c}</div>)}
        </div>
      </div>
    </CSSTransition>
  }
}

export default class NameCard extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  state = {
    shown: [],
    remaining: []
  }

  componentWillUnmount=()=>{
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps=(props)=>{
    status = props.status;
    if(status === 'entering'){
      this.setState({
        shown: [],
        remaining: [...Array(NameCardData.length).keys()]
      }, this.processEnter)
    }
    if(status === 'exiting'){
      this.processExit()
    }
  }

  processEnter = ()=>{
    if(this.state.remaining.length === 0){
      return;
    }
    this.setState(s=>{
      s.shown.push(s.remaining.shift())
      return s;
    }, ()=>{
      this.timeout = setTimeout(this.processEnter, INTERVAL)
    })
  }

  processExit = ()=>{
    if(this.state.shown.length === 0){
      return;
    }
    this.setState(s=>{
      s.shown.pop()
      return s;
    }, ()=>{
      this.timeout = setTimeout(this.processExit, INTERVAL)
    })
  }

  render(){
    return <div className='name-card'>
      {NameCardData.map((d, i)=>{
        return <NameCardItem key={d.title} title={d.title} content={d.content} show={this.state.shown.indexOf(i)>-1}/>
      })}
    </div>
  }
}
