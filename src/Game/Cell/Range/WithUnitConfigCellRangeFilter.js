import CellRangeFilter from './CellRangeFilter'

export default class WithUnitConfigCellRangeFilter extends CellRangeFilter {
  /**
   * @param {CellRange} range
   */
  constructor (range) {
    super(range, cell => cell.config.unitConfig !== null)
  }
}
