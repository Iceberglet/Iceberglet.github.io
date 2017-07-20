import React from 'react'
import SmallGrid from './small-grid'
import './grid.scss'

/*
  gridList: [
    { content: 'JS', subGrid: ['ReactJS', 'Node.JS', 'TS', 'jQuery', 'SCSS', 'RESTful'] },
    { content: 'Web', subGrid: ['HTML5', 'CSS3', 'SASS', 'Webkit' ] },
    { content: 'DB', subGrid: ['SQL', 'JPA', 'MongoDB', 'Hadoop', 'Atom'] },
    { content: 'Java', subGrid: ['ApacheMQ', 'Spring', 'Camel', 'Hibernate', 'Hadoop', 'Maven', 'Gradle'] },
    { content: 'C#', subGrid: ['NuGet', 'Math.NET', '.NET', 'LINQ', 'Unity3D', 'MonoGame'] },

    ...
  ]
*/
export default class Grid extends React.Component {
  static propTypes = {
    gridList: React.PropTypes.array
  }

  renderGrid=(grid, idx)=>{
    return <div className='grid'>
      <SmallGrid grid={grid}/>
    </div>
  }

  render(){
    return <div className='grid-container'>
      {this.props.gridList.map(this.renderGrid)}
    </div>
  }
}
