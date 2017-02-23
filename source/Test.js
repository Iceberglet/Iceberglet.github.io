import React from 'react'
import { RotatingIcon } from 'rotatingIcon'
import { Buzz } from 'buzz'

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
      <div style={{width: '100%', height: '100%', background: 'black'}}>
        <div style={style}>
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
        </div>
      </div>
    )
  }
})
