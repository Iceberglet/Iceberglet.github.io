import React from 'react'
import './mascot.scss'

export const Mascot = React.createClass({
  renderBody(){
    return (<div className='mascot'>
        <div className='mascot-body'>
          <svg width="100%" height="100%" viewPort="0 0 200 200">
      			<circle r="100" cx="100" cy="100" fill='red'/>
            <svg className='mascot-eye' clipPath="">

            </svg>
      		</svg>
        </div>
      </div>
    )
  },
  render(){
    return this.renderBody()
  }
})
//
//<path d='M 0 50 a 50,50 0 1,0 100, 0 a 50,50 0 1,0 -100 0 z  ' fillRule='evenodd' fill='red'/>    M 10 50 a 50,50 0 1,0 80, 0 a 50,50 0 1,0 -80 0 z
