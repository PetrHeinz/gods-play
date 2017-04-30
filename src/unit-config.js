import NoUnitCellRangeFilter from './no-unit-cell-range-filter'

export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {CellRange} range
   */
  constructor (symbol, range) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {CellRange} */
    this.range = new NoUnitCellRangeFilter(range)
  }
}
