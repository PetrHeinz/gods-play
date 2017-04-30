import CellRange from './cell-range'

export default class NoUnitCellRangeFilter extends CellRange {
  /**
   * @param {CellRange} range
   */
  constructor (range) {
    super()

    /** @var {CellRange} */
    this.range = range
  }

  /**
   * @param {Cell} cell
   * @return {Cell[]}
   */
  getCells (cell) {
    return this.range.getCells(cell)
      .filter(cell => cell.unit === null)
  }
}
