import React from 'react'
import Menu from './menu'
import ContactBar from './contact-bar'
import Notificator from './notification-system'
import ContentSwitcher from 'content-switcher'
import NameCard from './name-card'
import EducationPage from './education-page'
import WorkExp from './work-exp'
import {GridContainer} from 'animated-grid'
import {GridData} from './grid-data'

import './main-page.scss'

const MAIN_MENU_SHIFT = 1000;
const ClassList = ['helvetica', 'monospace']

export default class MainPage extends React.Component {

  state = {
    currentMenuItem: null,
    gray: true,
    currentClass: 0
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

  rotateFontClass = ()=>{
    this.setState({
      currentClass: (this.state.currentClass + 1 ) % ClassList.length
    })
  }

  render(){
    let a = this.state.currentMenuItem? ' active' : '', b = this.state.gray? ' gray-100': ' gray-50'
    return <div className={'main-page occupy ' + ClassList[this.state.currentClass]}>
      <Notificator />
      {<div className={'filter-bg'}>
        <img src='resources/bg.jpg'/>
        <div className='filter occupy'/>
      </div>}
      <img className={'avatar' + b} src='resources/avatar-right.jpg'/>

      {<div className={'main-page-grid' + b}>
        <ContentSwitcher currentKey = {this.state.currentMenuItem}>
          {[
            <GridContainer key={'Expertise'} gridData={GridData['Expertise']} contentKey={'Expertise'}/>,
            <NameCard key={'Card'} contentKey={'Card'}/>,
            <WorkExp key={'Work Exp'} contentKey={'Work Exp'} />,
            <EducationPage key={'Education'} contentKey={'Education'} />
          ]}
        </ContentSwitcher>
      </div>}

      <div className={'mid top-slogan' + a + b}>
        {'a Developer\'s'}
        <i className={'restore-icon fa fa-refresh' + a} onClick={this.restore}/>
      </div>
      <div className={'mid headers' + a}>
          <Menu onChange={(m)=>{this.setMenu(m)}} isActive={this.state.currentMenuItem}/>
      </div>
      <div className={'mid contact-bar-container' + a}>
          <ContactBar />
      </div>
      <i className='fa fa-font shake-hor-hover'
          style={{position: 'fixed', cursor: 'pointer', fontSize: '20px', top: '10px', right: '10px', color: 'red'}}
          onClick={this.rotateFontClass}/>

      {/*



        <div className='central'>   ビジョン l\'Efficacité 质量
        <div className='main-page-grid'>
          <GridContainer data={GridData} currentGridKey={this.state.currentGridKey}/>
        </div>
      </div>*/}
    </div>
  }
}
