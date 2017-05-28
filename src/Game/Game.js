import StateFactory from './State/StateFactory'
import StandingBy from './State/StandingBy'
import State from './State/State'
import Exception from '../exceptions/Exception'

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

    /** @type {StateFactory} */
    this.stateFactory = new StateFactory(this)

    /** @type {State} */
    this.state = this.stateFactory.create(StandingBy)
  }

  /**
   * @return {Player}
   */
  getPlayerOnTurn () {
    return this.players[this.playerTurn]
  }

  endTurn () {
    this.playerTurn = (this.playerTurn + 1) % this.players.length

    if (!this.getPlayerOnTurn().isActive()) {
      return this.endTurn()
    }

    this.board.getUnitsOwnedBy(this.getPlayerOnTurn())
      .forEach(cell => cell.refresh())

    this.changeState(this.stateFactory.create(StandingBy))

    this.events.trigger('turnEnded', {
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

    this.state.cellClick(cell)
  }

  /**
   * @param {State|Class} [state]
   * @param {...*} parameters
   */
  changeState (state, ...parameters) {
    if (!(state instanceof State)) {
      state = this.stateFactory.create(state, ...parameters)
    } else if (parameters.length > 0) {
      throw new Exception('Invalid arguments: Passing parameters is not possible when instance of State is passed.')
    }

    if (this.state !== state) {
      this.state = state

      this.events.trigger('gameStateChanged', {
        state: this.state
      })
    }
  }
}
