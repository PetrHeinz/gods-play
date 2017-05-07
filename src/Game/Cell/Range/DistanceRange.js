import Range from './Range'
import CellNotFoundException from '../../../exceptions/CellNotFoundException'

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
    let cells = [cell]

    for (let i = 0; i < this.rangeRadius; i++) {
      cell.coordinate.getRing(i + 1)
        .forEach(function (coordinate) {
          try {
            cells.push(cell.parent.getCellByCoordinate(coordinate))
          } catch (e) {
            if (!(e instanceof CellNotFoundException)) {
              throw e
            }
          }
        })
    }

    return cells
  }
}
