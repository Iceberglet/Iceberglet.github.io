import React from 'react'
import { camelToDash } from 'utils'

const getStyleSheet = () => {
  let res = document.styleSheets[0]
  if(!res){
    throw new Error('No StyleSheet Found!')
  }
  return res
}
export const KeyFrame = React.createClass({
  propTypes: {
    animationName: React.PropTypes.string,
    animationDetails: React.PropTypes.object
//  Example
//  {
//    framePercentage: { camelName: value }
//  }
  },

  getStatesFromProps(props){
    let ruleStrs = []
    let str = `${props.animationName}{`
    Object.keys(props.animationDetails).forEach(percentage=>{
      let obj = camelToDash(JSON.stringify(props.animationDetails[percentage]).replace(/['"]+/g, ''))
      str += `${percentage} ${obj}`
    })
    str+='}'
    // let commonRule = props.animationName + camelToDash(JSON.stringify(props.animationDetails).replace(/['"]+/g, ''))
    ruleStrs.push('@keyframes ' + str)
    // ruleStrs.push('@-webkit-keyframes ' + commonRule)
    // ruleStrs.push('@-ms-keyframes ' + commonRule)
    // ruleStrs.push('@-moz-keyframes ' + commonRule)
    // ruleStrs.push('@-o-keyframes ' + commonRule)
    return {
      ruleStrs
    }
  },

  componentWillMount(){
    this.update(this.getStatesFromProps(this.props))
  },

  componentWillUpdate(newProps){
    this.remove(this.getStatesFromProps(this.props))
    this.update(this.getStatesFromProps(newProps))
  },

  componentWillUnMount(){
    this.remove(this.getStatesFromProps(this.props))
  },

  remove({ruleStrs}){
    let sheet = getStyleSheet()
    ruleStrs.forEach(ruleStr=>{
      let idx = sheet.cssRules.findIndex(ruleStr)
      if(idx > -1){
        sheet.deleteRule(idx)
      }
    })
  },

  update({ruleStrs}){
    let sheet = getStyleSheet()
    ruleStrs.forEach(ruleStr=>{
      sheet.insertRule(ruleStr, sheet.cssRules.length)
    })
  },

  render(){
    return null
  }
})
