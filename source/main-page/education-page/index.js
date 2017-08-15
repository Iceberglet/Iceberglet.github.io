import React from 'react'
import PropTypes from 'prop-types'
import {GridContainer} from 'animated-grid'
import {GridData} from '../grid-data'

import './index.scss'

const ANIMATION_TIME = 500;

export default class EducationPage extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  render(){
    return <div>
      <GridContainer gridData = {GridData['Education']} status = {this.props.status}/>
    </div>
  }
}
