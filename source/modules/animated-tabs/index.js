import React from 'react'
import PropTypes from 'prop-types'
import ContentSwitcher from 'content-switcher'
import CSSTransition from 'react-transition-group/CSSTransition'

import './index.scss'

const ANIMATION_TIME = 500;
const TAB_TRANSITION_TIME = 300;
// Tab class:
// {icon: **** , content: ****}

class TabContent extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    contentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string
  }
  render(){
    return <CSSTransition in={this.props.status === 'enterting' || this.props.status ==='entered'} classNames='animated-tab' timeout={TAB_TRANSITION_TIME}
                          mountOnEnter unmountOnExit appear>
      <div className='occupy'>{this.props.content}</div>
    </CSSTransition>
  }
}

export default class AnimatedTabs extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string,

    tabs: PropTypes.array
  }

  state = {
    show: false,
    shownIcons: [],
    remaining: [],
    selectedTabIdx: -1
  }

  componentWillUnmount=()=>{
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps=(props)=>{
    status = props.status;
    if(status === 'entering'){
      this.setState({
        shownIcons: [],
        show: true,
        remaining: [...Array(this.props.tabs.length).keys()]
      }, this.processEnter)
    }
    if(status === 'exiting'){
      this.setState({
        show: false
      }, this.processExit)
    }
  }

  processEnter = ()=>{
    if(this.state.remaining.length === 0){
      return;
    }
    this.setState(s=>{
      s.shownIcons.push(s.remaining.shift())
      return s;
    }, ()=>{
      this.timeout = setTimeout(this.processEnter, ANIMATION_TIME / this.props.tabs.length)
    })
  }

  processExit = ()=>{
    if(this.state.shownIcons.length === 0){
      return;
    }
    this.setState(s=>{
      s.shownIcons.pop()
      return s;
    }, ()=>{
      this.timeout = setTimeout(this.processExit, ANIMATION_TIME / this.props.tabs.length)
    })
  }

  onSelectTab=(idx)=>{
    this.setState({selectedTabIdx: idx})
  }

  renderIcon = (iconUrl, idx)=>{
    let a = this.state.shownIcons.indexOf(idx) > -1? ' shown' : ''
    return <div key={idx} className={'tab-icon' + a} onClick={()=>this.onSelectTab(idx)}>
      <img src={iconUrl}/>
    </div>
  }

  renderDefaultContent=()=>{
    return <div className='occupy center'>{'If You See This, You Need to Select Something Above :)'}</div>
  }

  render(){
    return <div className='animated-tabs'>
      <div className='icon-rack'>
        {this.props.tabs.map((t, i)=>this.renderIcon(t.icon, i))}
      </div>
      <div className={'tab-content ' + (this.state.show || 'hidden')}>
        <ContentSwitcher currentKey = {this.state.selectedTabIdx} animationTime={TAB_TRANSITION_TIME}>
          {[
            <TabContent key={-1} content={this.renderDefaultContent()} contentKey={-1} />,
            ...this.props.tabs.map((t, i)=><TabContent content={t.content} contentKey={i} key={i}/>)
          ]}
        </ContentSwitcher>
      </div>
    </div>
  }
}
