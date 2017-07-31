import React from 'react'

const Message = 'KEEPCALMLIVELONG'

export const Welcome = {
  colorHue: 120,
  gridProps: {itemsInRow: 4, noExpand: true},
  grids: Message.split('').map((letter, idx)=>{
    return {
      idx,
      colorHue: Math.random()*360,
      itemStyle: {color: 'white', fontSize: '100px'},
      thumb: <div>{letter}</div>,
      content: <div>{'What do you expect to see here??'}</div>
    }
  })
}
