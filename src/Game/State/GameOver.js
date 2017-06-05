import State from './State'
import Action from './Action'

export default class GameOver extends State {
  /**
   * @param {Function} endGameCallback
   */
  constructor (endGameCallback) {
    super()

    /** @member {Function} */
    this.endGameCallback = endGameCallback
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return false
  }

  /**
   * @return {Action[]}
   */
  getActions () {
    return [
      new Action('GAME OVER', this.endGameCallback)
    ]
  }
}
