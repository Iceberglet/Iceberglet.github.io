import React from 'react'
import Grid from './grid'
import GridItem from './grid-item'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import {shuffle} from 'utils'
import Messenger from 'messenger'

import Constants from './constants'
import {TestGrids} from './testdata'

export default class GridContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    currentGridKey: React.PropTypes.string
  }

  static defaultProps = {
    data: TestGrids,
    currentGridKey: null
  }

  state = {
    actualKey: this.props.currentGridKey,
    expandIdx: undefined
  }

  componentDidMount=()=>{
    this.unsubs = [Messenger.on('grid-detail-off', ()=>{
      this.setState({expandIdx: undefined})
    })]
  }

  componentWillUnmount(){
    this.unsubs.forEach(unsub=>unsub())
  }

  shouldComponentUpdate=(props, state)=>{
    //compare states
    if(JSON.stringify(this.state) !== JSON.stringify(state)){
      return true;
    }

    //if on standby
    if(this.status){
      return false;
    }
    return true;
  }

  componentWillReceiveProps=(props)=>{
    this.keyQueued = props.currentGridKey
    if(!this.status){
      if(!this.state.actualKey){
        //only add.
        console.log('adding')
        this.processAdd();
      } else {
        console.log('removing')
        this.processRemove();
      }
    } else {
      console.log(`Currently in ${this.status}. Only updating queued key to ${props.currentGridKey}`)
    }
    //If there is a change of key
    // let {actualKey} = this.state
    // if(actualKey && actualKey !== props.currentGridKey){
    //   clearTimeout(this.timeout)
    //   this.setState({
    //     actualKey: undefined,
    //     expandIdx: undefined
    //   }, ()=>{
    //     this.timeout = setTimeout(()=>{
    //       this.setState({actualKey: props.currentGridKey})
    //     }, Constants.GRID_SHOW_HIDE_TIME)
    //   })
    // } else {
    //   this.setState({actualKey: props.currentGridKey})
    // }
  }

  //if currently there is a key, remove animation sets in first, then go for new key
  //otherwise goes straight to new key
  status = null//[null, removing, adding]
  keyQueued = null

  //will remove and also queue up the next key
  processRemove = ()=>{
    if(!this.keyQueued){
      console.log('No Key Queued, Returning')
      this.status = null;
      return;
    }
    this.status = 'removing'
    this.setState({
      actualKey: undefined,
      expandIdx: undefined
    }, ()=>{
      setTimeout(this.processAdd, Constants.GRID_SHOW_HIDE_TIME)
    })
  }

  processAdd = ()=>{
    this.status = 'adding'
    this.setState({
      actualKey: this.keyQueued,
      expandIdx: undefined
    }, ()=>{
      this.keyQueued = null
      setTimeout(this.processRemove, Constants.GRID_SHOW_HIDE_TIME)
    })
  }

  onClickGridItem = (expandIdx) => {
    //an ugly hack...for my imperfectly designed UI
    if(this.state.actualKey){
      if(!this.props.data[this.state.actualKey].gridProps.onClick){
        this.setState({expandIdx})
      }
      // if(this.props.data[this.state.actualKey].gridProps.onClick === 'shuffle'){
      // }
    }
  }

  renderGrid = (key, idx)=>{
    let gridData = this.props.data[key]
    return <Transition key={key} in={this.state.actualKey === key} timeout={Constants.GRID_SHOW_HIDE_TIME} mountOnEnter unmountOnExit appear>
      {(status)=>{
        return <Grid expandIdx={this.state.expandIdx} status={status} {...gridData.gridProps}>
          {gridData.grids.map(g=>{
            return <GridItem key={g.idx} {...g} onClick={()=>this.onClickGridItem(g.idx)}/>
          })}
        </Grid>
      }}
    </Transition>
  }

  render(){
    return <div className='grid-container'>{Object.keys(this.props.data).map(this.renderGrid)}</div>
  }
}
