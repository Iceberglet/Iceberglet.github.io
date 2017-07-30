import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Hexagram extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
  }

  render(){
    return <div className={`hexagram ${this.props.className}`} style={this.props.style}>
      <svg className='circles' viewBox='0 0 100 100'>
        <g>
          <circle cx={50} cy={50} r={30}/>
        </g>
        <g>
          <circle cx={50} cy={50} r={30}/>
        </g>
        <g>
          <circle cx={50} cy={50} r={30}/>
        </g>
      </svg>
      <svg className='meteor meteor-1' viewBox='0 0 100 100'>
        <g>
          <circle cx={50} cy={50} r={40}/>
        </g>
      </svg>
      <svg className='meteor meteor-2' viewBox='0 0 100 100'>
        <g>
          <circle cx={50} cy={50} r={40}/>
        </g>
      </svg>
      <svg className='meteor meteor-3' viewBox='0 0 100 100'>
        <g>
          <circle cx={50} cy={50} r={40}/>
        </g>
      </svg>
    </div>
  }
}
