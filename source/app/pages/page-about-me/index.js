import React from 'react'

const style = {
  background: '#00005f',
  color: 'white'
}

const PageAboutMe = React.createClass({
  render(){
    return (<div className='page' style={style}>
        <div className='page-content'>
          {'Hello I am another page'}
        </div>
      </div>)
  }
})

export const AboutMe = {
  title: 'Timeline',
  page: PageAboutMe,
  style,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [0, 255, 0]
  }
}
