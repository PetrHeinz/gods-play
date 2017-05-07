import WithoutUnit from '../Cell/Range/WithoutUnit'
import WithUnit from '../Cell/Range/WithUnit'

export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {Range} moveRange
   * @param {Range} attackRange
   */
  constructor (symbol, moveRange, attackRange) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {Range} */
    this.moveRange = (moveRange instanceof WithoutUnit) ? moveRange : new WithoutUnit(moveRange)

    /** @type {Range} */
    this.attackRange = (attackRange instanceof WithUnit) ? attackRange : new WithUnit(attackRange)
  }
}
