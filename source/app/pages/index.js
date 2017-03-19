import { ContactMe } from './page-contact-me'
import { AboutMe } from './page-about-me'
import { BreadCrumbs } from './page-breadcrumbs'
import { Home } from './page-home'
import ReactDOM from 'react-dom'

export const Pages = {Home, BreadCrumbs, AboutMe, ContactMe}

Object.keys(Pages).forEach(pg=>{
  let p =Pages[pg]
  p.scroll = (function(delta){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    console.log(el, el.scrollTop)
    el.scrollTop += delta
    console.log(el, el.scrollTop)
  }).bind(p);
  p.scrollToTop = (function(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, 0, 300)
  }).bind(p);
  p.scrollToBottom = (function(){
    let el = ReactDOM.findDOMNode(this.refs.pageDiv)
    scrollElement(el, el.scrollTop, el.scrollHeight - el.offsetHeight, 510)
  }).bind(p);
})
