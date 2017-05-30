import Range from './Range'
import { neighborCircle } from '../function/collection'

export default class NeighborRange extends Range {
  /**
   * @param {number} rangeRadius
   */
  constructor (rangeRadius) {
    super()

    /** @var {number} */
    this.rangeRadius = rangeRadius
  }

  /**
   * @param {Cell} cell
   * @return {Cell[]}
   */
  getCells (cell) {
    return neighborCircle(cell, this.rangeRadius)
  }
}
