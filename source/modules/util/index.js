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

//NOTE: func should be parameter-less.
export const postpone = (func, graceTime=1000)=>{
  let timer;
  return ()=>{
    if(timer){
      clearTimeout(timer)
    }
    let timer = setTimeout(()=>func(), graceTime)
  }
}

export const randomBetween = (l, h) => {
  return Math.random() * (h - l) + l
}

export const arrayToMap = (arr, keyProvider) => {
  let res = {}
  if(!arr || !(arr instanceof Array)){
    throw new Error('Received non array: ', arr)
  }
  if(!keyProvider || !(typeof keyProvider === 'function')){
    throw new Error('Received non function: ', keyProvider)
  }
  arr.forEach(item=>res[keyProvider(item)] = item)
  return res;
}

export { registerToMouse, unsubFromMouse } from './screen-mouse-listener'

export const idGenerator = function(){
  let counter = 0;
  return function(){
    counter++;
    return counter;
  }
}
