import React from 'react'
import ReactDOM from 'react-dom'

export const TabGhostHandle = React.createClass({
  propTypes: {
    tabDragState: React.PropTypes.object,
    // pathD: React.PropTypes.string,
    tabStyle: React.PropTypes.object,
    children: React.PropTypes.node
  },

  componentDidMount(){
    this.props.tabDragState.setGhost(this)
    this.ghostEl = ReactDOM.findDOMNode(this.refs.ghost)
  },

  updateLeft(left){
    // console.log('moving ghost:', left)
    this.ghostEl.style.left = left + 'px'
  },

  render(){
    return <div className='tab-ghost-handle' style={this.props.tabStyle} ref={'ghost'}>
        {this.props.children}
    </div>
  }
})
