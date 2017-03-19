import React from 'react'

const style = {
  background: 'blue',
  color: 'white'
}

const PageContactMe = React.createClass({
  render(){
    return (<div className='page' style={style}>
        {'Hello I am a page'}
      </div>)
  }
})

export const ContactMe = {
  title: 'Contact Me',
  page: PageContactMe,
  style,
  cursorColor: {
    active: [255, 0, 0],
    inactive: [0, 255, 200],
    enlarged: [255, 0, 0]
  }
}
