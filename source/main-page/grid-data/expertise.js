import React from 'react'

const frontEnd = {colorHue: 60, itemStyle: {color: 'black', fontSize: '23px'}}
const database = {colorHue: 130, itemStyle: {color: 'black', fontSize: '23px'}}
const procedural = {colorHue: 200, itemStyle: {color: 'black', fontSize: '23px'}}
const frameworks = {colorHue: 270, itemStyle: {color: 'white', fontSize: '23px'}}
const others = {colorHue: 340, itemStyle: {color: 'white', fontSize: '23px'}}

export const Expertise = {
  colorHue: 170,
  gridProps: {itemsInRow: 5},
  grids: [{
    ...frontEnd,
    thumb: <div>{'ReactJS'}</div>,
    content: <div>{'ReactJS'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'ExtJS'}</div>,
    content: <div>{'ExtJS'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'jQuery'}</div>,
    content: <div>{'jQuery'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'HTML5'}</div>,
    content: <div>{'HTML5'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'CSS3'}</div>,
    content: <div>{'CSS3'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'NodeJS'}</div>,
    content: <div>{'NodeJS'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'Webpack'}</div>,
    content: <div>{'Webpack'}</div>
  },{
    ...frontEnd,
    thumb: <div>{'Babel&ES7'}</div>,
    content: <div>{'Babel&ES7'}</div>
  },{
    ...database,
    thumb: <div>{'MySQL'}</div>,
    content: <div>{'MySQL'}</div>
  },{
    ...database,
    thumb: <div>{'Hibernate'}</div>,
    content: <div>{'Hibernate'}</div>
  },{
    ...database,
    thumb: <div>{'JPA'}</div>,
    content: <div>{'JPA'}</div>
  },{
    ...database,
    thumb: <div>{'MongoDB'}</div>,
    content: <div>{'MongoDB'}</div>
  },{
    ...procedural,
    thumb: <div>{'C++'}</div>,
    content: <div>{'C++'}</div>
  },{
    ...procedural,
    thumb: <div>{'C#'}</div>,
    content: <div>{'C#'}</div>
  },{
    ...procedural,
    thumb: <div>{'Python'}</div>,
    content: <div>{'Python'}</div>
  },{
    ...procedural,
    thumb: <div>{'Java'}</div>,
    content: <div>{'Java'}</div>
  },{
    ...frameworks,
    thumb: <div>{'SpringFramework'}</div>,
    content: <div>{'SpringFramework'}</div>
  },{
    ...frameworks,
    thumb: <div>{'ApacheCamel'}</div>,
    content: <div>{'ApacheCamel'}</div>
  },{
    ...frameworks,
    thumb: <div>{'ActiveMQ'}</div>,
    content: <div>{'ActiveMQ'}</div>
  },{
    ...frameworks,
    thumb: <div>{'Hadoop'}</div>,
    content: <div>{'Hadoop'}</div>
  },{
    ...frameworks,
    thumb: <div>{'MathNet'}</div>,
    content: <div>{'MathNet'}</div>
  },{
    ...others,
    thumb: <div>{'Unity3D'}</div>,
    content: <div>{'Unity3D'}</div>
  },{
    ...others,
    thumb: <div>{'MonoGame'}</div>,
    content: <div>{'MonoGame'}</div>
  },{
    ...others,
    thumb: <div>{'Blender'}</div>,
    content: <div>{'Blender'}</div>
  }].shuffle().map((x, y)=>{x['idx']=y; return x;})
}
