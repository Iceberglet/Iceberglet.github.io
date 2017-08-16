import React from 'react'
import ReactTooltip from 'react-tooltip'
import Messenger from 'messenger'
import {copyToClipboard} from 'utils'
import './index.scss'


//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

export default class ContactBar extends React.Component {


  goto=(url)=>{
    window.open(url)
  }

  render(){
      return <div className='contact-bar'>
        <ReactTooltip place='top' effect='solid'/>
        <i className='info-icon fa fa-envelope-o fa-fw' onClick={()=>this.goto('mailto:dragoon.cm@hotmail.com')} data-tip={'Click to mail me!'} />
        <i className='info-icon fa fa-phone-square fa-fw' onClick={()=>copyToClipboard('+65 82288168')} data-tip={'Click to copy a developer\'s phone no.'} />
        <i className='info-icon fa fa-linkedin-square fa-fw' onClick={()=>this.goto('https://www.linkedin.com/in/chen-min-nus-paristech')} data-tip={'Go to a developer\'s linkedIn'}/>
        <i className='info-icon fa fa-facebook-square fa-fw' onClick={()=>this.goto('https://www.facebook.com/min.chen.7146')} data-tip={'Go to a developer\'s Facebook'}/>
        <i className='info-icon fa fa-github fa-fw' onClick={()=>this.goto('https://github.com/Iceberglet')} data-tip={'Go to a developer\'s Github'}/>
        <i className='info-icon fa fa-file-pdf-o fa-fw' onClick={()=>this.goto('./resources/Chen Min CV.pdf')} data-tip={'A developer\'s resume'}/>
      </div>
  }
}
