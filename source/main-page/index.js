import React from 'react'
import Splash from './splash'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'

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
    return <div className='main-page relative-occupy'>
      <div className='central'>
        <Splash onClickAvatar={this.onTriggerShow}/>
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>
    </div>
  }
}
