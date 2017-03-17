import React from 'react'
import './mascot.scss'

export const Mascot = React.createClass({
  renderBody(){
    return (
      <svg width="200" height="200" >
  			 <defs>
  				 <mask id="hole">
  			 		<rect width="100%" height="100%" fill="white"/>
  				 	<circle r="50" cx="100" cy="100" fill="black" />
  			 	</mask>
  			</defs>
  			<circle r="100" cx="100" cy="100" mask="url(#hole)" fill='red'/>
  		</svg>
    )
  },
  render(){
    return this.renderBody()
  }
})
//
//<path d='M 0 50 a 50,50 0 1,0 100, 0 a 50,50 0 1,0 -100 0 z  ' fillRule='evenodd' fill='red'/>    M 10 50 a 50,50 0 1,0 80, 0 a 50,50 0 1,0 -80 0 z
