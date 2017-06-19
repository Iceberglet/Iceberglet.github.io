export { MainPage } from './main-page'

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
