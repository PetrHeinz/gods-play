import State from './State'

export default class Casting extends State {
  /** @param {Range} range */
  constructor (range) {
    super()

    /** @type {Range} */
    this.range = range
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    let playerOnTurn = this.game.getPlayerOnTurn()
    let mageCell = playerOnTurn.mage.parent

    return mageCell !== null ? this.range.isInRange(cell, mageCell) : false
  }
}
