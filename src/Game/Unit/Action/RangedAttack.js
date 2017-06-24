import UnitAction from './UnitAction'
import { coordinateDistance } from '../../Cell/function/distance'

export default class RangedAttack extends UnitAction {
  /**
   * @param {number} [rangeRadius]
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
    return cell.unit !== null &&
      cell.unit.owner !== unit.owner &&
      coordinateDistance(unit.parent, cell) <= this.rangeRadius
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCellAction (cell, unit) {
    cell.unit.inflictDamage(unit.health)
  }
}
