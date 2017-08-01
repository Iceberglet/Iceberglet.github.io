import React from 'react'

export const Education = {
  colorHue: 120,
  gridProps: {itemsInRow: 3},
  grids: [
    {
      idx: 0,
      itemStyle: {background: 'white'},
      thumb: <img className='school-emblem' src='resources/icon-school/changsha_yizhong.jpg'></img>,
      content: <div>{'Changsha Yi Zhong'}</div>
    },
    {
      idx: 1,
      itemStyle: {background: '#e84343'},
      thumb: <img className='school-emblem' src='resources/icon-school/Maris_Stella_High_School_Crest.png'></img>,
      content: <div>{'Maris Stella High School'}</div>
    },
    {
      idx: 2,
      itemStyle: {background: '#4ebf14'},
      thumb: <img className='school-emblem' src='resources/icon-school/Raffles Institution.png'></img>,
      content: <div>{'Raffles Institution'}</div>
    },
    {
      idx: 3,
      itemStyle: {background: '#ef7b00'},
      thumb: <img className='school-emblem' src='resources/icon-school/nus.jpg'></img>,
      content: <div>{'NUS'}</div>
    },
    {
      idx: 4,
      itemStyle: {background: '#9c51ff'},
      thumb: <img className='school-emblem' src='resources/icon-school/Mines_ParisTech_logo.svg.png'></img>,
      content: <div>{'Mines Paristech~'}</div>
    },
    {
      idx: 5,
      itemStyle: {background: '#ffee9c'},
      thumb: <img className='school-emblem' src='resources/icon-school/Technical University of Munich.png'/>,
      content: <div>{'Technical University of Munich'}</div>
    },
    {
      idx: 6,
      itemStyle: {background: '#83ff83'},
      thumb: <img className='school-emblem' src='resources/icon-school/University of Chemistry and Technology Prague.png'></img>,
      content: <div>{'University of Chemistry and Technology Prague~'}</div>
    }
  ]
}
