import React from 'react'

export const Education = {
  colorHue: 120,
  gridProps: {itemsInRow: 3},
  grids: [...Array(16).keys()].map(idx=>{
    return {
      idx,
      itemStyle: {color: 'black', fontSize: 26},
      thumb: <div>{`ELULUL ${idx}`}</div>,
      content: <div>{`Education Content ${idx}`}</div>
    }
  })
}
