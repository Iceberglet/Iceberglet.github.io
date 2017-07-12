import React from 'react'
// import ReactResizeDetector from 'react-resize-detector'
import ReactDOM from 'react-dom'
import { Marking } from './marking'
import { getTransformStyle } from 'utils'
import './chronicler.css'

export default class Chronicler extends React.Component {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
    selectedEventTypes: React.PropTypes.array.isRequired,
    itemHeight: React.PropTypes.number,
    onSelect: React.PropTypes.func,
    onSelectEvent: React.PropTypes.func.isRequired,

    dummiesTop: React.PropTypes.number,
    dummiesBottom: React.PropTypes.number
  }

  static defaultProps = {
    dummiesTop: 4,
    dummiesBottom: 10,
    itemHeight: 40
  }

  constructor(props){
    super(props);
    //Compute years
    let sortedByYear = {}
    props.events.forEach((e)=>{
      let y = e.day.year
      if(sortedByYear[y]){
        sortedByYear[y].push(e)
      } else {
        sortedByYear[y] = [e]
      }
    })
    //Pad intermittent years
    let minY = Math.min(...Object.keys(sortedByYear)), maxY = Math.max(...Object.keys(sortedByYear))
    for(let yy = minY; yy < maxY; yy = yy + 1) {
      if(!sortedByYear[yy]){
        sortedByYear[yy] = []
      }
    }

    this.state = {
      curr: 0,
      offset: - props.dummiesTop * props.itemHeight,
      eventsMap: sortedByYear
    }
  }

  componentDidMount(){
    // this.onResize()
  }

  // onResize(){
  //   this.setState({
  //     containerHeight: ReactDOM.findDOMNode(this.containerNode).offsetHeight
  //   })
  // },

  scrollMultipler = 50
  scrollDelay = 100   //If action happens within 100ms, do not recompute place
  scrollTimeout = null

  onScroll = (e)=>{
    let scrollDirection = e.deltaY > 0? -1 : 1
    let offset = this.state.offset + this.scrollMultipler * scrollDirection
    this.setState({
      offset, scrollDirection
    }, ()=>{
      if(this.scrollTimeout){
        window.clearTimeout(this.scrollTimeout)
      }
      this.scrollTimeout = setTimeout(this.recomputeOffset, this.scrollDelay)
    })
    e.preventDefault()
  }

  //Called after scroll finish
  recomputeOffset=()=>{
    // i is the target item index
    let i = Math.round( - this.state.offset / this.props.itemHeight - this.props.dummiesTop)
    i = Math.max(0, i)
    i = Math.min(i, Object.keys(this.state.eventsMap).length - 1)
    this.scrollTimeout = null;
    this.setScrollToItem(i)
  }

  yearIsDisabled=(year)=>{
    let evts = this.state.eventsMap[year]
    return evts.length === 0 || evts.every(e=>this.props.selectedEventTypes.indexOf(e.type) < 0)
  }

  setScrollToItem=(i)=>{
    //prevent scroll to years with no events:
    let year = Object.keys(this.state.eventsMap).sort()[i]
    while(this.yearIsDisabled(year)){
      i -= this.state.scrollDirection
      year = Object.keys(this.state.eventsMap).sort()[i]
      if(!year){
        i += this.state.scrollDirection  //backtrace
        year = Object.keys(this.state.eventsMap).sort()[i]
        break;
      }
    }

    let offset = - ( i + this.props.dummiesTop) * this.props.itemHeight;
    this.setState({
      offset, curr: i
    }, ()=>{
      this.props.onSelect && this.props.onSelect(i)
    })
  }

  renderEventsInYear=(eventsThisYear)=>{
    return eventsThisYear.map(e=>{
      let eType =e.type, eday = e.day, className='event-pin'
      let perc = eday.getPercentageInYear()
      if(this.props.selectedEventTypes.indexOf(eType) < 0){
        className+=' disabled'
      }
      return <div key={e.id} className={className} onClick={()=>this.props.onSelectEvent(e.id)} style={{background: eType.pinColor, top: perc+'%'}}/>
    })
  }

  renderList=()=>{
    let res = Object.keys(this.state.eventsMap).sort().map((year,i)=>{
      let name = 'navigator-item', eventsThisYear = this.state.eventsMap[year], yearIsDisabled = this.yearIsDisabled(year);
      if(this.state.curr === i){
        name += ' navigator-current'
      }
      if(yearIsDisabled){
        name += ' no-events'
      }
      return (<div className={name} key={i} onClick={()=>{!yearIsDisabled && this.setScrollToItem(i)}}>
                <div className={'navigator-item-text no-select'}>{year}</div>
                {this.renderEventsInYear(eventsThisYear)}
                <Marking />
              </div>)
    })
    return res
  }

  renderDummies=(number, keyPrefix)=>{
    if(number==0)
      return null
    let list = []
    for(let i = 0; i<number; i++){
      list.push(<div className='navigator-item' key={keyPrefix+i}><Marking /></div>)
    }
    return list;
  }

  render=()=>{
    let length = Object.keys(this.state.eventsMap).length;
    // let top = length - 1 + this.props.paddingDummies
    // let btm = this.props.paddingDummies

    let top = this.props.dummiesTop, btm = this.props.dummiesBottom
    return (<div className='chronicler' ref={(c)=>{this.containerNode = c}} onWheel={this.onScroll} style={{paddingTop: this.props.itemHeight / 2 + 'px'}}>
        {/*<ReactResizeDetector handleHeight onResize={this.onResize} />*/}
        <div className='navigator-pointer' key='pointer'/>
        <div className='navigator-container' style={getTransformStyle('translate(0px, '+this.state.offset+'px)')}>
          {this.renderDummies(top, 'top')}
          {this.renderList()}
          {this.renderDummies(btm, 'btm')}
        </div>
        {/*<div className='gradient-mask' key='mask'/>*/}
      </div>)
  }
}
