import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'util'
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
          <div className='top-title no-select'>&nbsp;&nbsp;&nbsp;The Four Pinnacles of Front End Engineering</div>
          <div className='four-pinnacle'>
            <ExpandableBox style={{marginTop: '18%'}}>
              <div>{'Style'}</div>
              <div className={'content-box'}>
                {'Clean is the new fashion'}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '12%'}}>
              <div>{'Resposive'}</div>
              <div className={'content-box'}>
                {'Responsiveness, or feedback on controls, is an indispensable element in interactive sites and webapps'}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '12%'}}>
              <div>{'Swag'}</div>
              <div className={'content-box'}>
                {'Swag is always sought after nowadays. It is the same as'}
              </div>
            </ExpandableBox>
            <ExpandableBox style={{marginTop: '18%'}}>
              <div>{'Content'}</div>
              <div className={'content-box'}>
                {'If UI is the outer appearance, then content is the soul of the webapp body. '}
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
