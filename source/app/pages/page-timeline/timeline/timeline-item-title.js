import React from 'react'

export const TimelineItemTitle = React.createClass({
  propTypes: {
    dayObj: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
    enabled: React.PropTypes.bool
  },

  render(){
    let className='timeline-item-title ' + this.props.enabled && 'enabled'

    return <div className={className}>
      <div className='left'>{this.props.dayObj.toStr}</div>
      <div className='right'>{this.props.title}</div>
    </div>
  }
})
