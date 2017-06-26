import React from 'react'

export const TimelineItemTitle = React.createClass({
  propTypes: {
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number,
    day: React.PropTypes.number,
    title: React.PropTypes.string,
    enabled: React.PropTypes.bool
  },

  render(){
    let dateContent = this.props.year;
    if(this.props.month){
      dateContent += '.' + this.props.month
      if(this.props.day){
        dateContent += '.' + this.props.day
      }
    }
    let className='timeline-item-title ' + this.props.enabled && 'enabled'

    return <div className={className}>
      <div className='left'>{dateContent}</div>
      <div className='right'>{this.props.title}</div>
    </div>
  }
})
