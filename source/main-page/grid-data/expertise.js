import React from 'react'

export const Expertise = {
  colorHue: 220,
  grids: [...Array(15).keys()].map(idx=>{
    let colorHue = (idx % 4) * 75
    return {
      idx, colorHue,
      thumb: <div>{`Expertise ${idx}`}</div>,
      content: <div>{`Expertise Content ${idx}`}</div>
    }
  })
}
