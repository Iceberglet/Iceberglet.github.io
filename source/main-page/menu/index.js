import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import './menu.scss'

// const MENU_WIDTH = 300
const BORDER = 3;


const MenuInfos = [
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
    onClick: PropTypes.func
  }
  render(){
    return <Measure bounds onResize={this.props.onResize} offset>
      {({ measureRef }) =>
        <div className='menu-item' ref={measureRef} onMouseEnter={this.props.onHover} onClick={this.props.onClick}>
          <div className='menu-title no-select'>{this.props.title}</div>
          <i className={`menu-icon fa fa-${this.props.iconClass} ${this.props.iconClass}`}/>
        </div>
      }
    </Measure>
  }
}

export default class Menu extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    hovered: null,
    floater: []
  }

  onItemResize=(content, idx)=>{
    this.setState(s=>{
      s.floater[idx] = content.offset
      return s
    })
  }

  onItemHover=(idx)=>{
    this.setState({hovered: idx})
  }

  onItemClick=(m)=>{
    console.log(m)
    this.props.onChange(m)
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
    }
  }

  render(){
    return <div className='menu-container'>
      <div className='floater' style={this.computeFloaterStyle()}/>
      {MenuInfos.map((menu, idx)=>{
        return <MenuItem {...menu} key={menu.title} onResize={(bound)=>{this.onItemResize(bound, idx)}}
                          onHover={()=>this.onItemHover(idx)} onClick={()=>this.onItemClick(menu.title)}/>
      })}
    </div>
  }
}
