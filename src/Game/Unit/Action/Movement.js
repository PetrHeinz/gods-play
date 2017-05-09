import UnitAction from './UnitAction'
import NeighborRange from '../../Cell/Range/NeighborRange'
import WithoutUnit from '../../Cell/Range/WithoutUnit'

export default class Movement extends UnitAction {
  /**
   * @param {number} rangeRadius
   */
  constructor (rangeRadius = 1) {
    let range = new WithoutUnit(new NeighborRange(rangeRadius))

    super(range)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCell (cell, unit) {
    super.onCell(cell, unit)

    unit.setParent(cell)
  }
}
