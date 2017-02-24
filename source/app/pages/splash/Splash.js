import React from 'react'
import './splash.css'

const convergeTiming = 2

export const Splash = React.createClass({
  propTypes: {
    onFinishLoad: React.PropTypes.func
  },

  getInitialState(){
    return {
      words: [
          '%E4%BD%A0%E5%A5%BD%E5%95%8A',  //Chinese
          'Bonjour',
          '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' //Japanese
        /*[
          {content: '%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5', left: 60, top: 17, size: 3}, //Russian
          {content: 'Hola', left: 10, top: 55, size: 3},
          {content: '%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B5', left: 45, top: 8, size: 3},  //Thai
          {content: '%D9%85%D8%B1%D8%AD%D8%A8%D8%A7', left: 77, top: 25, size: 3},  //Arabic
          {content: 'Hola', left: 5, top: 10, size: 3},
          {content: 'Ciao', left: 80, top: 80, size: 3},
          {content: 'Hei', left: 27, top: 75, size: 3},
          {content: 'Ol%C3%A1', left: 68, top: 65, size: 3},  //Portuguese
          {content: '%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87', left: 34, top: 55, size: 3}  //Sanskrit Namaste
        ]*/
      ],
      currentStage: -1
    }
  },

  renderWords(){
    let result = this.state.words.map((o,idx)=>(<div className={'element ' + (idx===this.state.currentStage? '': 'disappear')} key={idx}>{decodeURIComponent(o)}</div>))
    return result
  },

  triggerAdvance(){
    if(this.state.currentStage === convergeTiming +1){
      this.props.onFinishLoad()
      return
    } else {
      this.setState({
        currentStage: this.state.currentStage + 1
      })
      setTimeout(this.triggerAdvance, 2000)
    }
  },

  componentDidMount(){
    this.triggerAdvance()
  },

  render(){
    return (<div className='fill splash'>
      {
        <div className={'element appear '} style={{
          position: 'absolute',
          fontSize: '15vw',
          left: '40%',
          top: '31%',
          display: 'none'
        }} key={'Hello'}>{'Hi'}</div>
      }
      {
        this.renderWords()
      }
    </div>)
  }
})
