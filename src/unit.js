import GameObject from './game-object'
import Exception from './exception'

export default class Unit extends GameObject {
  /**
   * @param {Player} owner
   * @param {UnitConfig} config
   */
  constructor (owner, config) {
    super()

    /** @type {Player} */
    this.owner = owner

    /** @type {UnitConfig} */
    this.config = config
  }

  /**
   * @param {Cell} cell
   */
  moveTo (cell) {
    if (cell.unit !== null) {
      throw new Exception('Unit cannot be moved on Cell with assigned Unit')
    }
    if (!this.config.range.isInRange(this.parent, cell)) {
      throw new Exception('Unit cannot be moved on Cell out of range')
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
