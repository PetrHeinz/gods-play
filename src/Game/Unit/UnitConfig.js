import WithoutUnit from '../Cell/Range/WithoutUnit'
import WithUnitOfOtherPlayer from '../Cell/Range/WithUnitOfOtherPlayer'

export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {Range} moveRange
   * @param {Range} attackRange
   * @param {bool} isAttackMelee
   */
  constructor (symbol, moveRange, attackRange, isAttackMelee) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {Range} */
    this.moveRange = (moveRange instanceof WithoutUnit) ? moveRange : new WithoutUnit(moveRange)

    /** @type {Range} */
    this.attackRange = (attackRange instanceof WithUnitOfOtherPlayer) ? attackRange : new WithUnitOfOtherPlayer(attackRange)

    /** @type {bool} */
    this.isAttackMelee = isAttackMelee
  }
}
