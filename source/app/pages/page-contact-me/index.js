import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'util'
import './index.scss'
import { cursorCallback } from 'app/cursor'

const style = {
  background: '#e4e4e4',
  color: 'black'
}

//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

const PageContactMe = React.createClass({
  scrollToTop(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, 0, 300)
  },
  scrollToBottom(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, el.scrollHeight - el.offsetHeight, 510)
  },
  render(){
    return (<div className='page' style={style} ref={'pageDiv'}>
        <div className='page-content'>
          <div className='info-list'>
            <div className='info-list-item' {...cursorCallback}><i className='info-icon fa fa-envelope-o fa-fw'/>{'dragoon.cm@hotmail.com'}</div>
            <div className='info-list-item' {...cursorCallback}><i className='info-icon fa fa-phone-square fa-fw'/>{'+65 82288168'}</div>
            <div className='info-list-item' {...cursorCallback}><i className='info-icon fa fa-linkedin-square fa-fw'/><a href='https://www.linkedin.com/in/chen-min-nus-paristech'>{'My Linkedin'}</a><i className='hyperlink fa fa-angle-right fa-fw'/></div>
            <div className='info-list-item' {...cursorCallback}><i className='info-icon fa fa-facebook-square fa-fw'/><a href='https://www.facebook.com/min.chen.7146'>{'My Facebook'}</a><i className='hyperlink fa fa-angle-right fa-fw'/></div>
            <div className='info-list-item' {...cursorCallback}><i className='info-icon fa fa-github fa-fw'/><a href='https://github.com/Iceberglet'>{'My Github'}</a><i className='hyperlink fa fa-angle-right fa-fw'/></div>
          </div>
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
