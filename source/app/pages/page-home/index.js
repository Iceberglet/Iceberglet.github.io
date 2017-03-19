import React from 'react'
import ReactDOM from 'react-dom'
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
  scroll(delta){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    console.log(el, el.scrollTop)
    el.scrollTop += delta
    console.log(el, el.scrollTop)
  },
  render(){
    return (<div className='page' style={style} onScroll={this.props.onScroll} ref={'pageDiv'}>
        <img src='resources/space2.jpg' className='backdrop no-select'/>
        <div className='page-content'>
          <div className='top-title no-select'>&nbsp;&nbsp;&nbsp;Venture into the Unimaginable</div>
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
