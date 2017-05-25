import State from './State'
import DistanceRange from '../Cell/Range/DistanceRange'

export default class DrainingStrength extends State {
  constructor () {
    super()

    /** @type {Range} */
    this.range = new DistanceRange(3)
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let originalNeighbors = cell.neighbors.slice()

    cell.drainStrength(2)
    originalNeighbors.forEach(cell => cell.drainStrength(1))

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {bool}
   */
  canClickCell (cell) {
    let playerOnTurn = this.game.getPlayerOnTurn()
    let mageCell = playerOnTurn.mage.parent

    return mageCell !== null ? this.range.isInRange(cell, mageCell) : false
  }
}
