import Range from './Range'
import { coordinateCircle } from '../function/collection'

export default class DistanceRange extends Range {
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
    return coordinateCircle(cell, this.rangeRadius)
  }
}
