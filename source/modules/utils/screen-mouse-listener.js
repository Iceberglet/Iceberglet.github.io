

//Uses the callback to feed X and Y position
export const registerToMouse = (cb)=>{
  let f = function(e){
    cb(e.clientX, e.clientY)
  }
  document.addEventListener('mousemove', f)
  return f;
}


export const unsubFromMouse = (identifier)=>{
  document.removeEventListener('mousemove', identifier)
}
