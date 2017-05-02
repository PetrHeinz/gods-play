import GameState from './GameState'
import CellRange from '../Cell/Range/CellRange'
import NoUnitCellRangeFilter from '../Cell/Range/NoUnitCellRangeFilter'
import WithUnitConfigCellRangeFilter from '../Cell/Range/WithUnitConfigCellRangeFilter'

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
