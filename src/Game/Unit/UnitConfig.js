import WithoutUnit from '../Cell/Range/WithoutUnit'

export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {Range} range
   */
  constructor (symbol, range) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {Range} */
    this.range = (range instanceof WithoutUnit) ? range : new WithoutUnit(range)
  }
}
