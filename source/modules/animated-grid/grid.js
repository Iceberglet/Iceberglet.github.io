import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import './grid.scss'
import Constants from './constants'

const deepContains = (arr, item)=>{
  return arr.filter(subarr=>subarr.indexOf(item) > -1).length > 0
}

export default class Grid extends React.Component {
  static propTypes = {
    itemsInRow: PropTypes.number,
    status: PropTypes.string,
    margin: PropTypes.number,
    expandIdx: PropTypes.number,
    children: PropTypes.node.isRequired  //a list of GridItem elements
  }

  static defaultProps = {
    itemsInRow: 4,
    margin: 5,
    expandedHeight: 500
  }

  state = {
    expandIdx: -1,
    calculatedPos: [],
    size: 0,
    shownIndices: []
  }

  // componentDidMount=()=>{
  //   this.setState(this.processAnimation(this.props.status))
  // }

  componentWillReceiveProps=(props)=>{
    this.processAnimation(props.status)
    this.setState(this.recalculatePos(this.state.size, props.expandIdx))
  }

  componentWillUnmount(){
    clearTimeout(this.timeout)
  }

  processAnimation=(status)=>{
    if(status !== 'entering' && status !== 'exiting')
      return {};
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    let sequence = this.getAnimationSequence();
    let interval = Constants.GRID_ITEM_FLIP_TIME / sequence.length
    let isEnter = status === 'entering'
    //keep adding new indices:
    if(isEnter){
      this.setState({shownIndices: [], status}, ()=>this.animate(sequence, interval, isEnter))
    }
    //kick start hiddenIndices removal
    else {
      this.setState({shownIndices: sequence, status}, ()=>this.animate(sequence, interval, isEnter))
    }
  }

  animate = (sequence, interval, isEnter)=>{
    if(this.state.status === 'entering' && !isEnter){
      return;
    }
    if(this.state.status === 'exiting' && isEnter){
      return;
    }
    this.timeout = setTimeout(()=>{
      if(isEnter){
        if(sequence.length === 0){
          this.setState({status: null})
          return;
        }
        this.setState(s=>{
          s.shownIndices.push(sequence.shift())
          return s;
        }, ()=>{
          this.animate(sequence, interval, isEnter)
        })
      } else {
        if(this.state.shownIndices.length === 0){
          this.setState({status: null})
          return;
        }
        this.setState(s=>{
          s.shownIndices.pop()
          return s;
        }, ()=>{
          this.animate(sequence, interval, isEnter)
        })
      }
    }, interval)

  }

  getAnimationSequence=()=>{
    let num = this.props.children.length, rowSize = this.props.itemsInRow;
    let sequence = [];
    [...Array(num).keys()].forEach(i=>{
      let seq = Math.floor(i / rowSize) + i % rowSize
      if(sequence[seq]){
        sequence[seq].push(i)
      } else {
        sequence[seq] = [i]
      }
    })
    return sequence;
  }

  onContainerResize=(contentRect)=>{
    let {width, height} = contentRect.bounds
    if(width === this.state.width){
      return {};
    }
    let {margin, itemsInRow} = this.props
    //recalculate all the left, top, width, height
    let size = (width - margin) / itemsInRow - margin;
    this.setState({...this.recalculatePos(size, this.props.expandIdx), width})
  }

  //Returns the updated state
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
    //calculate container height:
    let height = Math.ceil(this.props.children.length / itemsInRow) * (margin + size) - margin;
    return {size, calculatedPos, height}
  }

  renderGridItem=(item, idx)=>{
    if(!this.state.calculatedPos[idx]){
      return null;
    }
    let props = this.state.calculatedPos[idx]
    props.show = deepContains(this.state.shownIndices, idx)
    return React.cloneElement(item, props)
  }

  renderCurtain=()=>{
    if(this.props.expandIdx !== undefined){
      return <div className='grid-curtain'/>
    } else {
      return <div className='grid-curtain hidden'/>
    }
  }

  render(){
    let gridStyle = {}
    if(this.state.height){
      gridStyle.height = this.state.height + 'px'
    }
    return (<Measure bounds onResize={this.onContainerResize}>
      {({ measureRef }) =>
        <div className='grid' ref={measureRef} style={gridStyle}>
          {this.renderCurtain()}
          {this.props.children.map(this.renderGridItem)}
        </div>
      }
    </Measure>)
  }
}
