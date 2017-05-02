import CubeCoordinate from './CubeCoordinate'
import HashMap from 'hashmap'

export default class CubeCoordinateMap {
  constructor () {
    /** @type {HashMap} */
    this.hashMap = new HashMap()

    /** @type {CubeCoordinate} */
    this.origin = this.get(0, 0, 0)

    /** @type {CubeCoordinate[]} */
    this.directions = [
      this.get(1, 0, -1),
      this.get(1, -1, 0),
      this.get(0, -1, 1),
      this.get(-1, 0, 1),
      this.get(-1, 1, 0),
      this.get(0, 1, -1)
    ]
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {CubeCoordinate}
   */
  get (x, y, z) {
    let coordinate = this.hashMap.get([x, y, z])
    if (coordinate === undefined) {
      coordinate = new CubeCoordinate(this, x, y, z)
      this.hashMap.set([x, y, z], coordinate)
    }

    return coordinate
  }
}
