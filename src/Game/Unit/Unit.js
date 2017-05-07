import GameObject from '../GameObject'
import Exception from '../../exceptions/Exception'

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
  isInMoveRange (cell) {
    return this.config.moveRange.isInRange(cell, this.parent)
  }

  /**
   * @param {Cell} cell
   * @return {bool}
   */
  isInAttackRange (cell) {
    return this.config.attackRange.isInRange(cell, this.parent)
  }

  /**
   * @param {Cell} cell
   */
  moveTo (cell) {
    if (this.tired) {
      throw new Exception('Tired Unit cannot move')
    }
    if (!this.isInMoveRange(cell)) {
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

  /**
   * @param {Cell} cell
   */
  attackOn (cell) {
    if (this.tired) {
      throw new Exception('Tired Unit cannot attack')
    }
    if (!this.isInAttackRange(cell)) {
      throw new Exception('Unit cannot attack on Cell out of range')
    }
    console.log('CELL ATTACKED!')

    this.tired = true

    this.events.trigger('unitAttack', {
      unit: this
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
