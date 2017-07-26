import React from 'react'
import PropTypes from 'prop-types'
import {shuffle} from 'utils'

export default class ChainTransition extends React.Component {
  static propTypes = {
    inSequence: PropTypes.oneOf(['forward', 'backward', 'random']),
    outSequence: PropTypes.oneOf(['forward', 'backward', 'random']),

    className: PropTypes.string,
    style: PropTypes.object,

    children: PropTypes.node.isRequired,  //Should be a list of Transition Objects
    transitionProps: PropTypes.object.isRequired,
    transitionInterval: PropTypes.number  //interval in milliseconds
  }

  static defaultProps = {
    transitionInterval: 100,
    inSequence: 'forward',
    outSequence: 'backward'
  }

  state = {
    inTransition: false,
    transitionArray: [],
    newTransitionProps: {}
  }

  componentWillMount=()=>{
    this.processProps(this.props)
  }

  componentWillUnmount=()=>{
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps=(props)=>{
    this.processProps(props)
  }

  processProps=(props)=>{
    if(this.state.inTransition){
      clearTimeout(this.timeout)
    }
    //process transition sequence
    let sequence = [...Array(this.props.children.length).keys()],
        order = props.transitionProps.in? this.props.inSequence : this.props.outSequence
    switch(order){
      case 'forward': break;
      case 'backward': sequence = sequence.reverse(); break;
      case 'random': sequence = shuffle(sequence); break;
    }

    this.setState({
      oldTransitionProps: this.state.newTransitionProps,
      newTransitionProps: props.transitionProps,
      inTransition: true,
      transitionArray: sequence
    }, this.kickStartChain)
  }

  kickStartChain=()=>{
    this.setState(s=>{
      s.transitionArray.shift()
      return s
    }, ()=>{
      if(this.state.transitionArray.length > 0){
        this.timeout = setTimeout(this.kickStartChain, this.props.transitionInterval)
      } else {
        //signal state transition done
        this.setState({inTransition: false})
      }
    })
  }

  render(){
    let {className, style} = this.props
    return <div className={className} style={style}>
      {this.props.children.map((c, i)=>{
        let props = this.state.transitionArray.indexOf(i) > -1? this.state.oldTransitionProps : this.state.newTransitionProps;
        return React.cloneElement(c, props)
      })}
    </div>
  }
}
