import React from 'react'

const style = {
  background: 'blue',
  color: 'white'
}

//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

const PageContactMe = React.createClass({
  render(){
    return (<div className='page' style={style}>
        <div className='page-content'>
        {'Hello I am a page'}
        </div>
      </div>)
  }
})

export const ContactMe = {
  title: 'Name Card',
  page: PageContactMe,
  style,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [255, 0, 0]
  }
}
