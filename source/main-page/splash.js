import React from 'react'
import ReactDOM from 'react-dom'

export default class Splash extends React.Component {
  static propTypes = {
    onEnable: React.PropTypes.func,  //use to enable everything
    enabled: React.PropTypes.bool
  }

  // componentWillReceiveProps=(props)=>{
  //   if(props.enabled){
  //     this.expandable.forEach(el=>{
  //       let ele = ReactDOM.findDOMNode(el)
  //       console.log(ele, ele.style, ele.style.width)
  //       ele.style.width = '82%'
  //     })
  //   }
  // }

  render(){
    this.expandable = []
    return <div className={'splash ' + (this.props.enabled && 'active')} onClick={this.props.onEnable}>
      <div className='occupy'>
        <img className='avatar' src='resources/avatar-right.jpg'/>
      </div>
      {/* Somehow by adding the element below it reduces the jaggedness. why? */}
      <div className='right bg-right belowbelow' ref={(el)=>{this.expandable.push(el)}}></div>
      <div className='right bg-right below' ref={(el)=>{this.expandable.push(el)}}></div>
      <div className='right bg-right' ref={(el)=>{this.expandable.push(el)}}>
        {/* Contents Go Here */}
      </div>
      <div className='right' ref={(el)=>{this.expandable.push(el)}}>
        <i className='splash-icon fa fa-arrow-down' />
      </div>
    </div>
  }
}
