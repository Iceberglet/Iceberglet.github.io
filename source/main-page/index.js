import React from 'react'
import Splash from './splash'
import Menu from './menu'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'

import './main-page.scss'

const MAIN_MENU_SHIFT = 1000;

export default class MainPage extends React.Component {

  state = {
    currentMenuItem: null,
    mainPhase: false
  }

  setMenu = (menu)=>{
    let nextPhase = !this.state.currentMenuItem
    this.setState({currentMenuItem:menu}, ()=>{
      if(nextPhase){
        setTimeout(()=>{
          this.setState({mainPhase: true})
        }, MAIN_MENU_SHIFT)
      }
    })
  }

  restore = () => {
    this.setState({
      currentMenuItem: null,
      mainPhase: false
    })
  }

  render(){
    let a = this.state.currentMenuItem? ' active' : ''
    return <div className='main-page occupy'>
      <div className='filter-bg'>
        <img src='resources/bg.jpg'/>
        <div className='filter occupy'/>
      </div>
      <img className='avatar' src='resources/avatar-right.jpg'/>
      <div className={'mid top-slogan' + a}>
        {'a Developer\'s'}
        <i className={'restore-icon fa fa-refresh' + a} onClick={this.restore}/>
      </div>
      <div className={'mid headers' + a}>
          <Menu onChange={(m)=>{this.setMenu(m)}}/>
      </div>
      {this.state.mainPhase && <div className='main-page-grid'>
        <GridContainer data={GridData} currentGridKey={this.state.currentMenuItem}/>
      </div>}
      {/*



        <div className='central'>   ビジョン l\'Efficacité 质量
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>*/}
    </div>
  }
}
