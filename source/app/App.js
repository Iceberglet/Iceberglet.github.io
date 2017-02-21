import React from 'react'
import { Splash } from './components/splash/Splash.js'

export const App = React.createClass({

  onFinishFirstLoad(){
    console.log('First Time Visit Splash Done!')
  },

  render(){
    return (<Splash onFinishLoad={this.onFinishFirstLoad}/>)
  }
})
