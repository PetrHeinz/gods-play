import GameState from './game-state'
import Exception from './exception'
import GameStateStandby from './game-state-standby'
import { typename } from './function/type'

export default class GameStateFactory {
  /**
   * @param {Game} game
   */
  constructor (game) {
    /** @type {Game} */
    this.game = game
  }

  /**
   * @param {Class} [GameStateClass]
   * @param {...*} parameters
   * @return {GameState}
   */
  create (GameStateClass = GameStateStandby, ...parameters) {
    let gameState = new GameStateClass(...parameters)
    if (!(gameState instanceof GameState)) {
      throw new Exception('Class must be descendant of GameState, ' + typename(gameState) + ' passed')
    }
    gameState.inject(this, this.game)

    return gameState
  }
}
