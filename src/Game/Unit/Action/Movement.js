import UnitAction from './UnitAction'
import { neighborDistance } from '../../Cell/function/distance'

export default class Movement extends UnitAction {
  /**
   * @param {number} rangeRadius
   */
  constructor (rangeRadius = 1) {
    super()

    /** @type {number} */
    this.rangeRadius = rangeRadius
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   * @return {boolean}
   */
  isCellInRange (cell, unit) {
    return cell.unit === null &&
      neighborDistance(unit.parent, cell) <= this.rangeRadius
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCellAction (cell, unit) {
    unit.setParent(cell)
  }
}
