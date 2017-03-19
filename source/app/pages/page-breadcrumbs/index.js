import React from 'react'

const style = {
  background: 'black',
  color: 'white'
}

const PageBreadCrumbs = React.createClass({
  render(){
    return (<div className='page' style={style}>
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
