import React from 'react'
import './index.scss'

export const Event = React.createClass({
  propTypes: {
    time: React.PropTypes.number,
    height: React.PropTypes.number, //distance to top. in terms of px
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf(['Profession', 'Education', 'Personal']),
    content: React.PropTypes.node
  },

  render(){
    return (<div className={'timeline'}>
        <div className='timeline-left'></div>
        <div className='timeline-center'></div>
        <div className='timeline-right'></div>
      </div>)
  }
})

export const Timeline = React.createClass({
  render(){
    return (<div>
    </div>)
  }
})
