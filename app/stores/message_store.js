import Dispatcher from "../dispatcher";
import axios from 'axios'

export default class MessageStore {
  constructor() {
    this.messages = [];
    this.dispatcher = new Dispatcher();
    this.token = dispatcher.register(this.handleEvents);
  }
  
  handleEvents(action) {
    switch(action.type) {
      case ROOM_CREATED:
        axios.post('api.lvh.me:3000/rooms', action.data)
        .then(response => console.log(response))
        break;
      case USER_INVITED:
        axios.post('api.lvh.me:3000/invitations', action.data)
        .then(response => console.log(response))
        break;
      case MESSAGE_POSTED:
        axios.post('api.lvh.me:3000/rooms/messages', action.data)
        .then(response => console.log(response))
        break;
      case DISPLAY_MESSAGES:
        axios.get('api.lvh.me:3000/rooms/messages', action.data)
        .then(response => console.log(response))
        break;
    }
  }
}
