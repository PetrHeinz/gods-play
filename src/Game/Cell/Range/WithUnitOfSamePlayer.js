import Range from './Range'
import Exception from '../../../exceptions/Exception'

export default class WithUnitOfSamePlayer extends Range {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super()

    /** @var {Range} */
    this.range = range
  }

  /**
   * @param {Cell} cell
   * @return {Cell[]}
   */
  getCells (cell) {
    if (cell.unit === null) {
      throw new Exception('This Cell has no Unit - player cannot be determined')
    }

    return this.range.getCells(cell)
      .filter(target => target.unit !== null && target.unit.owner === cell.unit.owner)
  }
}
