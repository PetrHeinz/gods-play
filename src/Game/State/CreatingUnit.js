import State from './State'
import Range from '../Cell/Range/Range'
import WithoutUnit from '../Cell/Range/WithoutUnit'
import WithUnitConfig from '../Cell/Range/WithUnitConfig'

export default class CreatingUnit extends State {
  constructor () {
    super()

    /** @type {Range} */
    this.range = new WithUnitConfig(new WithoutUnit(new Range()))
  }

  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    if (this.range.isInRange(cell)) {
      cell.createChild(this.game.getPlayerOnTurn())

      super.cellClick(cell)
    }
  }
}
