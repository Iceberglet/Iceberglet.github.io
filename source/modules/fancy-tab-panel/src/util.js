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


//Extend Array Prototype
Array.prototype.max = function(f){
  let idx = 0, max = f? f(this[0]) : this[0]
  for(let i = 1; i < this.length; i++){
    let item = f? f(this[i]) : this[i]
    if(item > max){
      idx = i;
      max = item
    }
  }
  return this[idx]
}
