import React from 'react';
import { Cursor, cursorCallback } from 'fancy-cursor';

const CursorContainer = React.createClass({

  getInitialState(){
    return {
      show: false
    }
  },

  onMouseEnter(){
    this.setState({
      show: true
    })
  },

  onMouseLeave(){
    this.setState({
      show: false
    })
  },

  render(){
    return <div className='no-pointer occupy' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>

      {this.state.show && <Cursor cursorColor={{
          active: [0, 255, 200],
          inactive: [0, 255, 200],
          enlarged: [255, 0, 0]
        }}/>}
    </div>
  }
})

export const ItemCursor = {
  title: 'Fancy Cursor',
  boxItem: CursorContainer,
  description: ['Fancy Cursor'],
  bottomLine: <div>
    <a href = 'https://github.com/Iceberglet/Iceberglet.github.io/tree/master/source/modules/fancy-cursor'>
      <i className='fa fa-github fa-fw'/>
    </a>
  </div>
}
