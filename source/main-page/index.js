import React from 'react'
import Splash from './splash'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'
import {isMobile} from 'utils'

import './main-page.scss'

var i = 1

export default class MainPage extends React.Component {

  state = {
    currentGridKey: 'Welcome'
  }

  onTriggerShow = () =>{
    this.setState({currentGridKey: ['Welcome', 'Education', 'Work', 'Expertise'][(i++)%3] })
  }

  render(){
    let style = isMobile()? {minWidth: '600px', minHeight: '320px'} : {}
    return <div className='main-page' style={style}>
      <div className='central'>
        <Splash onClickAvatar={this.onTriggerShow}/>
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>
    </div>
  }
}
