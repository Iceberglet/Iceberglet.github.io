import React from 'react'
import Splash from './splash'

import './main-page.scss'

export default class MainPage extends React.Component {

  render(){
    return <div className='main-page occupy'>
      <Splash/>
    </div>
  }
}
