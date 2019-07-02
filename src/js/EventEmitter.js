export default class EventEmitter {
  _ = {};

  on(event, listener) {
    if (this._[event]) {
      this._[event].push(listener);
    } else {
      this._[event] = listener;
    }
  }

  emit(event, ...args) {
    if (this._[event]) {
      this._[event].forEach(listener => listener(...args));
    }
  }
}
