import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

export default class ContentSwitcher extends React.Component {
  static propTypes = {
    currentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    animationTime: PropTypes.number
  }
  static defaultProps = {
    animationTime: 1000,
    currentKey: null
  }
  state = {
    actualKey: this.props.currentKey
  }

  shouldComponentUpdate=(props, state)=>{
    //compare states
    if(JSON.stringify(this.state) !== JSON.stringify(state)){
      return true;
    }
    //if on standby
    if(this.status){
      return false;
    }
    return true;
  }

  componentWillReceiveProps=(props)=>{
    this.keyQueued = props.currentKey
    if(!this.status){
      if(!this.state.actualKey){
        //only add.
        this.processAdd();
      } else if(!props.currentKey || this.state.actualKey !== props.currentKey){
        //either new key is null, or new key is different
        this.processRemove();
      }
    } else {
      // console.log(`Currently in ${this.status}. Only updating queued key to ${props.currentKey}`)
    }
  }

  //if currently there is a key, remove animation sets in first, then go for new key
  //otherwise goes straight to new key
  status = null//[null, removing, adding]
  keyQueued = null

  //will remove and also queue up the next key
  processRemove = ()=>{
    if(this.keyQueued === undefined){
      this.status = null;
      return;
    }
    this.status = 'removing'
    this.setState({
      actualKey: undefined
    }, ()=>{
      this.timeout = setTimeout(this.processAdd, this.props.animationTime)
    })
  }

  processAdd = ()=>{
    this.status = 'adding'
    this.setState({
      actualKey: this.keyQueued,
      expandIdx: undefined
    }, ()=>{
      this.keyQueued = undefined
      this.timeout = setTimeout(this.processRemove, this.props.animationTime)
    })
  }

  componentWillUnmount = ()=>{
    clearTimeout(this.timeout)
  }

  renderChild = (child, idx)=>{
    let childKey = child.props.contentKey
    return <Transition key={childKey} in={this.state.actualKey === childKey} timeout={this.props.animationTime} mountOnEnter unmountOnExit appear>
      {(status)=>{
        return React.cloneElement(child, {...child.props, status})
      }}
    </Transition>
  }

  render(){
    return <div className='occupy'>{
      this.props.children.map? this.props.children.map(this.renderChild) : this.renderChild(this.props.children)
    }</div>
  }
}
