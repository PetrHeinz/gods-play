import MenuItem from './menu-item'

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
   * @return {GameState}
   */
  cellClick (cell) {
    return this
  }

  /**
   * @return {MenuItem[]}
   */
  getMenuItems () {
    let self = this

    return [
      new MenuItem('End turn', function () {
        self.game.endTurn()
      })
    ]
  }
}
