import BoardGenerator from './board-generator'
import Game from './game'
import Renderer from './renderer'
import Events from './events'
import GameObjectFactory from './game-object-factory'
import Player from './player'
import GameConfig from './game-config'

export default class GodsPlay {
  /**
   * @param {HTMLDocument} document
   */
  constructor (document) {
    /** @type {HTMLDocument} */
    this.document = document

    /** @type {Events} */
    this.events = new Events()

    /** @type {GameObjectFactory} */
    this.gameObjectFactory = new GameObjectFactory(this.events)

    /** @type {BoardGenerator} */
    this.boardGenerator = new BoardGenerator(this.gameObjectFactory)

    /** @type {Game|null} */
    this.game = null

    /** @type {Renderer|null} */
    this.renderer = null
  }

  /**
   * @param {GameConfig} [config]
   */
  initialize (config) {
    if (config === undefined) {
      config = new GameConfig()
    }
    let board = this.boardGenerator.generateBoard(config.boardSize)

    let shuffledCells = board.getShuffledChildren().slice()
    shuffledCells.splice(0, config.boardSize).forEach(function (cell) {
      board.removeChild(cell)
    })

    let players = []
    for (let i = 0; i < config.playerCount; i++) {
      let player = new Player('Player #' + (i + 1), config.playerColors[i])

      shuffledCells.pop().createChild(player)
      players.push(player)
    }

    this.game = new Game(board, players, this.events)
    this.renderer = new Renderer(this.game)

    this.document.body.appendChild(this.renderer.getView())

    this.renderer.createBoard()
  }
}
