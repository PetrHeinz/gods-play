import Attack from './Attack'
import NeighborRange from '../../Cell/Range/NeighborRange'

export default class MeleeAttack extends Attack {
  /**
   * @param {number} [rangeRadius]
   */
  constructor (rangeRadius = 1) {
    let range = new NeighborRange(rangeRadius)

    super(range)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCell (cell, unit) {
    super.onCell(cell, unit)

    if (unit.isInMoveRange(cell)) {
      unit.moveTo(cell)
    }
  }
}
