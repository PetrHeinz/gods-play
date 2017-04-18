export default class CubeCoordinate {
  /**
   * @param {CubeCoordinateMap} map
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor (map, x, y, z) {
    /** @type {CubeCoordinateMap} */
    this.map = map

    /** @type {number} */
    this.x = x

    /** @type {number} */
    this.y = y

    /** @type {number} */
    this.z = z
  }

  /**
   * @param {CubeCoordinate} coordinate
   * @return {CubeCoordinate}
   */
  add (coordinate) {
    return this.map.get(
      this.x + coordinate.x,
      this.y + coordinate.y,
      this.z + coordinate.z
    )
  }

  /**
   * @param {number} factor
   * @return {CubeCoordinate}
   */
  scale (factor) {
    return this.map.get(
      this.x * factor,
      this.y * factor,
      this.z * factor
    )
  }

  /**
   * @param {number} radius
   * @return {[CubeCoordinate]}
   */
  getRing (radius) {
    let ring = []
    let coordinate = this.add(this.map.directions[4].scale(radius))
    this.map.directions.forEach(function (directionCoordinate) {
      for (let j = 0; j < radius; j++) {
        ring.push(coordinate)
        coordinate = coordinate.add(directionCoordinate)
      }
    })

    return ring
  }
}
