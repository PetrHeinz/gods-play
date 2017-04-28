import GameObject from './game-object'
import Cell from './cell'
import HashMap from 'hashmap'
import Exception from './exception'

export default class Board extends GameObject {
  /**
   * @param {number} size
   */
  constructor (size) {
    super()

    /** @type {number} */
    this.size = size

    /** @type {HashMap} */
    this.cellsByCoordinate = new HashMap()
  }

  /**
   * @param {CubeCoordinate} coordinate
   * @param {string} type
   * @return {Cell}
   */
  createChild (coordinate, type) {
    if (this.cellsByCoordinate.has(coordinate)) {
      throw new Exception('Cell cannot be added to Board already having Cell on the same coordinate')
    }
    let distance = Math.max(Math.abs(coordinate.x), Math.abs(coordinate.y), Math.abs(coordinate.z))
    if (distance > this.size) {
      throw new Exception('Cell cannot be added to Board of insufficient size ' + this.size + ' (' + distance + ' needed)')
    }

    let cell = super.createChild(Cell, coordinate, type)
    this.cellsByCoordinate.set(cell.coordinate, cell)

    let self = this
    let neighborCoordinates = cell.coordinate.getRing(1)
    neighborCoordinates.forEach(function (neighborCoordinate) {
      if (self.cellsByCoordinate.has(neighborCoordinate)) {
        let neighbor = self.cellsByCoordinate.get(neighborCoordinate)

        cell.addNeighbor(neighbor)
        neighbor.addNeighbor(cell)
      }
    })

    return cell
  }

  /**
   * @param {Cell} cell
   * @return bool
   */
  removeChild (cell) {
    super.removeChild(cell)
    while (cell.neighbors.length > 0) {
      cell.removeNeighbor(cell.neighbors[0])
    }
  }

  /**
   * @return {Cell[]}
   */
  getShuffledChildren () {
    let children = this.children
    for (let i = children.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let child = children[i]
      children[i] = children[j]
      children[j] = child
    }

    return children
  }
}
