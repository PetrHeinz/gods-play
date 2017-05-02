import GameState from './GameState'
import Exception from './Exception'
import GameStateStandby from './GameStateStandby'
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
