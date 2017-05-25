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
    let strength = Math.ceil(Math.random() * (config.boardSize + 3))
    let cellConfig = random(config.cellConfigs)
    board.createChild(map.origin, strength, cellConfig)

    for (let radius = 1; radius <= config.boardSize; radius++) {
      let ring = map.origin.getRing(radius)
      ring.forEach(function (coordinate) {
        let strength = Math.ceil(Math.random() * (config.boardSize - radius + 3))
        let cellConfig = random(config.cellConfigs)
        board.createChild(coordinate, strength, cellConfig)
      })
    }

    return board
  }
}
