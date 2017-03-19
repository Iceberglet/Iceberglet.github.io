import React from 'react'

const style = {
  background: 'white',
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
