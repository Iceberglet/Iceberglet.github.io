import React from 'react'
import './index.scss'

export default class SquareButton extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,      //Use Transform to set size
    iconClass: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  }

  render(){
    return <div className='square-button' onClick={this.props.onClick}>
      <i className={'square-icon ' + this.props.iconClass} />
    </div>
  }
}
