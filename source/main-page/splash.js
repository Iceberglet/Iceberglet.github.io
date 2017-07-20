import React from 'react'

export default class Splash extends React.Component {
  static propTypes = {
    onEnable: React.PropTypes.func,  //use to enable everything
    enabled: React.PropTypes.bool
  }

  render(){
    return <div className={'splash ' + (this.props.enabled && 'active')} onClick={this.props.onEnable}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg'/>
      </div>
      <div className='splash-panel splash-left'></div>
      <div className='splash-panel splash-right'></div>
    </div>
  }
}
