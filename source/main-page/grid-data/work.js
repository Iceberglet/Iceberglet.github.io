import React from 'react'

export const Work = {
  colorHue: 220,
  grids: [...Array(15).keys()].map(idx=>{
    let colorHue = (idx % 4) * 75
    return {
      idx, colorHue,
      thumb: <div>{`Work ${idx}`}</div>,
      content: <div>{`Work Content ${idx}`}</div>
    }
  })
}
