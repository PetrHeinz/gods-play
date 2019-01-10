import BoardGenerator from './Game/Board/BoardGenerator'
import Game from './Game/Game'
import Interface from './Interface/Interface'
import Events from './Events'
import GameObjectFactory from './Game/GameObjectFactory'
import Player from './Game/Player'
import GameConfig from './Game/GameConfig'
import { shuffle } from './function/array'
import { coordinateDistance } from './Game/Cell/function/distance'

export default class GodsPlay {
  /**
   * @param {Window} window
   */
  constructor (window) {
    /** @type {Window} */
    this.window = window

    /** @type {Events} */
    this.events = new Events()

    /** @type {GameObjectFactory} */
    this.gameObjectFactory = new GameObjectFactory(this.events)

    /** @type {BoardGenerator} */
    this.boardGenerator = new BoardGenerator(this.gameObjectFactory)

    /** @type {Game|null} */
    this.game = null

    /** @type {Interface|null} */
    this.interface = null
  }

  /**
   * @param {GameConfig} [config]
   */
  initialize (config = new GameConfig()) {
    let board = this.boardGenerator.generate(config)

    let shuffledCells = shuffle(board.children)
    shuffledCells.splice(0, config.boardSize).forEach(function (cell) {
      board.removeChild(cell)
    })

    shuffledCells = shuffledCells.filter(function (cell) {
      return cell.config.unitConfig !== null
    })

    let players = []
    let mageCells = pickFurthest(shuffledCells, config.playerCount)
    for (let i = 0; i < config.playerCount; i++) {
      let player = new Player('Player #' + (i + 1), config.playerColors[i])
      mageCells.pop().createMageChild(player)
      players.push(player)
    }

    this.game = new Game(board, players, this.events, () => this.window.location.reload())
    this.interface = new Interface(this.game, this.window)

    this.interface.initialize()

    /**
     * @param {Cell[]} cells
     * @param {number} cellNumber
     * @returns {Cell[]}
     */
    function pickFurthest (cells, cellNumber) {
      let furthestCells = cells.slice(0, cellNumber)
      let newCell, previousCell
      do {
        let furthestDistance = 0
        newCell = null
        previousCell = furthestCells.pop()
        cells.forEach(function (cell) {
          let distance = 0
          furthestCells.forEach(function (furthestCell) {
            distance += coordinateDistance(cell, furthestCell)
          })
          if (distance > furthestDistance || newCell === null) {
            newCell = cell
            furthestDistance = distance
          }
        })
        furthestCells.unshift(newCell)
      } while (newCell !== previousCell)

      return furthestCells
    }
  }
}
