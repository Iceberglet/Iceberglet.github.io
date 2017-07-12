import moment from 'moment'
import { idGenerator, camelToDash } from 'utils'

const EventType = function(thumbnail, pinColor){
  this.thumbnail = thumbnail;
  this.pinColor = pinColor;
}

export const EventTypes = {
  Professional: new EventType('fa fa-handshake-o', '#59599b'),
  Educational: new EventType('fa fa-graduation-cap-fw', '#b76d6d'),
  Personal: new EventType('fa fa-puzzle-piece', '#8ec299')
}

export const Day = function(year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
  //Below works even if month / day are undefined
  this._momentObj = moment(year + ' ' + month + ' ' + day, 'YYYY MM DD')
  if(!this._momentObj.isValid()){
    throw new Error('Unable to construct moment: ', year, month, day)
  }
}

Day.prototype.getPercentageInYear = function(){
  return this._momentObj.dayOfYear() / (this._momentObj.isLeapYear()? 366 : 365) * 100
}

Day.prototype.getDayStr = function(){
  let str = ''+this.year
  if(this.month){
    str += '.' + this.month
    if(this.day){
      str += '.' + this.day
    }
  }
  return str
}

Day.prototype.compareTo = function(another){
  if(another instanceof Day){
    return this._momentObj.diff(another._momentObj)
  } else {
    throw new Error('Fed a non-Day object: ', another)
  }
}

const idGen = idGenerator()

export const Event = function(title, type, aday) {
  if(Object.values(EventTypes).indexOf(type) < 0){
    throw new Error('No Such Event Type: ', type)
  }
  if(!(aday instanceof Day)){
    throw new Error('Invalid Param (Not of type "Day"): ', aday)
  }
  this.id = idGen()
  this.title = title;
  this.type = type;
  this.day = aday;
}
