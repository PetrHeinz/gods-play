import GameState from './game-state'
import Exception from './exception'

export default class GameStateFactory {
  /**
   * @param {Game} game
   */
  constructor (game) {
    /** @type {Game} */
    this.game = game
  }

  /**
   * @param {Class} GameStateClass
   * @param {...*} parameters
   * @return {GameState}
   */
  create (GameStateClass, ...parameters) {
    let gameState = new GameStateClass(...parameters)
    if (!(gameState instanceof GameState)) {
      throw new Exception('Class must be descendant of GameObject, ' + typeof GameState + ' passed')
    }
    gameState.inject(this, this.game)

    return gameState
  }
}
