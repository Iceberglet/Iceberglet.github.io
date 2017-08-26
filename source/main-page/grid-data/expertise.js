import React from 'react'
import {load} from 'image-loader'

// const frontEnd = {colorHue: 60, itemStyle: {color: 'black', fontSize: '23px'}}
// const database = {colorHue: 130, itemStyle: {color: 'black', fontSize: '23px'}}
// const procedural = {colorHue: 200, itemStyle: {color: 'black', fontSize: '23px'}}
// const frameworks = {colorHue: 270, itemStyle: {color: 'white', fontSize: '23px'}}
// const others = {colorHue: 340, itemStyle: {color: 'white', fontSize: '23px'}}

export const Expertise = {
  gridProps: {itemsInRow: 6},
  grids: [{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/ReactJS.png'></img>,
    content: <div>{'ReactJS'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/ExtJS.png'></img>,
    content: <div>{'ExtJS'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/jQuery.png'></img>,
    content: <div>{'jQuery'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/HTML5.png'></img>,
    content: <div>{'HTML5'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/CSS3.png'></img>,
    content: <div>{'CSS3'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/NodeJS.png'></img>,
    content: <div>{'NodeJS'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/Webpack.png'></img>,
    content: <div>{'Webpack'}</div>
  },{
    //...frontEnd,
    thumb: <img className='school-emblem' src='resources/icon-expertise/Babel.png'></img>,
    content: <div>{'Babel&ES6'}</div>
  },{
    //...database,
    thumb: <img className='school-emblem' src='resources/icon-expertise/MySQL.png'></img>,
    content: <div>{'MySQL'}</div>
  },{
    //...database,
    thumb: <img className='school-emblem' src='resources/icon-expertise/Hibernate.png'></img>,
    content: <div>{'Hibernate'}</div>
  },{
    //...database,
  //   thumb: <div>{'JPA'}</div>,
  //   content: <div>{'JPA'}</div>
  // },{
    //...database,
    thumb: <img className='school-emblem' src='resources/icon-expertise/mongoDB.png'></img>,
    content: <div>{'MongoDB'}</div>
  },{
    //...procedural,
    thumb: <img className='school-emblem' src='resources/icon-expertise/C++.png'></img>,
    content: <div>{'C++'}</div>
  },{
    //...procedural,
    thumb: <img className='school-emblem' src='resources/icon-expertise/CSharp.png'></img>,
    content: <div>{'C#'}</div>
  },{
    //...procedural,
    thumb: <img className='school-emblem' src='resources/icon-expertise/python.png'></img>,
    content: <div>{'Python'}</div>
  },{
    //...procedural,
    thumb: <img className='school-emblem' src='resources/icon-expertise/JavaEE.png'></img>,
    content: <div>{'JavaEE'}</div>
  },{
    //...frameworks,
    thumb: <img className='school-emblem' src='resources/icon-expertise/Spring.png'></img>,
    content: <div>{'SpringFramework'}</div>
  },{
    //...frameworks,
    thumb: <img className='school-emblem' src='resources/icon-expertise/ApacheCamel.png'></img>,
    content: <div>{'ApacheCamel'}</div>
  },{
    //...frameworks,
    thumb: <img className='school-emblem' src='resources/icon-expertise/ActiveMQ.png'></img>,
    content: <div>{'ActiveMQ'}</div>
  },{
    //...frameworks,
    thumb: <img className='school-emblem' src='resources/icon-expertise/hadoop.png'></img>,
    content: <div>{'Hadoop'}</div>
  },{
    //...frameworks,
    thumb: <img className='school-emblem' src='resources/icon-expertise/MathNet.png'></img>,
    content: <div>{'MathNet'}</div>
  },{
    //...others,
    thumb: <img className='school-emblem' src='resources/icon-expertise/Unity.png'></img>,
    content: <div>{'Unity3D'}</div>
  },{
    //...others,
    thumb: <img className='school-emblem' src='resources/icon-expertise/MonoGame.png'></img>,
    content: <div>{'MonoGame'}</div>
  },{
    //...others,
    thumb: <img className='school-emblem' src='resources/icon-expertise/blender.png'></img>,
    content: <div>{'Blender'}</div>
  }].shuffle().map((x, y)=>{x['idx']=y; return x;})
}

load(Expertise.grids.map(t=>t.thumb))
