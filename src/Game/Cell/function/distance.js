/**
 * @param {Cell} origin
 * @param {Cell} target
 * @return {number}
 */
export function coordinateDistance (origin, target) {
  return Math.max(
    Math.abs(origin.coordinate.x - target.coordinate.x),
    Math.abs(origin.coordinate.y - target.coordinate.y),
    Math.abs(origin.coordinate.z - target.coordinate.z)
  )
}
