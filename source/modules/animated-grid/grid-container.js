import React from 'react'
import Grid from './grid'
import GridItem from './grid-item'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import {shuffle} from 'utils'

import Constants from './constants'
import {TestGrids} from './testdata'

export default class GridContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    currentGridKey: React.PropTypes.string
  }

  static defaultProps = {
    data: TestGrids,
    currentGridKey: 'Education'
  }

  state = {
    defactoGridKey: this.props.currentGridKey,
    expandIdx: undefined
  }

  componentWillReceiveProps=(props)=>{
    //If there is a change of key
    let {defactoGridKey} = this.state
    if(defactoGridKey !== undefined && defactoGridKey !== props.currentGridKey){
      clearTimeout(this.timeout)
      this.setState({
        defactoGridKey: undefined,
        expandIdx: undefined
      }, ()=>{
        this.timeout = setTimeout(()=>{
          this.setState({defactoGridKey: props.currentGridKey})
        }, Constants.GRID_SHOW_HIDE_TIME)
      })
    } else {
      this.setState({defactoGridKey: props.currentGridKey})
    }
  }

  onClickGridItem = (expandIdx) => {
    //an ugly hack...for my imperfectly designed UI
    if(this.state.defactoGridKey){
      if(!this.props.data[this.state.defactoGridKey].gridProps.onClick){
        this.setState({expandIdx})
      }
      // if(this.props.data[this.state.defactoGridKey].gridProps.onClick === 'shuffle'){
      // }
    }
  }

  renderGrid = (key, idx)=>{
    let gridData = this.props.data[key]
    return <Transition key={key} in={this.state.defactoGridKey === key} timeout={Constants.GRID_SHOW_HIDE_TIME} mountOnEnter unmountOnExit appear>
      {(status)=>{
        return <Grid expandIdx={this.state.expandIdx} status={status} {...gridData.gridProps}>
          {gridData.grids.map(g=>{
            return <GridItem key={g.idx} thumb={g.thumb}
                          content={g.content} itemStyle={g.itemStyle}
                          onClick={()=>this.onClickGridItem(g.idx)}
                          backgroundHue={g.colorHue || gridData.colorHue}/>
          })}
        </Grid>
      }}
    </Transition>
  }

  render(){
    return <div className='grid-container'>{Object.keys(this.props.data).map(this.renderGrid)}</div>
  }
}
