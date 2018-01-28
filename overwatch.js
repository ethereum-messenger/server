
const ACTIONS = {
  NEW_MESSAGE = 0,
  USER_JOINED = 1,
  ROOM_CREATED = 2,
}

class Overwatch {
  constructor() {
    this.listeners = {};
    this.listeners[ACTIONS.NEW_MESSAGE] = [];
    this.listeners[ACTIONS.USER_JOINED] = [];
    this.listeners[ACTIONS.ROOM_CREATED] = [];
  }

  listen(action, callback) {
    this.listeners[action].push_back(callback);
  }

  broadcast(action, data) {
    this.listeners[action].forEach((delegate) => delegate(data));
  }
}
