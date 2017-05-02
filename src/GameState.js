import MenuItem from './MenuItem'

export default class GameState {
  constructor () {
    /** @type {GameStateFactory|null} */
    this.factory = null

    /** @type {Game|null} */
    this.game = null
  }

  /**
   * @param {GameStateFactory} gameStateFactory
   * @param {Game} game
   */
  inject (gameStateFactory, game) {
    this.factory = gameStateFactory
    this.game = game
  }

  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    this.game.changeGameState()
  }

  /**
   * @return {MenuItem[]}
   */
  getMenuItems () {
    let self = this

    return [
      new MenuItem('Cancel action', function () {
        self.game.changeGameState()
      })
    ]
  }
}
