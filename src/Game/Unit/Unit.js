import GameObject from '../GameObject'
import Exception from '../../Exception'

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

    /** @type {bool} */
    this.tired = true
  }

  /**
   * @param {Cell} cell
   * @return {bool}
   */
  isInRange (cell) {
    return this.config.range.isInRange(cell, this.parent)
  }

  /**
   * @param {Cell} cell
   */
  moveTo (cell) {
    if (this.tired) {
      throw new Exception('Tired Unit cannot move')
    }
    if (!this.isInRange(cell)) {
      throw new Exception('Unit cannot be moved on Cell out of range')
    }
    let previousParent = this.parent
    this.setParent(cell)

    this.tired = true

    this.events.trigger('unitMove', {
      unit: this,
      fromCell: previousParent
    })
  }

  refresh () {
    this.tired = false
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
