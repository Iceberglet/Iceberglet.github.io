const messenger = function(){
  let subs = {}

  let unsub = (key, cb)=>{
    let i = subs[key].indexOf(cb)
    subs[key].splice(i, 1)
  }

  let api = {
    on: (key, cb)=>{
      if(!subs[key]){
        subs[key] = []
      }
      subs[key].push(cb)
      return ()=>{unsub(key, cb)}
    },

    off: unsub,

    send: (key, ...args)=>{
      if(subs[key]){
        subs[key].forEach(cb=>cb(...args))
      } else {
        console.error('No One is listening to ', key)
      }
    }
  }

  return api
}
const Messenger = messenger()
export default Messenger
