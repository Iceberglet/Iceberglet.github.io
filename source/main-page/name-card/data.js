import React from 'react'
import {copyToClipboard} from 'utils'

export const NameCardData = [
  //personal info
    {
      title: 'This developer has a name',
      content: ['Chen Min']
    },
    {
      title: 'This developer has nationality',
      content: ['Chinese']
    },
    {
      title: 'This developer is currently based at',
      content: ['Singapore']
    },
    {
      title: 'This developer writes',
      content: ['Java, JavaScript, C, C#, C++, Python, PHP, SQL, HTML5, CSS3',
                'SpringFramework, Camel, Hibernate, ReactJS, NodeJS, SCSS, MathNet, TensorFlow']
    },
    {
      title: 'This developer is good at',
      content: ['Structural Design & Architecture, Workflow Design, Performance Optimization, Project Management']
    },
    {
      title: 'This developer speaks',
      content: ['Mandarin, English, French, (a bit) Japanese']
    },
    {
      title: 'This developer likes',
      content: ['Cook, Read, Ski, Video Games, 9GaG']
    },
    {
      title: 'This developer\'s Email',
      content: [<div onClick={()=>copyToClipboard('dragoon.cm@hotmail.com')}>{'dragoon.cm@hotmail.com (Click to Copy)'}</div>]
    },
    {
      title: 'This developer\'s CV',
      content: [<i className='fa fa-file-pdf-o' style={{color: 'red', fontSize: '22px', marginLeft: '5px'}} onClick={()=>window.open('./resources/Chen Min CV.pdf')}/>]
    },
  //professional aspirations
    {
      title: 'This developer loves to hear',
      content: [
        'I hear there is this awesome framework, let\'s try it out!',
        'There is this challenging project, maybe you can do it?',
        'Here are the specs, it is very clear what you should do, and how performant your product should be',
        'There might be an additional requirement, can we discuss whether it can be added in?'
      ]
    },
    {
      title: 'A develoer hates to hear',
      content: [
        'Please don\'t use this framework as we never used it before',
        'We don\'t need that good a product, just make something that works?',
        'Hmmm, I have no idea what I want, but it is not what you are doing',
        'I need this additional functionality. Yes I need it done by tomorrow'
      ]
    }
]
