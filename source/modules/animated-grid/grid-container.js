import React from 'react'
import PropTypes from 'prop-types'
import Grid from './grid'
import GridItem from './grid-item'

import Constants from './constants'
import {TestGrids} from './testdata'

export default class GridContainer extends React.Component {
  static propTypes = {
    contentKey: PropTypes.string,
    gridData: PropTypes.object,
    status: PropTypes.string,
    onClickGridItem: PropTypes.func
  }

  state = {
  }

  render(){
    let {contentKey, gridData, status} = this.props
    return <Grid key={contentKey} contentKey={contentKey} status={status} {...gridData.gridProps}>
        {gridData.grids.map(g=>{
          return <GridItem key={g.idx} {...g} onClick={()=>this.props.onClickGridItem && this.props.onClickGridItem(g.idx)}/>
        })}
      </Grid>
  }
}
