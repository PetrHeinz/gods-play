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

    cell.drainStrength(2)
    originalNeighbors.forEach(cell => cell.drainStrength(1))

    super.cellClickAction(cell)
  }
}
