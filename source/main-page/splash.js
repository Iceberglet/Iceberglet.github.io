import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export default class Splash extends React.Component {
  static propTypes = {
    onClickAvatar: PropTypes.func
  }

  render(){
    return <div className={'splash'}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg' onClick={this.props.onClickAvatar}/>
      </div>
    </div>
  }
}
