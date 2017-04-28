export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {CellRange} range
   */
  constructor (symbol, range) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {CellRange} */
    this.range = range
  }
}
