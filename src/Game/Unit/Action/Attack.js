import UnitAction from './UnitAction'
import WithUnitOfOtherPlayer from '../../Cell/Range/WithUnitOfOtherPlayer'

export default class Attack extends UnitAction {
  /**
   * @param {Range} range
   */
  constructor (range) {
    let filteredRange = (range instanceof WithUnitOfOtherPlayer) ? range : new WithUnitOfOtherPlayer(range)

    super(filteredRange)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCell (cell, unit) {
    super.onCell(cell, unit)

    cell.unit.die()
  }
}
