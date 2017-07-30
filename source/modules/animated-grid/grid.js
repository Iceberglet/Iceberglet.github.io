import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import './grid.scss'
import Constants from './constants'

export default class Grid extends React.Component {
  static propTypes = {
    itemsInRow: PropTypes.number,
    margin: PropTypes.number,
    expandIdx: PropTypes.number,
    children: PropTypes.node.isRequired  //a list of GridItem elements
  }

  static defaultProps = {
    itemsInRow: 4,
    margin: 4,
    expandedHeight: 500
  }

  state = {
    expandIdx: -1,
    calculatedPos: [],
    size: 0
  }

  processEnter=()=>{

  }

  processExit=()=>{

  }

  componentWillReceiveProps=(props)=>{
    this.recalculatePos(this.state.size, props.expandIdx)
  }

  onContainerResize=(contentRect)=>{
    let {width, height} = contentRect.bounds
    let {margin, itemsInRow} = this.props
    //recalculate all the left, top, width, height
    let size = (width - margin) / itemsInRow - margin;
    this.recalculatePos(size, this.props.expandIdx)
  }

  recalculatePos=(size, expandIdx)=>{
    let {margin, itemsInRow} = this.props
    let calculatedPos = []
    for(let i = 0; i < this.props.children.length; i++){
      if(i === expandIdx){
        //a big, horizontal slab
        calculatedPos.push({
          style: {
            top: Constants.EXPANDED_MARGIN_PREC + '%',
            left: Constants.EXPANDED_MARGIN_PREC + '%',
            width: (100 - 2 * Constants.EXPANDED_MARGIN_PREC) + '%',
            height: (100 - 2 * Constants.EXPANDED_MARGIN_PREC) + '%',
            zIndex: 999
          },
          isSelected: true
        })
      } else {
        let row = Math.floor(i / itemsInRow), col = i % itemsInRow
        calculatedPos.push({
          style: {
            top: row * (size + margin) + 'px',
            left: margin + col * (size + margin) + 'px',
            width: size + 'px',
            height: size + 'px'
          },
          isSelected: false
        })
      }
    }
    this.setState({size, calculatedPos})
  }

  renderGridItem=(item, idx)=>{
    if(!this.state.calculatedPos[idx])
      return null;
    return React.cloneElement(item, this.state.calculatedPos[idx])
  }

  render(){
    return (<Measure bounds onResize={this.onContainerResize}>
      {({ measureRef }) =>
        <div className='grid' ref={measureRef} >
          {this.props.children.map(this.renderGridItem)}
        </div>
      }
    </Measure>)
  }
}
