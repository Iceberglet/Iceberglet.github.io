import React from 'react'
import { RotatingIcon } from 'rotatingIcon'

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
      <div style={{width: '500px', height: '500px'}}>
        <div style={style}>
          <RotatingIcon />
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={120} color='red'/>
        </div>
        <div style={style}>
          <RotatingIcon sizeInPx={90} color='orange'/>
        </div>
      </div>
    )
  }
})
