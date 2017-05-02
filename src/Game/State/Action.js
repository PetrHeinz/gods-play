export default class Action {
  /**
   * @param {string} label
   * @param {Function} callback
   */
  constructor (label, callback) {
    /** @type {string} */
    this.label = label

    /** @type {Function} */
    this.callback = callback
  }
}
