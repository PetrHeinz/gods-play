import { difference, unique } from './array-functions'

export default class CellRange {
  /**
   * @param {number} rangeRadius
   */
  constructor (rangeRadius) {
    /** @var {number} */
    this.rangeRadius = rangeRadius
  }

  /**
   * @param {Cell} origin
   * @param {Cell} destination
   * @return {Cell[]}
   */
  isInRange (origin, destination) {
    let cells = this.getCells(origin)

    return cells.indexOf(destination) > -1
  }

  /**
   * @param {Cell} cell
   * @return {Cell[]}
   */
  getCells (cell) {
    let cells = [cell]
    let edge = [cell]

    for (let i = 0; i < this.rangeRadius; i++) {
      let neighborhood = []
      edge.forEach(function (cell) {
        neighborhood = neighborhood.concat(cell.neighbors)
      })
      edge = difference(unique(neighborhood), cells)
      cells = cells.concat(edge)
    }

    return unique(cells)
  }
}
