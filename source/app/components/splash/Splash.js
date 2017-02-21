import React from 'react'

const getElement = ({content, left, top, size, color}, idx, appear, converge, lastResort)=>{
  let style = {
    position: 'absolute',
    color,
    fontSize: size+'vw'
  }
  if(!converge){
    style.left = left+'%'
    style.top = top+'%'
    if(lastResort){
      style.transition = '2.5s'
    }
  } else {
    style.transition = '2.5s'
  }
  return (
    <div className={'element '+(appear&&' appear ') + (converge&&' converge')} style={style} key={idx}>{decodeURIComponent(content)}</div>
  )
}

const convergeTiming = 2

export const Splash = React.createClass({
  propTypes: {
    onFinishLoad: React.PropTypes.func
  },

  getInitialState(){
    return {
      words: [
        [
          {content: '%E4%BD%A0%E5%A5%BD%E5%95%8A', left: 20, top: 20, size: 5},  //Chinese
          {content: 'Bonjour', left: 65, top: 38, size: 5},
          {content: '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF', left: 36, top: 63, size: 5},
          {content: 'Hallo', left: 56, top: 30, size: 3}
        ],  //Japanese
        [
          {content: '%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5', left: 60, top: 17, size: 3}, //Russian
          {content: 'Hola', left: 10, top: 55, size: 3},
          {content: '%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B5', left: 45, top: 8, size: 3},  //Thai
          {content: '%D9%85%D8%B1%D8%AD%D8%A8%D8%A7', left: 77, top: 25, size: 3},  //Arabic
          {content: 'Hola', left: 5, top: 10, size: 3},
          {content: 'Ciao', left: 80, top: 80, size: 3},
          {content: 'Hei', left: 27, top: 75, size: 3},
          {content: 'Ol%C3%A1', left: 68, top: 65, size: 3},  //Portuguese
          {content: '%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87', left: 34, top: 55, size: 3}  //Sanskrit Namaste
        ]
      ],
      currentStage: -1
    }
  },

  renderWords(){
    let toRender = [], idx = 0
    this.state.words.forEach((list, row)=>{
      list.forEach((item)=>{
        toRender.push(getElement(item, idx++, row<=this.state.currentStage, this.state.currentStage>=convergeTiming))
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
    if(this.state.currentStage === convergeTiming+1){
      clearInterval(this.interval)
      //Allow Click on 'Hi' and direct to homepage
      this.props.onFinishLoad()
    }
  },

  render(){
    return (<div className='fill splash'>
      {
        getElement({content: 'Hi', left: 40, top: 31, size: 15, color: 'white'}, 'Hi', this.state.currentStage >= convergeTiming, false, true)
      }
      {
        this.renderWords()
      }
    </div>)
  }
})
