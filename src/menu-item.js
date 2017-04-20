export default class MenuItem {
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
