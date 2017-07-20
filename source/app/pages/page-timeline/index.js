import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'utils'
import { Event, EventTypes, Day } from './beans'
import Chronicler from './chronicler'
import WorldMap from 'world-map'
import Pin from './map/pin'

const style = {
  background: '#daedd8',//'#00005f',
  color: 'black',
  display: 'flex'
}

class PageTimeline extends React.Component {
  static defaultProps = {
    events: [
      new Event('Hi', EventTypes.Personal, new Day(2007,3,5)),
      new Event('Hi', EventTypes.Educational, new Day(2008,3,5)),
      new Event('Hi', EventTypes.Professional, new Day(2011,11,5)),
      new Event('Hi', EventTypes.Professional, new Day(2011,1,1)),
      new Event('Hi', EventTypes.Personal, new Day(2012,3,5)),
      new Event('Hi', EventTypes.Educational, new Day(2020,3,1))
    ],
    selectedEventTypes: [EventTypes.Professional, EventTypes.Educational]
  };

  constructor(props){
    super(props)
  }

  //chose event in chronicler
  onChooseEvent=(eventId)=>{
    console.log('Chose Event ID', eventId)
  }

  render(){
    return (<div className='page' style={style} ref={'pageDiv'}>
      <Chronicler onSelectEvent={this.onChooseEvent} selectedEventTypes={this.props.selectedEventTypes} events={this.props.events}/>
      <div className='page-content' style={{marginLeft: '150px'}}>
        <WorldMap renderOption={{}}>
          <Pin x={1372} y={335} key={'afghan'}/>
          <Pin x={1590} y={390} key={'changsha'}/>
          <Pin x={1641} y={414} key={'taipei'}/>
          <Pin x={978} y={242} key={'london'}/>
          <Pin x={990} y={266} key={'paris'}/>
          <Pin x={1718} y={350} key={'tokyo'}/>
          <Pin x={1562} y={563} key={'singapore'}/>
        </WorldMap>
      </div>
    </div>)
  }
}

export const Timeline = {
  title: 'Timeline',
  page: PageTimeline,
  style,
  hideArrow: true,
  cursorColor: {
    active: [0, 255, 200],
    inactive: [0, 255, 200],
    enlarged: [255, 0, 0]
  }
}
