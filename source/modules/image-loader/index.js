import React from 'react'

let subscriber = null;
let temp = [];

export const load = (images)=>{
  if(subscriber){
    // console.log('There is subscriber! Load images now: ' + images.length)
    subscriber(images)
  } else {
    // console.log('There is no subscriber! save for later load!: ' + images.length)
    temp = temp.concat(images)
  }
}

export default class ImageLoader extends React.Component {
  state = {
    images: []
  }

  componentDidMount=()=>{
    // console.log('subscriber loaded! temp found: ' + temp.length)
    this.addItems(temp)
    subscriber = this.addItems
  }

  addItems=(images)=>{
    this.setState({
      images: this.state.images.concat(images)
    })
  }

  render(){
      return <div style={{display: 'none'}}>
        {this.state.images.map((i, idx)=>{
          if(typeof i === 'string'){
            // console.log('found url')
            return <img key={idx} src={i} />
          }
          return <div key={idx}>{i}</div>
        })}
      </div>
  }
}
