export default class Range {
  /**
   * @param {Cell} destination
   * @param {Cell} [origin]
   * @return {Cell[]}
   */
  isInRange (destination, origin = destination) {
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
