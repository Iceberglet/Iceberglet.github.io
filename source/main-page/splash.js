import React from 'react'
import ReactDOM from 'react-dom'
import {Arrow} from 'arrow'

export default class Splash extends React.Component {
  static propTypes = {
    onEnable: React.PropTypes.func,  //use to enable everything
    enabled: React.PropTypes.bool
  }

  state = {
    position: 'top'
  }

  render(){
    return <div className={'splash ' + (this.props.enabled && 'active')} onClick={this.props.onEnable}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg'/>
      </div>
      {/* Somehow by adding the element below it reduces the jaggedness. why? */}
      <div className='right bg-right belowbelow'></div>
      <div className='right bg-right below'></div>
      <div className={'right bg-right '+ this.state.position}>
        {/* Contents Go Here */}
        <div className='splash-content'></div>
      </div>
      <div className={'right '+this.state.position}>
        {/*<i className='splash-icon fa fa-angle-down' />*/}
        <Arrow fontSize={'30px'} className={'splash-icon'} rotation={180}/>
      </div>
    </div>
  }
}
