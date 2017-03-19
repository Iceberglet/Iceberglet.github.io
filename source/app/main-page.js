import React from 'react'
// import { Splash } from './pages/splash/Splash.js'
import { TopBar } from './top-bar'
import { Cursor } from './cursor'
// import { ContactMe } from './pages/page-contact-me'
// import { AboutMe } from './pages/page-about-me'
import { Pages } from './pages'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'



export const MainPage = React.createClass({

  getInitialState(){
    return {
      currentPage: Pages.ContactMe
    }
  },

  onSelectPage(page){
    this.setState({
      currentPage: Pages[Object.keys(Pages).find(p=>Pages[p].title===page)]
    })
  },

  render(){
    let currentPage = this.state.currentPage
    return (<div className='fill vflex'>
      <TopBar menuItems={Object.keys(Pages).map(p=>Pages[p].title)} currentItem={currentPage.title} onSelectPage={this.onSelectPage} style={currentPage.style}/>
      <div className='page-wrapper'>
        <ReactCSSTransitionGroup transitionName='page-transition' transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            <currentPage.page key={currentPage.title}/>
        </ReactCSSTransitionGroup>
      </div>
      {<Cursor cursorColor={currentPage.cursorColor}/>}
    </div>)
  }
})
