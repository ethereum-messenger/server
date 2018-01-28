import enumerable from './utils/enumerable';

const ActionType = enumerable([
  ROOM_CREATED,
  USER_INVITED,
  USER_JOINED,
  MESSAGE_POSTED,
]);

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
