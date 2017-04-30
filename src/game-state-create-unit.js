import GameState from './game-state'
import CellRange from './cell-range'
import NoUnitCellRangeFilter from './no-unit-cell-range-filter'
import WithUnitConfigCellRangeFilter from './with-unit-config-cell-range-filter'

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
