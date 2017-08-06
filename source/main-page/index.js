import React from 'react'
import Splash from './splash'
import Menu from './menu'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'

import './main-page.scss'

var i = 3

export default class MainPage extends React.Component {

  state = {
    currentGridKey: 'Welcome'
  }

  onTriggerShow = () =>{
    this.setState({currentGridKey: ['Welcome', 'Education', 'Work', 'Expertise'][(i++)%4] })
  }

  render(){
    return <div className='main-page occupy'>
      <div className='filter-bg'>
        <img src='resources/bg.jpg'/>
        <div className='filter occupy'/>
      </div>
      <img className='avatar' src='resources/avatar-right.jpg'/>
      <div className='mid top-slogan'>
        {'a Developer\'s'}
      </div>
      <div className='mid headers'>
          <Menu />
      </div>
      {/*<div className='central'>   ビジョン l\'Efficacité 质量
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>*/}
    </div>
  }
}
