import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'util'

const style = {
  background: '#00005f',
  color: 'white'
}

const PageTimeline = React.createClass({
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
          {'Hello I am another page'}
        </div>
      </div>)
  }
})

export const Timeline = {
  title: 'Timeline',
  page: PageTimeline,
  style,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [255, 0, 0]
  }
}
