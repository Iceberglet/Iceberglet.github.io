import React from 'react'
import './console.css'

const inlineSpacing = 6;  //each line has 0.2 height and spacing is 0.6

export const Console = React.createClass({

  getInitialState(){
    return {
      lines: ['Welcome, My Friend',
              'You Have Made it to My World',
              'Did You Stumble Upon This Land By Mistake?',
              'Or Are You Looking For Me?'],
      currentLine: 'Hello'
    }
  },

  addNewLine(){

  },

  getPrefix(){
    return '> '
  },

  renderLines(){
    return this.state.lines.map(l=>(<div className='console-line-div'>{this.getPrefix()+l}</div>))
  },

  renderCurrentLine(){
    return (<div className='console-line-div'>{this.getPrefix()+this.state.currentLine}
      <a className='console-caret'></a>
    </div>)
  },

  onKeyPress(e){
    console.log(e)
  },

  render(){
    return (<div className='fill console' onKeyPress={this.onKeyPress}>
        {this.renderLines()}
        {this.renderCurrentLine()}
      </div>)
  }
})
