import Board from './Board'
import CubeCoordinateMap from '../Cell/CubeCoordinateMap'
import { random } from '../../function/array'

export default class BoardGenerator {
  /**
   * @param {gameObjectFactory} gameObjectFactory
   */
  constructor (gameObjectFactory) {
    /** @type {gameObjectFactory} */
    this.gameObjectFactory = gameObjectFactory
  }

  /**
   * @param {GameConfig} config
   * @return {Board}
   */
  generate (config) {
    let board = this.gameObjectFactory.create(Board, config)

    let map = new CubeCoordinateMap()
    createCellOnBoard(board, map.origin, config)

    for (let radius = 1; radius <= config.boardSize; radius++) {
      let ring = map.origin.getRing(radius)
      ring.forEach(coordinate => createCellOnBoard(board, coordinate, config))
    }

    return board

    /**
     * @param {Board} board
     * @param {CubeCoordinate} coordinate
     * @param {GameConfig} config
     */
    function createCellOnBoard (board, coordinate, config) {
      let distance = Math.max(Math.abs(coordinate.x), Math.abs(coordinate.y), Math.abs(coordinate.z))
      let strength = Math.ceil(Math.random() * (config.boardSize - distance + 3))
      let cellConfig = random(config.cellConfigs)

      board.createChild(coordinate, strength, cellConfig)
    }
  }
}
