import Casting from './Casting'
import DistanceRange from '../Cell/Range/DistanceRange'

export default class DrainingStrength extends Casting {
  constructor () {
    super(new DistanceRange(3))
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let originalNeighbors = cell.neighbors.slice()

    let mana = cell.drainStrength(2)
    originalNeighbors.forEach(function (cell) {
      mana += cell.drainStrength(1)
    })

    this.game.getPlayerOnTurn().addMana(mana)

    super.cellClickAction(cell)
  }
}
