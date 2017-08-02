import React from 'react'
import {isMobile} from 'utils'

const Message = 'KEEPCALMLIVELONG'

export const Welcome = {
  colorHue: 120,
  gridProps: {itemsInRow: 4, onClick: 'shuffle'},
  grids: Message.split('').map((letter, idx)=>{
    return {
      idx,
      colorHue: Math.random()*360,
      itemStyle: {color: 'white', fontSize: isMobile() ? '70px' : '100px'},
      thumb: <div>{letter}</div>,
      content: <div>{'What do you expect to see here??'}</div>
    }
  })
}
