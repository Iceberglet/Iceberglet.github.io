import React from 'react'

const style = {
  background: '#1f0050',
  color: 'white'
}

const PageBreadCrumbs = React.createClass({
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
        {'Hello I am Bread Crumbs'}
        </div>
      </div>)
  }
})

export const BreadCrumbs = {
  title: 'Breadcrumbs',
  page: PageBreadCrumbs,
  style,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [0, 255, 0]
  }
}
