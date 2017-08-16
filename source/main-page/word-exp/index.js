import React from 'react'
import PropTypes from 'prop-types'
// import CSSTransition from 'react-transition-group/CSSTransition'

import './index.scss'

const ANIMATION_TIME = 500;
const INTERVAL = ANIMATION_TIME / NameCardData.length;

class WorkExp extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  state = {
  }

  componentWillUnmount=()=>{
    // clearTimeout(this.timeout)
  }

  componentWillReceiveProps=(props)=>{
    status = props.status;
    if(status === 'entering'){
      this.processEnter()
    }
    if(status === 'exiting'){
      this.processExit()
    }
  }

  processEnter = ()=>{
  }

  processExit = ()=>{
  }

  render(){
    return <div className='work-exp'>
    </div>
  }
}
