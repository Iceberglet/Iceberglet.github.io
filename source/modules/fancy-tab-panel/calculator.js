import {CROSS_WIDTH} from './constants'

// totalWidth: the entire width of the top tab Panel
// number: number of tabs
// maxTabWidth: the maximum width of tab
// wedge percentage: the ratio of wedege width to (tab w + wedge w)
export const calculate = (totalWidth, number, considersCrossButton = true, maxTabWidth = 150, wedgePercentage = 0.12) => {
  let tabWidth = totalWidth / (number + wedgePercentage)
  tabWidth = Math.min(maxTabWidth, tabWidth)
  if(considersCrossButton){
    tabWidth = Math.max(tabWidth, CROSS_WIDTH)
  }
  let tabWidthFull = tabWidth * ( 1 + wedgePercentage )
  let wedgeWidth = tabWidth * wedgePercentage
  let contentWidth = tabWidth - wedgeWidth

  let res = [], left = 0;
  for(let i = 0; i < number; i++){
    res.push({
      width: tabWidthFull,
      wedgeWidth, left, contentWidth
    })
    left += tabWidth
  }
  return res;
}
