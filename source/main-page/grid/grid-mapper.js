const mapGrid = {
  0: [],
  1: [1],
  2: [3, 5],
  3: [1, 3, 5],
  4: [1, 3, 5, 7],
  5: [1, 3, 5, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
  7: [0, 1, 2, 3, 5, 6, 8],
  8: [0, 1, 2, 3, 4, 5, 6, 7, 8]
}

export const checkOccupy = (num)=>{
  return (idx)=>mapGrid[num].indexOf(idx) > -1
}
