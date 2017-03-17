import React from 'react'
import './main-page.css'
import { PointerNavigator } from 'app/components/pointer-navigator'
import { Mascot } from 'app/components/mascot'

export const MainPage = React.createClass({

  onSelectSection(i){
    console.log('Selected', i)
  },

  render(){
    return (<div className='fill'>
      <PointerNavigator items={['Gallery', 'Main Page', 'Story Line', 'Certs and all', 'Contact Me', 'Gallery', 'Main Page', 'Story Line', 'Certs and all', 'Contact Me']}
                        onSelect={this.onSelectSection}/>
      <Mascot />
    </div>)
  }
})
