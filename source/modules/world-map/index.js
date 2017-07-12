import React from 'react'
import WorldMap from './world-map'

const selectedColor = 'green'

export default class WorldMapWrapper extends React.Component {

  static defaultProps = {
  }

  state = {
    selected: {},
    renderOption: {}
  }

  onHoverCountry=(id)=>{
    //Process e.g. country info dialogue
  }

  onLeaveCountry=(id)=>{

  }

  onClickCountry=(id)=>{
    // console.log('Clicked', id)
    this.setState(s=>{
      if(s.selected[id]){
        delete s.selected[id]
        delete s.renderOption[id]
      } else {
        s.selected[id] = true
        s.renderOption[id] = selectedColor
      }
      return s
    })
  }

  render(){
    return <div className='occupy vflex'>
      <div className='pos-rela flex1'>
        <WorldMap onHoverCountry={this.onHoverCountry}
                  onLeaveCountry={this.onLeaveCountry}
                  onClickCountry={this.onClickCountry}
                  renderOption={this.state.renderOption}/>
      </div>
    </div>
  }
}
