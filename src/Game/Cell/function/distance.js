/**
 * @param {Cell} origin
 * @param {Cell} target
 * @return {number}
 */
export function coordinateDistance (origin, target) {
  if (!isOnSameBoard(origin, target)) {
    return Infinity
  }

  return Math.max(
    Math.abs(origin.coordinate.x - target.coordinate.x),
    Math.abs(origin.coordinate.y - target.coordinate.y),
    Math.abs(origin.coordinate.z - target.coordinate.z)
  )
}

/**
 * @param {Cell} origin
 * @param {Cell} target
 * @return {number}
 */
export function neighborDistance (origin, target) {
  let searchedCells = new Set()
  let edge = new Set([origin])

  for (let distance = 0; edge.size > 0; distance++) {
    if (edge.has(target)) {
      return distance
    }

    let newEdge = new Set()
    edge.forEach(edgeCell => {
      edgeCell.neighbors.forEach(neighbor => {
        if (!searchedCells.has(neighbor)) {
          newEdge.add(neighbor)
          searchedCells.add(neighbor)
        }
      })
    })
    edge = newEdge
  }

  return Infinity
}

/**
 * @param {Cell} origin
 * @param {Cell} target
 * @return {boolean}
 */
export function isOnSameBoard (origin, target) {
  return origin.parent.children.indexOf(target) > -1
}
