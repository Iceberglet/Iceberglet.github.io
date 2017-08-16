import React from 'react'
import PropTypes from 'prop-types'
import AnimatedTabs from 'animated-tabs'

import './index.scss'

const ANIMATION_TIME = 500;

const Tabs = [
  {
    icon: 'resources/icon-school/changsha_yizhong.jpg',
    content: <div>{'Changsha Yi Zhong'}</div>,
  },
  {
    icon: 'resources/icon-school/Maris_Stella_High_School_Crest.png',
    content: <div>{'Maris Stella High School'}</div>
  },
  {
    icon: 'resources/icon-school/Raffles Institution.png',
    content: <div>{'Raffles Institution'}</div>
  },
  {
    icon: 'resources/icon-school/nus.jpg',
    content: <div>{'NUS'}</div>
  },
  {
    icon: 'resources/icon-school/Mines_ParisTech_logo.svg.png',
    content: <div>{'Mines Paristech~'}</div>
  },
  {
    icon: 'resources/icon-school/Technical University of Munich.png',
    content: <div>{'Technical University of Munich'}</div>
  },
  {
    icon: 'resources/icon-school/University of Chemistry and Technology Prague.png',
    content: <div>{'University of Chemistry and Technology Prague~'}</div>
  }
]

export default class EducationPage extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  render(){
    return <AnimatedTabs {...this.props} tabs={Tabs}/>
  }
}
