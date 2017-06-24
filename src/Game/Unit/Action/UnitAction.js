import CellOutOfRangeException from '../../../exceptions/CellOutOfRangeException'

export default class UnitAction {
  /**
   * @param {Cell} cell
   * @param {Unit} unit
   * @return {boolean}
   */
  isCellInRange (cell, unit) {
    return true
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCell (cell, unit) {
    if (!this.isCellInRange(cell, unit)) {
      throw new CellOutOfRangeException()
    }

    this.onCellAction(cell, unit)
  }

  /**
   * @param {Cell} cell
   * @param {Unit} unit
   */
  onCellAction (cell, unit) {}
}
