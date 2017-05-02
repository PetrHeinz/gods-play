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
    board.createChild(map.origin, random(config.cellConfigs))

    for (let radius = 1; radius <= config.boardSize; radius++) {
      let ring = map.origin.getRing(radius)
      ring.forEach(function (coordinate) {
        board.createChild(coordinate, random(config.cellConfigs))
      })
    }

    return board
  }
}
