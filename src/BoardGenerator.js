import Board from './Board'
import CubeCoordinateMap from './CubeCoordinateMap'
import { random } from './function/array'

export default class BoardGenerator {
  /**
   * @param {GameObjectFactory} gameObjectFactory
   */
  constructor (gameObjectFactory) {
    /** @type {GameObjectFactory} */
    this.gameObjectFactory = gameObjectFactory
  }

  /**
   * @param {GameConfig} config
   * @return {Board}
   */
  generateBoard (config) {
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
