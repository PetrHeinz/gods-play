import CellRangeFilter from './cell-range-filter'

export default class NoUnitCellRangeFilter extends CellRangeFilter {
  /**
   * @param {CellRange} range
   */
  constructor (range) {
    super(range, cell => cell.unit === null)
  }
}
