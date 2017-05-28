import GameObject from '../GameObject'
import Unit from '../Unit/Unit'
import Exception from '../../exceptions/Exception'
import Mage from '../Unit/Mage'

export default class Cell extends GameObject {
  /**
   * @param {CubeCoordinate} coordinate
   * @param {number} strength
   * @param {CellConfig} config
   */
  constructor (coordinate, strength, config) {
    super()

    if (coordinate.x + coordinate.y + coordinate.z !== 0) {
      throw new Exception('Cell cannot be created unless coordinates are on plane given by x + y + z = 0')
    }

    /** @type {CubeCoordinate} */
    this.coordinate = coordinate

    /** @type {number} */
    this.strength = strength

    /** @type {CellConfig} */
    this.config = config

    /** @type {Cell[]} */
    this.neighbors = []
  }

  /**
   * @return {Unit|null}
   */
  get unit () {
    if (this.children.length === 0) {
      return null
    }

    return this.children[0]
  }

  /**
   * @param {number} strength
   * @return {number}
   */
  drainStrength (strength) {
    let originalStrength = this.strength
    let drainedStrength = Math.min(strength, originalStrength)

    this.strength -= drainedStrength

    this.events.trigger('cellDrained', {
      cell: this,
      drainedStrength: drainedStrength,
      originalStrength: originalStrength
    })

    if (this.strength === 0) {
      this.destroy()
    }

    return drainedStrength
  }

  destroy () {
    if (this.unit !== null) {
      this.unit.die()
    }

    let board = this.parent

    this.parent.removeChild(this)

    this.events.trigger('cellDestroyed', {
      cell: this,
      onBoard: board
    })
  }

  /**
   * @param {Cell} cell
   */
  addNeighbor (cell) {
    this.neighbors.push(cell)
  }

  /**
   * @param {Cell} cell
   * @return bool
   */
  hasNeighbor (cell) {
    return this.neighbors.indexOf(cell) > -1
  }

  /**
   * @param {Cell} neighbor
   */
  removeNeighbor (neighbor) {
    if (!this.hasNeighbor(neighbor)) {
      throw new Exception('Neighbor not found')
    }

    let index = this.neighbors.indexOf(neighbor)
    this.neighbors.splice(index, 1)

    if (neighbor.hasNeighbor(this)) {
      neighbor.removeNeighbor(this)
    }
  }

  /**
   * @param {Player} owner
   * @return {Unit}
   */
  createChild (owner) {
    if (this.unit !== null) {
      throw new Exception('Unit cannot be created on Cell with assigned Unit')
    }
    if (this.config.unitConfig === null) {
      throw new Exception('Unit cannot be created on Cell without configured UnitConfig')
    }

    let unit = super.createChild(Unit, owner, this.config.unitConfig)

    this.events.trigger('unitCreated', {
      unit: unit
    })

    return unit
  }

  /**
   * @param {Player} owner
   * @return {Unit}
   */
  createMageChild (owner) {
    if (this.unit !== null) {
      throw new Exception('Mage cannot be created on Cell with assigned Unit')
    }
    if (owner.mage !== null) {
      throw new Exception('Mage cannot be created for a Player that already has a Mage')
    }

    owner.mage = super.createChild(Mage, owner, this.parent.gameConfig.mageConfig)
    owner.mage.refresh()

    this.events.trigger('unitCreated', {
      unit: owner.mage
    })

    return owner.mage
  }
}
