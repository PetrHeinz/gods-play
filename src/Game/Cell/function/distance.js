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
 * @return {boolean}
 */
export function isOnSameBoard (origin, target) {
  return origin.parent.children.indexOf(target) > -1
}
