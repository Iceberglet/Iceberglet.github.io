import React from 'react'
import ReactDOM from 'react-dom'
import GridAnimation from 'grid-animation'
import ChainTransitions from 'chain-transitions'
import PropTypes from 'prop-types'

export default class Splash extends React.Component {
  static propTypes = {
  }

  state = {
    show: true
  }

  onTriggerShow = () =>{
    this.setState({show: !this.state.show})
  }

  render(){
    return <div className={'splash'} onClick={this.onTriggerShow}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg'/>
      </div>
      {/*<svg className='right bg-right' viewBox='0 0 100 100' preserveAspectRatio='none'>
        <path d='M 0 0 c 10 26, 19 65, 20 100 H 100 V 0 Z'/>
        <path d='M 8 0 c 5 26, 18 75, 2 100 H 100 V 0 Z'/>
        <path d='M 16 0 c 2 20, 10 95, -14 100 H 100 V 0 Z'/>
      </svg>*/}
      <div className={'splash-content-right'}>
        {/* Contents Go Here */}
        <ChainTransitions transitionProps={{in:this.state.show, mountOnEnter:true, unmountOnExit:true, appear:true}}
                          className={'test-grid-container'}>
          <GridAnimation className='test-grid' key='1'>
            <div>{'Hello World!'}</div>
          </GridAnimation>
          <GridAnimation className='test-grid' key='2'>
            <div>{'Hello Again!'}</div>
          </GridAnimation>
        </ChainTransitions>
      </div>
    </div>
  }
}
