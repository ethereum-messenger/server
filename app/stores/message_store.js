import Dispatcher from '../dispatcher';
import { ActionType } from '../actions';
import { EventEmitter } from 'events';
import axios from 'axios';

export default class MessageStore {
  constructor() {
    this.messages = [];
    this.dispatcher = new Dispatcher();
    this.token = this.dispatcher.register(this.handleEvents);
    this.emitter = new EventEmitter();
  }

  handleEvents(action) {
    switch(action.type) {
      case ActionType.ROOM_CREATED:
        axios.post('http://api.lvh.me:3000/rooms', action.data)
        .then(response => console.log(response))
        break;
      case ActionType.USER_INVITED:
        axios.post('http://api.lvh.me:3000/invitations', action.data)
        .then(response => console.log(response))
        break;
      case ActionType.MESSAGE_POSTED:
        alert('here');
        axios.post('http://api.lvh.me:3000/rooms/messages', action.data)
        .then(response => {
          console.log(response)
        })
        break;
      case ActionType.DISPLAY_MESSAGES:
        axios.get('http://api.lvh.me:3000/rooms/messages', action.data)
        .then(response => console.log(response))
        break;
    }
  }

  listenForMessages(callback) {
    this.emitter.on('MESSAGE_AVAILABLE', callback);
  }
}
