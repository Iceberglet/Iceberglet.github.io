import React from 'react'
// import { Splash } from './pages/splash/Splash.js'
import { TopBar } from './top-bar'
import { Cursor } from './cursor'
import { ContactMe } from './pages/page-contact-me'

export const MainPage = React.createClass({

  getInitialState(){
    return {
      currentPage: ContactMe
    }
  },

  onSelectPage(page){
    console.log(page)
  },

  render(){
    return (<div className='fill vflex'>
      {<Cursor cursorColor={this.state.currentPage.cursorColor}/>}
      <TopBar menuItems={['Contact Me', 'Home', 'About Me', 'My Path']} onSelectPage={this.onSelectPage}/>
      <this.state.currentPage.page />
    </div>)
  }
})
