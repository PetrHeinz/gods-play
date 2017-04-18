import Board from './board'
import Cell from './cell'
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
   * @param {number} boardSize
   * @return {Board}
   */
  generateBoard (boardSize) {
    let board = this.gameObjectFactory.create(Board, boardSize)

    let map = new CubeCoordinateMap()
    board.createChild(map.origin, getRandomCellType())

    for (let radius = 1; radius <= boardSize; radius++) {
      let ring = map.origin.getRing(radius)
      ring.forEach(function (coordinate) {
        board.createChild(coordinate, getRandomCellType())
      })
    }

    return board

    function getRandomCellType () {
      let randomIndex = Math.floor(Math.random() * Cell.getTypes().length)

      return Cell.getTypes()[randomIndex]
    }
  }
}
