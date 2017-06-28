import moment from 'moment'

const EventType = function(name, thumbnail){

}

const EventTypes = {
  Professional: {

  },
  Education: {

  },
  Personal: {

  }
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

export const Event = function(title, type, aday) {
  if(EventTypes.keys().indexOf(type) < 0){
    throw new Error('No Such Event Type: ', type)
  }
  if(!(aday instanceof Day)){
    throw new Error('Invalid Param (Not of type "Day"): ', aday)
  }
  this.title = title;
  this.type = type;
  this.day = aday;
}
