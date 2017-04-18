import Exception from './exception'

export default class Events {
  constructor () {
    /** @type {Object.<string, Function>[]} */
    this.callbacks = {}
  }

  /**
   * @param {string} name
   * @param {Function} callback
   */
  listen (name, callback) {
    if (!this.callbacks.hasOwnProperty(name)) {
      this.callbacks[name] = []
    }

    this.callbacks[name].push(callback)
  }

  /**
   * @param {string} name
   * @param {*} data
   */
  trigger (name, data) {
    if (!this.callbacks.hasOwnProperty(name)) {
      throw new Exception('Event "' + name + '" has been triggered but no one listens...', Exception.SEVERITY_NOTICE)
    }

    this.callbacks[name].forEach(function (callback) {
      callback(data)
    })
  }
}
