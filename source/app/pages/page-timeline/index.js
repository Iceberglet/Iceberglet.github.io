import React from 'react'
import ReactDOM from 'react-dom'
import { scrollElement } from 'util'
import { Event, EventTypes, Day } from './timeline/beans'
import Chronicler from './chronicler'

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
      new Event('Hi', EventTypes.Educational, new Day(2014,3,1))
    ]
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
      <Chronicler onSelectEvent={this.onChooseEvent} events={this.props.events}/>
      <div className='page-content' style={{marginLeft: '150px'}}>
        {'Hello I am another page '}
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
