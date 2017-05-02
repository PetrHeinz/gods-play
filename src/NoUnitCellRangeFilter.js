import CellRangeFilter from './CellRangeFilter'

export default class NoUnitCellRangeFilter extends CellRangeFilter {
  /**
   * @param {CellRange} range
   */
  constructor (range) {
    super(range, cell => cell.unit === null)
  }
}
