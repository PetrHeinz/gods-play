export default class Exception {
  /**
   * @param {string} message
   * @param {number} [severity]
   */
  constructor (message, severity) {
    if (severity === undefined) {
      severity = Exception.SEVERITY_ERROR
    }

    /** @type {string} */
    this.message = message

    /** @type {number} */
    this.severity = severity
  }

  /**
   * @return {number}
   */
  static get SEVERITY_ERROR () {
    return 1
  }

  /**
   * @return {number}
   */
  static get SEVERITY_NOTICE () {
    return 2
  }
}
