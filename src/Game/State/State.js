import Action from './Action'

export default class State {
  constructor () {
    /** @type {StateFactory|null} */
    this.factory = null

    /** @type {Game|null} */
    this.game = null
  }

  /**
   * @param {StateFactory} stateFactory
   * @param {Game} game
   */
  inject (stateFactory, game) {
    this.factory = stateFactory
    this.game = game
  }

  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    this.game.changeState()
  }

  /**
   * @return {Action[]}
   */
  getActions () {
    let self = this

    return [
      new Action('Cancel action', function () {
        self.game.changeState()
      })
    ]
  }
}