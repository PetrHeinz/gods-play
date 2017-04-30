export default class CellRange {
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
    return cell.parent.children
  }
}
