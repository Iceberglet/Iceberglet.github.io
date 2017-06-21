import {CROSS_WIDTH, TAB_STATUS} from './constants'
import {TabMeta} from './TabObject'

// totalWidth: the entire width of the top tab Panel
// tabs: the array of tab objects CONTAINING the ones to delete
// maxTabWidth: the maximum width of tab
// wedge percentage: the ratio of wedege width to (tab w + wedge w)
export const calculate = (totalWidth, tabs, considersCrossButton = true, maxTabWidth = 150, wedgePercentage = 0.12) => {
  let number = tabs.filter(t =>t.status !== TAB_STATUS.EXITTING).length
  if(tabs[tabs.length - 1].status === TAB_STATUS.EXITTING){
    number += 1
  }

  let tabWidth = totalWidth / (number + wedgePercentage)
  tabWidth = Math.min(maxTabWidth, tabWidth)
  if(considersCrossButton){
    tabWidth = Math.max(tabWidth, CROSS_WIDTH)
  }
  let tabWidthFull = tabWidth * ( 1 + wedgePercentage )
  let wedgeWidth = tabWidth * wedgePercentage
  let contentWidth = tabWidth - wedgeWidth

  let res = [], left = 0;
  for(let i = 0; i < tabs.length; i++){
    res.push(left)
    if(tabs[i].status === TAB_STATUS.EXITTING)
      left += tabWidth
  }
  if(res.length !== number)
    throw new Error('Well...')
  return {
    tabPositions: res,
    tabMeta: new TabMeta(tabWidthFull, wedgeWidth, contentWidth)
  }
}

export const Lock = function(){
  let waitList = [], isLocked = false
  let execute = function(func, ...args){
    if(isLocked)
      return;
    isLocked = true;
    while(this.waitList.length > 0){
      let [func, ...args] = waitList.shift()
      func(...args)
    }
    isLocked = false;
  }

  return {
    require: function(func, ...args){
        waitList.push([func, ...args])
        //If is not locked, just execute it.
        execute(func, ...args)
    },
  }
}

export const PromiseLock = function(){
  this.p = new Promise(r=>r()) //simple promise to execute it
}
PromiseLock.prototype.require = function(func, ...args){
  this.p.then(()=>{
    func(...args)
  })
}
