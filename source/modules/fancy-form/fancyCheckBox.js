import React from 'react'

//NOTE: This class is at base level, to be used by FancyCheckBoxes to implement logic handling
export const FancyCheckBox = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    isEnabled: React.PropTypes.bool,
    isChecked: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  },

  getDefaultProps(){
    return {
      isEnabled: true,
      isChecked: false
    }
  },

  onClick(){
    if(!this.props.isEnabled){
      return
    }
    if(this.props.onClick){
      this.props.onClick()
    } else {
      throw new Error('onClick Function not defined for Checkbox:', this.props.label)
    }
  },

  render(){
    let className = '';
    if(this.props.isChecked) className += ' checked'
    if(this.props.isEnabled) className += ' enabled'
    return <div className={'fancy fancy-checkbox' + className} onClick={this.onClick}>
      <div className='fancy-checkbox-container'>
        <svg width='100%' height='100%' viewBox='0 0 100 100'>
          <circle className={'fancy-checkbox-ring'} cx='50' cy='50' r='26' strokeWidth='1'/>
          <circle className={'fancy-checkbox-circle'} cx='50' cy='50' r='16' strokeWidth='1'/>
          <circle className={'fancy-checkbox-circle2'} cx='50' cy='50' r='26' strokeWidth='1'/>
        </svg>
      </div>
      <div className='fancy-checkbox-label no-select'>{this.props.label}</div>
    </div>
  }
})
