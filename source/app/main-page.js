import React from 'react'
// import { Splash } from './pages/splash/Splash.js'
import { TopBar } from './top-bar'
import { Cursor } from './cursor'
// import { ContactMe } from './pages/page-contact-me'
// import { AboutMe } from './pages/page-about-me'
import { Pages } from './pages'
import { Arrow } from './components/arrow'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LocalStorageMixin from 'react-localstorage'


export const MainPage = React.createClass({
  mixins: [LocalStorageMixin],
  getDefaultProps: function() {
    return {
      stateFilterKeys: ['currentPage']
    };
  },

  //************************* Scroll Related ********************
  onScroll(e){
    // console.log(e.target.scrollTop, e.target.scrollHeight, e.target.offsetHeight)
    let {scrollTop, scrollHeight, offsetHeight} = e.target
    let {up, down} = this.state
    let newUp = scrollTop > 0, newDown = scrollTop + offsetHeight < scrollHeight
    if(newUp!==up || newDown!==down){
      this.setState({
        up: newUp, down: newDown
      })
    }
  },

  scrollToTop(){
    this.refs.currentPage.scrollToTop()
  },

  scrollToBottom(){
    this.refs.currentPage.scrollToBottom()
  },

  getInitialState(){
    return {
      currentPage: 0,
      up: false,
      down: true
    }
  },

  onSelectPage(idx){
    this.setState({
      currentPage: idx,
      up: false,
      down: true
    })
  },

  render(){
    let {currentPage, up, down} = this.state
    let page = Pages[currentPage]
    return (<div className='fill vflex'>
      <TopBar menuItems={Object.keys(Pages).map(p=>Pages[p].title)} currentItem={page.title} onSelectPage={this.onSelectPage} style={page.style}/>
      <div className='go-up'><Arrow onClick={this.scrollToTop} enabled={up} color={page.style.color}/></div>
      <div className='go-down'><Arrow rotation={180} onClick={this.scrollToBottom} enabled={down} color={page.style.color}/></div>
      <div className='page-wrapper'>
        <ReactCSSTransitionGroup transitionName='page-transition' transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            <page.page key={page.title} onScroll={this.onScroll} ref='currentPage'/>
        </ReactCSSTransitionGroup>
      </div>
      {<Cursor cursorColor={page.cursorColor}/>}
    </div>)
  }
})
