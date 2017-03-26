export const camelToDash = (str)=>str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z])/g, '$1-$2').toLowerCase();

export const getTransformStyle = (str)=>{
  return {
    MsTransform: str, /* IE 9 */
    WebkitTransform: str, /* Safari */
    transform: str
  }
}

const freq = 20 //ms
export const scrollElement = (el, startTop, endTop, duration) => {
  let step = (endTop - startTop) / duration * freq, i = 0
  if(isNaN(step) || step===0){
    console.log('No need to scroll? ', startTop, endTop, step)
    return;
  }
  let interval = setInterval(()=>{
    el.scrollTop = i * step + startTop
    if((endTop - startTop) / step < i){
      clearInterval(interval)
    }
    i = i+1;
  }, freq)
}

export const randomBetween = (l, h) => {
  return Math.random() * (h - l) + l
}

export { registerToMouse, unsubFromMouse } from './screen-mouse-listener'
