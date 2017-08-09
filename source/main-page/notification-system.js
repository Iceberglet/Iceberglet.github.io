import React from 'react'
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import Messenger from 'messenger'

const style = {
  NotificationItem: {
    DefaultStyle: {
      margin: '10px 5px 2px 1px'
    },
    success: {
      borderTop: 'none',
      color: 'white',
      backgroundColor: '#623c3c'
    }
  }
}

export default class Notificator extends React.Component {
  _notificationSystem = null

  _addNotification = (note) => {
    this._notificationSystem.addNotification({
      message: note,
      level: 'success',
      dismissible: false
    });
  }

  componentDidMount = ()=>{
    this._notificationSystem = this.refs.notificationSystem;
    Messenger.on('notification', (note)=>this._addNotification(note))
  }

  render(){
    return (<NotificationSystem ref="notificationSystem" style={style}/>);
  }
}
