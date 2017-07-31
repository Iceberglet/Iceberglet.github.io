import React from 'react'

export const Work = {
  colorHue: 170,
  grids: [...Array(12).keys()].map(idx=>{
    return {
      idx,
      thumb: <div>{`Work ${idx}`}</div>,
      content: <div>{`Work Content ${idx}`}</div>
    }
  })
}
