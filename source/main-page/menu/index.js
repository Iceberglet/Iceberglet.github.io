import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import './menu.scss'

// const MENU_WIDTH = 300
const BORDER = 3;


const MenuInfos = [
  {
    title: 'Card',
    iconClass: 'id-card'
  },
  {
    title: 'Expertise',
    iconClass: 'magic'
  },
  {
    title: 'Education',
    iconClass: 'graduation-cap'
  },
  {
    title: 'Work Exp',
    iconClass: 'suitcase'
  }
]

class MenuItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onResize: PropTypes.func,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
    chosen: PropTypes.bool
  }

  manualTrigger=()=>{
    if(this._manualTrigger){
      this._manualTrigger()
    }
  }

  render(){
    return <Measure onResize={this.props.onResize} offset>
      {({ measureRef, measure }) => {
        this._manualTrigger = measure
        return <div className={'menu-item ' + (this.props.chosen && 'active')} ref={measureRef}
                    onMouseEnter={this.props.onHover} onClick={this.props.onClick} onMouseLeave={this.props.onMouseLeave}>
          <div className='menu-title no-select'>{this.props.title}</div>
          <i className={`menu-icon fa fa-${this.props.iconClass} ${this.props.iconClass}`}/>
        </div>
        }
      }
    </Measure>
  }
}

export default class Menu extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    isActive: PropTypes.string,
    menuInfo: PropTypes.array
  }

  static defaultProps = {
    menuInfo: MenuInfos
  }

  state = {
    hovered: null,
    floater: [],
    active: null
  }

  onItemResize=(content, idx)=>{
    this.setState(s=>{
      s.floater[idx] = content.offset
      return s
    })
  }

  onItemHover=(idx)=>{
    this.setState({
      hovered: idx
    })
  }

  restore=()=>{
    this.state.active && this.setState({
      hovered: this.state.active
    })
  }

  onItemClick=(idx)=>{
    this.props.onChange(this.props.menuInfo[idx].title)
    this.setState({active: idx})
  }

  remeasure=()=>{
    if(this._items){
      this._items.forEach(i=>i.manualTrigger())
    }
  }

  computeFloaterStyle=()=>{
    let {hovered, floater} = this.state
    if(!isNaN(hovered) && floater[hovered]){
      //invisible style
      return {
        left: floater[hovered].left - BORDER + 'px',
        top: floater[hovered].top - BORDER + 'px',
        height: floater[hovered].height + 'px',
        width: floater[hovered].width + 'px',
        opacity: 1
      }
    } else {
      return {}
      // return {top: '0px', left: '0px', width: '100%', height: '100%'}
    }
  }

  render(){
    this._items = []
    return <Measure onResize={this.remeasure}>
        {({ measureRef }) => <div className='menu-container' ref={measureRef}>
          <div className='floater' style={this.computeFloaterStyle()}/>
          {this.props.menuInfo.map((menu, idx)=><MenuItem {...menu} key={menu.title} chosen={this.props.isActive && this.state.active===idx}
                              onResize={(bound)=>{this.onItemResize(bound, idx)}}
                              onHover={()=>this.onItemHover(idx)} onClick={()=>this.onItemClick(idx)}
                              onMouseLeave={this.restore}
                              ref={(item)=>{item && (this._items[idx] = item)}}/>)}
          </div>
        }
    </Measure>
  }
}
