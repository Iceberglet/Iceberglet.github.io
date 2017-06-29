import React from 'react'
import { FancyCheckBox } from './fancyCheckBox'

const ensureOneIsTrue = (obj, key)=>{
  if(Object.values(obj).filter(item=>item===true).length === 0) {
    return {[key] : true}
  }
  return obj
}

//NOTE: This class is at base level, to be used by FancyCheckBoxes to implement logic handling
export const FancyCheckBoxes = React.createClass({
  propTypes: {
    valueKey: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,        //An optional label
    checkedStatus: React.PropTypes.object,    //{key1: true/false, key2: true/false, ...}
    values: React.PropTypes.array.isRequired, //[{key: , value: }, {key: , value: }]
    isMultiple: React.PropTypes.bool,     //Allow checking multiple boxes?
    isEnabled: React.PropTypes.bool,      //Enabled checkboxes?
    forceSelection: React.PropTypes.bool, //Force at least one box to be checked
    onCheck: React.PropTypes.func,        //Callback. If defined, default behaviours are overridden
    onConfirmChange: React.PropTypes.func //Callback. See readme for more info
  },

  getDefaultProps(){
    return {
      checkedStatus: {},
      isMultiple: false,
      forceSelection: false
    }
  },

  getInitialState(){
    let s = JSON.parse(JSON.stringify(this.props.checkedStatus))
    if(this.props.forceSelection){
      s = ensureOneIsTrue(s, this.props.values[0].key)
    }
    return {
      checkedStatus: s
    }
  },

  onConfirmChange(){
    this.props.onConfirmChange && this.props.onConfirmChange(this.props.valueKey, this.state.checkedStatus)
  },

  onClick(key){
    if(this.props.onCheck){
      this.props.onCheck(key)
    } else {
      if(this.props.isMultiple) {
        //toggle the state
        this.setState(s=>{
          s.checkedStatus[key] = !(s.checkedStatus[key])
          if(this.props.forceSelection){
            s.checkedStatus = ensureOneIsTrue(s.checkedStatus, key)
          }
          return s;
        }, this.onConfirmChange)
      } else {
        this.setState(s=>{
          s.checkedStatus = {[key]: !s.checkedStatus[key]}
          if(this.props.forceSelection){
            s.checkedStatus = ensureOneIsTrue(s.checkedStatus, key)
          }
          return s;
        }, this.onConfirmChange)
      }
    }
  },

  renderLabel(){
    return <div className='checkboxes-label'>{this.props.label}</div>
  },

  renderCheckBox({key, value}, idx){
    return <FancyCheckBox key={key} label={value} value={key} isEnabled={this.props.isEnabled}
                isChecked={this.state.checkedStatus[key]}
                onClick={()=>{this.onClick(key)}} />
  },

  render(){
    return <div className='fancy-checkboxes-sample'>
      {this.props.label && this.renderLabel()}
      {this.props.values.map(this.renderCheckBox)}
    </div>;
  }
})
