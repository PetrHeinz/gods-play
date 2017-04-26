import Board from './board'
import CubeCoordinateMap from './cube-coordinate-map'

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
    let board = this.gameObjectFactory.create(Board, config.boardSize)

    let map = new CubeCoordinateMap()
    board.createChild(map.origin, getRandomCellConfig(config))

    for (let radius = 1; radius <= config.boardSize; radius++) {
      let ring = map.origin.getRing(radius)
      ring.forEach(function (coordinate) {
        board.createChild(coordinate, getRandomCellConfig(config))
      })
    }

    return board

    /**
     * @param {GameConfig} config
     * @return {string}
     */
    function getRandomCellConfig (config) {
      let randomIndex = Math.floor(Math.random() * config.cellConfigs.length)

      return config.cellConfigs[randomIndex]
    }
  }
}
