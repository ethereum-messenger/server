const ActionType = {
  ROOM_CREATED: 0,
  USER_INVITED: 1,
  USER_JOINED: 2,
  MESSAGE_POSTED: 3,
  DISPLAY_MESSAGES: 4,
}

class Action {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

export {
  ActionType,
  Action
};
