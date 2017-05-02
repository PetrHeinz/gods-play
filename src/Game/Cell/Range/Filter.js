import Range from './Range'

export default class Filter extends Range {
  /**
   * @param {Range} range
   * @param {function} filter
   */
  constructor (range, filter) {
    super()

    /** @var {Range} */
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
