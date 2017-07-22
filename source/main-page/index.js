import React from 'react'
import Splash from './splash'

import './main-page.scss'

export default class MainPage extends React.Component {

  state = {
    enabled: false
  }

  enable = ()=>{
    if(!this.state.enabled){
      this.setState({
        enabled: true
      })
    }
  }

  render(){
    return <div className='main-page occupy'>
      <div className={'top-backdrop ' + (this.state.enabled && 'active')} style={{}}></div>
      <Splash onEnable={this.enable} enabled={this.state.enabled}/>
      <div className={'page-content ' + (this.state.enabled && 'active')} ></div>
    </div>
  }
}
