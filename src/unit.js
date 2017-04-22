import GameObject from './game-object'
import Exception from './exception'

export default class Unit extends GameObject {
  /**
   * @param {Player} owner
   */
  constructor (owner) {
    super()

    /** @type {Player} */
    this.owner = owner
  }

  /**
   * @param {Cell} cell
   */
  moveTo (cell) {
    if (cell.unit !== null) {
      throw new Exception('Unit cannot be moved on Cell with assigned Unit')
    }
    if (!this.parent.hasNeighbor(cell)) {
      throw new Exception('Unit cannot be moved on non-neighboring Cell')
    }
    let previousParent = this.parent
    this.setParent(cell)

    this.events.trigger('unitMove', {
      unit: this,
      fromCell: previousParent
    })
  }

  /**
   * @param {Cell} cell
   */
  setParent (cell) {
    if (this.parent !== null) {
      this.parent.removeChild(this)
    }

    super.setParent(cell)
  }
}
