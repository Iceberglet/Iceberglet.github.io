import React from 'react'
import Menu from './menu'
import ContactBar from './contact-bar'
import Notificator from './notification-system'
import ContentSwitcher from 'content-switcher'
import NameCard from './name-card'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'

import './main-page.scss'

const MAIN_MENU_SHIFT = 1000;

export default class MainPage extends React.Component {

  state = {
    currentMenuItem: null,
    gray: true
  }

  setMenu = (menu)=>{
    this.setState({
      currentMenuItem: menu,
      gray: false
    })
  }

  restore = () => {
    this.setState({
      currentMenuItem: null,
      gray: true
    })
  }

  render(){
    let a = this.state.currentMenuItem? ' active' : '', b = this.state.gray? ' gray-100': ' gray-50'
    return <div className='main-page occupy'>
      <Notificator />
      {<div className={'filter-bg'}>
        <img src='resources/bg.jpg'/>
        <div className='filter occupy'/>
      </div>}
      <img className={'avatar' + b} src='resources/avatar-right.jpg'/>

      {<div className={'main-page-grid' + b}>
        <ContentSwitcher currentKey = {this.state.currentMenuItem}>
          {[
            ...Object.keys(GridData).map(k=>{
              return <GridContainer key={k} gridData={GridData[k]} contentKey={k}/>
              }),
            <NameCard key={'Card'} contentKey={'Card'}/>
          ]}
        </ContentSwitcher>
      </div>}

      <div className={'mid top-slogan' + a + b}>
        {'a Developer\'s'}
        <i className={'restore-icon fa fa-refresh' + a} onClick={this.restore}/>
      </div>
      <div className={'mid headers' + a}>
          <Menu onChange={(m)=>{this.setMenu(m)}}/>
      </div>
      <div className={'mid contact-bar-container' + a}>
          <ContactBar />
      </div>

      {/*



        <div className='central'>   ビジョン l\'Efficacité 质量
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>*/}
    </div>
  }
}
