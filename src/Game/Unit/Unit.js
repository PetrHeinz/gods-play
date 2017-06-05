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

    /** @type {boolean} */
    this.tired = true
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  isInMoveRange (cell) {
    return this.config.movement.isCellInRange(cell, this)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  isInAttackRange (cell) {
    return this.config.attack.isCellInRange(cell, this)
  }

  /**
   * @param {Cell} cell
   */
  moveTo (cell) {
    if (this.tired) {
      throw new Exception('Tired Unit cannot move')
    }

    let previousParent = this.parent

    this.config.movement.onCell(cell, this)

    this.tired = true

    this.events.trigger('unitMoved', {
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

    this.config.attack.onCell(cell, this)

    this.tired = true

    this.events.trigger('unitAttacked', {
      unit: this
    })
  }

  die () {
    let cell = this.parent

    this.parent.removeChild(this)

    this.events.trigger('unitDied', {
      unit: this,
      onCell: cell
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
