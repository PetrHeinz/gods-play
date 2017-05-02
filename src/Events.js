export default class Events {
  constructor () {
    /** @type {GameObject.<string, Function>[]} */
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
    if (this.callbacks.hasOwnProperty(name)) {
      this.callbacks[name].forEach(function (callback) {
        callback(data)
      })
    }
  }
}
