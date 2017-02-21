import React from 'react'

const getElement = ({content, left, top, size}, appear, idx)=>{
  return (
    <div className={'element '+(appear&&'appear')} style={{
      position: 'absolute',
      left: left+'%',
      top: top+'%',
      fontSize: size+'vw'}} key={idx}>{decodeURIComponent(content)}</div>
  )
}

export const App = React.createClass({

  getInitialState(){
    return {
      words: [
        [{content: 'Hi', left: 45, top: 40, size: 6}],
        [{content: '%E4%BD%A0%E5%A5%BD%E5%95%8A', left: 20, top: 20, size: 4},  //Chinese
        {content: 'Bonjour', left: 80, top: 38, size: 4},
        {content: '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF', left: 36, top: 63, size: 4}],  //Japanese
      ],
      currentStage: -1
    }
  },

  renderWords(){
    let toRender = [], idx = 0
    this.state.words.forEach((list, row)=>{
      list.forEach((item)=>{
        toRender.push(getElement(item, row<=this.state.currentStage, idx++))
      })
    })
    return toRender
  },

  componentDidMount(){
    this.interval = setInterval(()=>{
      this.setState({
        currentStage: this.state.currentStage+1
      })
    }, 1200)
  },

  componentDidUpdate(){
    if(this.state.currentStage === 3){
      clearInterval(this.interval)
    }
  },

  render(){
    return (<div className='fill splash'>
      {
        this.renderWords()
      }
    </div>)
  }
})
