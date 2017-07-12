import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'utils'
import { ExpandableBox } from 'app/components/expandable-box'
import './index.scss'

const style = {
  background: 'black',
  color: 'white'
}

//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

const PageHome = React.createClass({
  propTypes: {
    onScroll: React.PropTypes.func.isRequired
  },
  // scroll(delta){
  //   let el = ReactDOM.findDOMNode(this.refs.pageDiv)
  //   console.log(el, el.scrollTop)
  //   el.scrollTop += delta
  //   console.log(el, el.scrollTop)
  // },
  scrollToTop(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, 0, 300)
  },
  scrollToBottom(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, el.scrollHeight - el.offsetHeight, 510)
  },
  render(){
    return (<div className='page' style={style} onScroll={this.props.onScroll} ref={'pageDiv'}>
        <img src='resources/space2.jpg' className='backdrop no-select'/>
        <div className='page-content'>
          <div className='top-title no-select'>&nbsp;&nbsp;&nbsp;The Four Bases of Front End Engineering</div>
          <div className='four-pinnacle'>
            <ExpandableBox style={{marginTop: '60px'}}>
              <div className={'content-title'}>{'Style'}</div>
              <div className={'content-box'}>
                {'Clean and tidy is the new fashion. Why do you think Windows starts using monochromatic stylings instead of fancy gradients and blurry glasses from Vista? It all comes down to get rid of unnecessary stylings and ALL BECOMES SUCCINCTLY BEAUTIFUL'}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '-60px'}}>
              <div className={'content-title'}>{'Response'}</div>
              <div className={'content-box'}>
                {'Responsiveness, or feedback on controls, is an indispensable element in interactive sites and webapps, just like this box appears when your cursor moves over it, letting you know that your action, whether intended or not, is listened to by the browser'}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '-60px'}}>
              <div className={'content-title'}>{'Zazziness'}</div>
              <div className={'content-box'}>
                {'Swag is the WOW! factor that is hightly sought after. Whether you want it futuristic science-y, the 1930s old classy, or downright minimalist, you always need a fixed element running throughout your product that catches the intended audiences. '}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '60px'}}>
              <div className={'content-title'}>{'Content'}</div>
              <div className={'content-box'}>
                {'If UI is the outer appearance, then content is the soul of the webapp body. After all, nobody will come to your site just to admire your UI (well, maybe front-end engineers do). Also, good content is the best way to achieve SEO as well. Also, never decouple content with UI. The two must be form a symbiotic duo in order for the site to be consistent and enjoyable to use'}
              </div>
            </ExpandableBox>
          </div>
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
