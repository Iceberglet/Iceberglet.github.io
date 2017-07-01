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

export const idGenerator = function(){
  let counter = 0;
  return function(){
    counter++;
    return counter;
  }
}
