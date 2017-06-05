import State from './State'

export default class UnitSelected extends State {
  /**
   * @param {Unit} unit
   */
  constructor (unit) {
    super()

    /** @type {Unit} */
    this.unit = unit
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    if (this.unit.isInMoveRange(cell)) {
      this.unit.moveTo(cell)
    } else if (this.unit.isInAttackRange(cell)) {
      this.unit.attackOn(cell)
    }

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return this.unit.isInMoveRange(cell) || this.unit.isInAttackRange(cell)
  }
}
