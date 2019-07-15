export default class EventEmitter {
  _ = Object.create(null);

  /**
   * @param {string} event
   * @param {Function} listener
   */
  on(event, listener) {
    if (this._[event]) {
      this._[event].push(listener);
    } else {
      this._[event] = [listener];
    }
  }

  /**
   * @param {string} event
   * @param  {...any} args
   */
  emit(event, ...args) {
    if (this._[event]) {
      this._[event].forEach(listener => listener(...args));
    }
  }
}
