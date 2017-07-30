const HSL = function(h,s,l){
  this.h = h;
  this.s = s;
  this.l = l;
}

HSL.prototype.toString=function(){
  return `hsl(${this.h}, ${this.s}%, ${this.l}%)`
}

const wrapClamp = (v, l, h)=>{
  if(v < l){
    return (v - l) % (h - l) + (h - l)
  } else if (v > h){
    return (v - h) % (h - l) - (h - l)
  } else {
    return v;
  }
}

export const pureHSL = (hue)=>{
  return new HSL(hue, 100, 50)
}

export const randomHSL = (aroundThisHue, randomRange = 8)=>{
  let ran = Math.random() * 2 * randomRange - 2 * randomRange
  return new HSL(wrapClamp(aroundThisHue + ran, 0, 360), 100 - Math.random()*20, 55 + Math.random()*10);
}
