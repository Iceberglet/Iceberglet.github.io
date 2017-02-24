import React from 'react'
import './AnimatedTag.css'

export const AnimatedTag = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    content: React.PropTypes.string.isRequired
  },

  // getDefaultProps(){
  //   return {
  //   }
  // },

  render(){
    return (<div className='animated-tag'>
        <div className='animated-tag-container'>
          <div className='animated-tag-leaf' style={this.props.style}>
            <div className='animated-tag-content'>{this.props.content || 'NO CONTENT'}</div>
          </div>
        </div>
      </div>)
  }
})
