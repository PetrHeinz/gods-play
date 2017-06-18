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

    this.config.movement.onCell(cell, this)
    this.tired = true

    this.events.trigger('unitMoved', {
      unit: this
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
    this.parent.removeChild(this)

    this.events.trigger('unitDied', {
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
