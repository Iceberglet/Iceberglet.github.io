import React from 'react'
import './index.scss'

export const Event = React.createClass({
  propTypes: {
    time: React.PropTypes.number,
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf(['Profession', 'Education', 'what tion']),
    content: React.PropTypes.node
  }
})

export const Timeline = React.createClass({
  render(){
    return (<div className={'timeline'}>

    </div>)
  }
})
