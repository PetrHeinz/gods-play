import GameObject from '../GameObject'
import Cell from '../Cell/Cell'
import HashMap from 'hashmap'
import Exception from '../../Exception'

export default class Board extends GameObject {
  /**
   * @param {GameConfig} gameConfig
   */
  constructor (gameConfig) {
    super()

    /** @type {GameConfig} */
    this.gameConfig = gameConfig

    /** @type {HashMap} */
    this.cellsByCoordinate = new HashMap()
  }

  /**
   * @param {Player} player
   * @return {Unit[]}
   */
  getUnitsOwnedBy (player) {
    return this.children
      .map(cell => cell.unit)
      .filter(unit => unit !== null && unit.owner === player)
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
    if (distance > this.gameConfig.boardSize) {
      throw new Exception('Cell cannot be added to Board of insufficient size ' + this.gameConfig.boardSize + ' (' + distance + ' needed)')
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
}
