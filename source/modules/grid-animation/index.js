import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import './index.scss'

export default class GridAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  renderExit=(status)=>{
    if(status === 'exiting'){
      return <div className='grid-animation-exit'>
        <svg viewBox='0 0 100 100'>
          <path d='M 60 60 L 90 90' />
          <path d='M 40 60 L 10 90' />
          <path d='M 40 40 L 10 10' />
          <path d='M 60 40 L 90 10' />
        </svg>
      </div>
    }
  }

  render(){
    return <Transition {...this.props} timeout={{enter: 300, exit: 400}}>
    {(status)=>{
      return <div className='grid-animation-wrapper'>
        <div className={`animation-wrapper ${status} ${this.props.className}`}>
          {this.props.children}
        </div>
        {this.renderExit(status)}
      </div>
    }}
    </Transition>
  }
}
