import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import Constants from './constants'
import {randomHSL} from 'utils'

export default class GridItem extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    show: PropTypes.bool, //Used to animate entry & exit of this grid item
    isSelected: PropTypes.bool,
    thumb: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    backgroundHue: PropTypes.number,
    onClick: PropTypes.func
  }

  state = {
    background: randomHSL(this.props.backgroundHue || 0).toString()
  }

  render(){
    let {style, isSelected, thumb, content, show, backgroundHue} = this.props
    style.background = this.state.background
    return <CSSTransition in={show} classNames='grid-item' timeout={Constants.GRID_ITEM_FLIP_TIME}
                          mountOnEnter unmountOnExit appear>
      <div className='grid-item' style={style} onClick={this.props.onClick}>
        <CSSTransition in={!isSelected} timeout={Constants.GRID_ITEM_SELECT_TIME} classNames='grid-item-transit'
                        mountOnEnter unmountOnExit appear>
          <div className='grid-item-thumb'>{thumb}</div>
        </CSSTransition>
        <CSSTransition in={isSelected} timeout={Constants.GRID_ITEM_SELECT_TIME} classNames='grid-item-transit'
                        mountOnEnter unmountOnExit appear>
          <div className='grid-item-content'>{content}</div>
        </CSSTransition>
      </div>
    </CSSTransition>
  }
}
