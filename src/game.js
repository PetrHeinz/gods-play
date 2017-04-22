import GameStateFactory from './game-state-factory'
import GameStateStandby from './game-state-standby'
import GameState from './game-state'
import Exception from './exception'

export default class Game {
  /**
   * @param {Board} board
   * @param {Player[]} players
   * @param {Events} events
   */
  constructor (board, players, events) {
    /** @type {Board} */
    this.board = board

    /** @type {Player[]} */
    this.players = players

    /** @type {Events} */
    this.events = events

    /** @type {number} */
    this.playerTurn = 0

    /** @type {GameStateFactory} */
    this.gameStateFactory = new GameStateFactory(this)

    /** @type {GameState} */
    this.gameState = this.gameStateFactory.create(GameStateStandby)
  }

  /**
   * @return {Player}
   */
  getPlayerOnTurn () {
    return this.players[this.playerTurn]
  }

  endTurn () {
    this.playerTurn = (this.playerTurn + 1) % this.players.length

    this.changeGameState(this.gameStateFactory.create(GameStateStandby))

    this.events.trigger('endTurn', {
      playerOnTurn: this.getPlayerOnTurn()
    })
  }

  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    if (!this.board.hasChild(cell)) {
      throw new Exception('Clicked Cell is not registered in the Game')
    }

    this.gameState.cellClick(cell)
  }

  /**
   * @param {GameState|Class} [gameState]
   * @param {...*} parameters
   */
  changeGameState (gameState, ...parameters) {
    if (!(gameState instanceof GameState)) {
      gameState = this.gameStateFactory.create(gameState, ...parameters)
    } else if (parameters.length > 0) {
      throw new Exception('Invalid arguments: Passing parameters is not possible when instance of GameState is passed.')
    }

    if (this.gameState !== gameState) {
      this.gameState = gameState

      this.events.trigger('newGameState', {
        gameState: this.gameState
      })
    }
  }
}
