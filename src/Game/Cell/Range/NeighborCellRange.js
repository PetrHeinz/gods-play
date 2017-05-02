import CellRange from './CellRange'
import { difference, unique } from '../../../function/array'

export default class NeighborCellRange extends CellRange {
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
    let cells = [cell]
    let edge = [cell]

    for (let i = 0; i < this.rangeRadius; i++) {
      let neighbors = []
      edge.forEach(function (cell) {
        neighbors = neighbors.concat(cell.neighbors)
      })
      edge = difference(unique(neighbors), cells)
      cells = cells.concat(edge)
    }

    return unique(cells)
  }
}
