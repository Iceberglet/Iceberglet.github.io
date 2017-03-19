import React from 'react'
// import { Splash } from './pages/splash/Splash.js'
import { TopBar } from './top-bar'
import { Cursor } from './cursor'
// import { ContactMe } from './pages/page-contact-me'
// import { AboutMe } from './pages/page-about-me'
import { Pages } from './pages'
import { Arrow } from './components/arrow'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'



export const MainPage = React.createClass({
  onScroll(e){
    // console.log(e.target.scrollTop, e.target.scrollHeight, e.target.offsetHeight)
    let {scrollTop, scrollHeight, offsetHeight} = e.target
    // console.log(scrollTop, scrollHeight, offsetHeight)
    if(scrollTop > 0){
      //Can scroll up
    }
    if (scrollTop + offsetHeight < scrollHeight){
      //Can scroll down
    }
  },

  getInitialState(){
    return {
      currentPage: Pages.Home
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
      <div className='go-up'><Arrow fontSize={80}/></div>
      <div className='go-down'><Arrow fontSize={80} rotation={180}/></div>
      <div className='page-wrapper'>
        <ReactCSSTransitionGroup transitionName='page-transition' transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            <currentPage.page key={currentPage.title} onScroll={this.onScroll} ref='currentPage'/>
        </ReactCSSTransitionGroup>
      </div>
      {<Cursor cursorColor={currentPage.cursorColor}/>}
    </div>)
  }
})
