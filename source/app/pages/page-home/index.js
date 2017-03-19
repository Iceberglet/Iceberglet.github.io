import React from 'react'

const style = {
  background: 'black',
  color: 'white'
}

//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

const PageHome = React.createClass({
  render(){
    return (<div className='page' style={style}>
        <div className='page-content'>
        {'Hello I am Home page'}
        </div>
      </div>)
  }
})

export const Home = {
  title: 'Welcome',
  page: PageHome,
  style,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [255, 0, 0]
  }
}
