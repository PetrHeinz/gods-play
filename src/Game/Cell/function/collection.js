import { difference, unique } from '../../../function/array'
import CellNotFoundException from '../../../exceptions/CellNotFoundException'

/**
 * @param {Cell} center
 * @param {number} radius
 * @return {Cell[]}
 */
export function neighborCircle (center, radius) {
  let cells = [center]
  let edge = [center]

  for (let i = 0; i < radius; i++) {
    let neighbors = []
    edge.forEach(function (cell) {
      neighbors = neighbors.concat(cell.neighbors)
    })
    edge = difference(unique(neighbors), cells)
    cells = cells.concat(edge)
  }

  return unique(cells)
}

/**
 * @param {Cell} center
 * @param {number} radius
 * @return {Cell[]}
 */
export function coordinateCircle (center, radius) {
  let cells = [center]
  let board = center.parent

  for (let i = 0; i < radius; i++) {
    center.coordinate.getRing(i + 1)
      .forEach(function (coordinate) {
        try {
          cells.push(board.getCellByCoordinate(coordinate))
        } catch (e) {
          if (!(e instanceof CellNotFoundException)) {
            throw e
          }
        }
      })
  }

  return cells
}
