import uuidv4 from 'uuid/v4';

let _dispatcher = null;

export default class Dispatcher {
  let _isDispatching = false;
  let _listeners = {};

  constructor() {
    if (!_dispatcher) {
      _dispatcher = this;
    }

    return _dispatcher;
  }

  register(callback) {
    let token = uuidv4();
    this._listeners[token] = callback;
    return token;
  }

  unregister(token) {
    delete this._listeners[token];
  }

  dispatch(payload) {
    this._isDispatching = true;

    for (let token in this._listeners) {
      const callback = this._listeners[key];
      callback(payload);
    }

    this._isDispatching = false;
  }

  isDispatching() {
    return this._isDispatching;
  }

}
