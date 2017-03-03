import React from 'react'
import { Splash } from './pages/splash/Splash.js'
import { MainPage } from './pages/mainPage'

export const App = React.createClass({

  onFinishFirstLoad(){
    console.log('First Time Visit Splash Done!')
  },

  render(){
    // return (<Splash onFinishLoad={this.onFinishFirstLoad}/>)
    return (<MainPage />)
  }
})
