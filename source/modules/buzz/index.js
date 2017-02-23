import React from 'react'
import './buzz.css'

export const Buzz = React.createClass({
  propTypes: {
    word: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  },

  render(){
    return(
      <div className="buzz_wrapper" style={this.props.style}>
        <div className="text">
          <span>{this.props.word}</span>
          <span>{this.props.word}</span>
          <span>{this.props.word}</span>
          <span>{this.props.word}</span>
          <span>{this.props.word}</span>
        </div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
        <div className="scanline"></div>
      </div>
    )
  }
})
