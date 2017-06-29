import React from 'react';
import { Cursor, cursorCallback } from 'fancy-cursor';

const centerStyle = {
  background: '#5555d4',
  color: 'white',
  fontSize: '22px',
  width: '120px',
  height: '120px'
}

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
    return <div className='no-pointer occupy center-children' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
      <div className='center-children' style={centerStyle} {...cursorCallback}>{'Hover Me~'}</div>
      {this.state.show && <Cursor cursorColor={{
          active: [0, 255, 200],
          inactive: [0, 255, 200]
        }}/>}
    </div>
  }
})

export const ItemCursor = {
  title: 'Fancy Cursor',
  boxItem: CursorContainer,
  description: ['When the dull default cursor just won\'t cut it, we need a more drastic measure',
      'Until a new HTML/CSS standard implements animated gifs for cursor, we have to resort to the dark side of the force:',
      '- Remove the cursor from document by setting: "cursor: none;" in CSS',
      '- Add an animated cursor element',
      '- Hook up the mouse move event over the document, and update the cursor position in real time',
      '- Add necessary hooks for mouse event (e.g. animation on hover)',
      'And Voila!'
    ],
  bottomLine: <div>
    <a href = 'https://github.com/Iceberglet/Iceberglet.github.io/tree/master/source/modules/fancy-cursor'>
      <i className='fa fa-github fa-fw'/>
    </a>
  </div>
}
