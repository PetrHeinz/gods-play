import WithUnitOfOtherPlayer from '../../Cell/Range/WithUnitOfOtherPlayer'
import CellOutOfRangeException from '../../../exceptions/CellOutOfRangeException'

export default class Attack {
  /**
   * @param {Range} range
   */
  constructor (range) {
    /** @type {Range} */
    this.range = (range instanceof WithUnitOfOtherPlayer) ? range : new WithUnitOfOtherPlayer(range)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   * @return {bool}
   */
  isCellInRange (cell, unit) {
    return this.range.isInRange(cell, unit.parent)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCell (cell, unit) {
    if (!this.isCellInRange(cell, unit)) {
      throw new CellOutOfRangeException()
    }

    cell.unit.die()
  }
}
