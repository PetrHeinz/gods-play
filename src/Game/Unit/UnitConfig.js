import WithoutUnit from '../Cell/Range/WithoutUnit'

export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {Range} moveRange
   */
  constructor (symbol, moveRange) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {Range} */
    this.moveRange = (moveRange instanceof WithoutUnit) ? moveRange : new WithoutUnit(moveRange)
  }
}
