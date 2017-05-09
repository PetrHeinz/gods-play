import CellOutOfRangeException from '../../../exceptions/CellOutOfRangeException'

export default class UnitAction {
  /**
   * @param {Range} range
   */
  constructor (range) {
    /** @type {Range} */
    this.range = range
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
  }
}
