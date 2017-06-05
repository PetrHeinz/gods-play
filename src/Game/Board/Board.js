import GameObject from '../GameObject'
import Cell from '../Cell/Cell'
import HashMap from 'hashmap'
import Exception from '../../exceptions/Exception'
import CellNotFoundException from '../../exceptions/CellNotFoundException'
import Player from '../Player'
import { typename } from '../../function/type'

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
   * @param {CubeCoordinate} coordinate
   * @return {Cell}
   */
  getCellByCoordinate (coordinate) {
    if (!this.cellsByCoordinate.has(coordinate)) {
      throw new CellNotFoundException()
    }

    return this.cellsByCoordinate.get(coordinate)
  }

  /**
   * @param {Player} player
   * @return {Unit[]}
   */
  getUnitsOwnedBy (player) {
    if (!(player instanceof Player)) {
      throw new Exception('Argument must be instance of Player, ' + typename(player) + ' passed')
    }

    return this.children
      .map(cell => cell.unit)
      .filter(unit => unit !== null && unit.owner === player)
  }

  /**
   * @param {CubeCoordinate} coordinate
   * @param {number} strength
   * @param {CellConfig} config
   * @return {Cell}
   */
  createChild (coordinate, strength, config) {
    if (this.cellsByCoordinate.has(coordinate)) {
      throw new Exception('Cell cannot be added to Board already having Cell on the same coordinate')
    }
    let distance = Math.max(Math.abs(coordinate.x), Math.abs(coordinate.y), Math.abs(coordinate.z))
    if (distance > this.gameConfig.boardSize) {
      throw new Exception('Cell cannot be added to Board of insufficient size ' + this.gameConfig.boardSize + ' (' + distance + ' needed)')
    }

    let cell = super.createChild(Cell, coordinate, strength, config)
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
   * @return boolean
   */
  removeChild (cell) {
    super.removeChild(cell)
    while (cell.neighbors.length > 0) {
      cell.removeNeighbor(cell.neighbors[0])
    }
    this.cellsByCoordinate.remove(cell.coordinate)
  }
}
