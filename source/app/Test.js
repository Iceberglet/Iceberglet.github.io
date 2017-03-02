import React from 'react'
import { RotatingIcon } from 'rotatingIcon'
import { Buzz } from 'buzz'
import { AnimatedTag } from 'animated-tag'
import { Console } from 'app/pages/console'
import { PointerNavigator } from 'app/components/pointer-navigator'

const style = {
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

export const Test = React.createClass({
  render(){
    return (
      <div style={{width: '100%', height: '100%', background: 'white'}}>
        <PointerNavigator items={['Gallery', 'Main Page', 'Story Line', 'Certs and all', 'Contact Me']}/>
        {/*<Console />*/}
        {/*<div style={style}>
          <RotatingIcon sizeInPx={600}/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={570} color='red'/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={540} color='orange'/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={510} color='gray'/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={480} color='cyan'/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={450} color='yellow'/>
        </div>
        <div style={style}>
          <Buzz word={'Loading...'} style={{background: 'black'}}/>
        </div>*/}
        {/*
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <AnimatedTag content='About Me'/>
          <AnimatedTag content='Contact'/>
          <AnimatedTag content='Get to know me some more'/>
        </div>*/
        }

      </div>
    )
  }
})
