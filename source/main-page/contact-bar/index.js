import React from 'react'
import ReactTooltip from 'react-tooltip'
import Messenger from 'messenger'
import './index.scss'


//****************** Contact Information ************************
// CV, Email, Linkedin, Facebook, Telephone

export default class ContactBar extends React.Component {

  copy = (text)=>{
    if(!document.execCommand){
      window.prompt(`Hit Ctrl+C & Enter to Copy (${text})`, text);
      return;
    }
    var textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      Messenger.send('notification', `${text} Copied to Clipboard`)
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  }

  render(){
      return <div className='contact-bar'>
        <ReactTooltip place='top' effect='solid'/>
        <i className='info-icon fa fa-envelope-o fa-fw' onClick={()=>this.copy('dragoon.cm@hotmail.com')} data-tip='Click to copy my email' />
        <i className='info-icon fa fa-phone-square fa-fw' onClick={()=>this.copy('+65 82288168')} data-tip='Click to copy my phone no.' />
        <a className='info-icon fa fa-linkedin-square fa-fw' href='https://www.linkedin.com/in/chen-min-nus-paristech' data-tip='Go to my linkedIn'/>
        <a className='info-icon fa fa-facebook-square fa-fw' href='https://www.facebook.com/min.chen.7146' data-tip='Go to my Facebook'/>
        <a className='info-icon fa fa-github fa-fw' href='https://github.com/Iceberglet' data-tip='Go to my Github'/>
      </div>
  }
}
