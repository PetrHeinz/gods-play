import CellRange from './CellRange'

export default class CellRangeFilter extends CellRange {
  /**
   * @param {CellRange} range
   * @param {function} filter
   */
  constructor (range, filter) {
    super()

    /** @var {CellRange} */
    this.range = range

    /** @var {function} */
    this.filter = filter
  }

  /**
   * @param {Cell} cell
   * @return {Cell[]}
   */
  getCells (cell) {
    return this.range.getCells(cell)
      .filter(this.filter)
  }
}
