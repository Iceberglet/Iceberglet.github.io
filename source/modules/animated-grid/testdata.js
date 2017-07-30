import React from 'react'

export const TestGrids = {
  Education: {
    colorHue: 120,
    grids: [...Array(16).keys()].map(idx=>{
      return {
        idx,
        thumb: <div>{`Education ${idx}`}</div>,
        content: <div>{`Education Content ${idx}`}</div>
      }
    })
  },

  Work: {
    colorHue: 170,
    grids: [...Array(12).keys()].map(idx=>{
      return {
        idx,
        thumb: <div>{`Work ${idx}`}</div>,
        content: <div>{`Work Content ${idx}`}</div>
      }
    })
  },

  Expertise: {
    colorHue: 220,
    grids: [...Array(15).keys()].map(idx=>{
      let colorHue = (idx % 4) * 75
      return {
        idx, colorHue,
        thumb: <div>{`Expertise ${idx}`}</div>,
        content: <div>{`Expertise Content ${idx}`}</div>
      }
    })
  },
}
