import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import './index.scss'

export default class GridAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render(){
    return <Transition {...this.props} timeout={{enter: 300, exit: 300}}>
    {(status)=>{
      return <div className='grid-animation-wrapper'>
        <div className={`animation-wrapper ${status} ${this.props.className}`}>
          {this.props.children}
        </div>
      </div>
    }}
    </Transition>
  }
}
