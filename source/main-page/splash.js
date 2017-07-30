import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {GridContainer} from 'animated-grid'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

import GridAnimation from 'grid-animation'
import ChainTransitions from 'chain-transitions'
import Hexagram from 'hexagram'

var i = 0

export default class Splash extends React.Component {
  static propTypes = {
  }

  state = {
    show: true
  }

  onTriggerShow = () =>{
    this.setState({currentGridKey: ['Education', 'Work', 'Expertise'][(i++)%3] })
  }

  onClickGridItem = (idx)=>{
    this.setState({selected: idx})
  }

  render(){
    return <div className={'splash'}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg' onClick={this.onTriggerShow}/>
      </div>
      {/*<svg className='right bg-right' viewBox='0 0 100 100' preserveAspectRatio='none'>
        <path d='M 0 0 c 10 26, 19 65, 20 100 H 100 V 0 Z'/>
        <path d='M 8 0 c 5 26, 18 75, 2 100 H 100 V 0 Z'/>
        <path d='M 16 0 c 2 20, 10 95, -14 100 H 100 V 0 Z'/>
      </svg>*/}
      <div className={'splash-content-right'}>
          <GridContainer currentGridKey={this.state.currentGridKey}/>
        {/*<ChainTransitions transitionProps={{in:this.state.show, mountOnEnter:true, unmountOnExit:true, appear:true}}
                          className={'test-grid-container'}>
          {[...Array(8).keys()].map(idx=>{
            return <GridAnimation className='test-grid' key={idx}>
              <div>{'Hello World! ' + idx}</div>
            </GridAnimation>
          })}
        </ChainTransitions>*/}
        {/*<Hexagram />*/}
      </div>
    </div>
  }
}
