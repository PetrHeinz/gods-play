import Action from './Action'
import InaccessibleMageException from '../../exceptions/InaccessibleMageException'

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
    if (this.canClickCell(cell)) {
      this.cellClickAction(cell)
    }
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return true
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    this.game.changeState()
  }

  rightClickAction () {
    this.game.changeState()
  }

  /**
   * @return {Action[]}
   */
  getActions () {
    return [
      new Action('Cancel action', () => this.game.changeState())
    ]
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return []
  }

  /**
   * @return {Player}
   */
  get player () {
    return this.game.getPlayerOnTurn()
  }

  /**
   * @return {Mage}
   */
  get mage () {
    if (this.player.mage === null) {
      throw new InaccessibleMageException()
    }

    return this.player.mage
  }
}
