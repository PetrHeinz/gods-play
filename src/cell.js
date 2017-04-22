import GameObject from './game-object'
import Unit from './unit'
import Exception from './exception'

export default class Cell extends GameObject {
  /**
   * @return {string[]}
   */
  static getTypes () {
    return ['brick', 'grass', 'sand', 'stone', 'tree', 'water', 'wheat']
  }

  /**
   * @param {CubeCoordinate} coordinate
   * @param {string} type
   */
  constructor (coordinate, type) {
    super()

    if (Cell.getTypes().indexOf(type) === -1) {
      throw new Exception('Cell cannot be created with invalid type "' + type + '"')
    }
    if (coordinate.x + coordinate.y + coordinate.z !== 0) {
      throw new Exception('Cell cannot be created unless coordinates are on plane given by x + y + z = 0')
    }

    /** @type {CubeCoordinate} */
    this.coordinate = coordinate

    /** @type {string} */
    this.type = type

    /** @type {Cell[]} */
    this.neighbors = []
  }

  /**
   * @return {Unit|null}   */
  get unit() {
    if (this.children.length === 0) {
      return null
    }

    return this.children[0]
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

    let unit = super.createChild(Unit, owner)

    this.events.trigger('unitCreated', {
      unit: unit
    })

    return unit
  }
}
