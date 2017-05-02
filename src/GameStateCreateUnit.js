import GameState from './GameState'
import CellRange from './CellRange'
import NoUnitCellRangeFilter from './NoUnitCellRangeFilter'
import WithUnitConfigCellRangeFilter from './WithUnitConfigCellRangeFilter'

export default class GameStateCreateUnit extends GameState {
  constructor () {
    super()

    /** @type {NoUnitCellRangeFilter} */
    this.range = new WithUnitConfigCellRangeFilter(new NoUnitCellRangeFilter(new CellRange()))
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
