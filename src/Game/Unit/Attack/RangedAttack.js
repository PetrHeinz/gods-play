import Attack from './Attack'
import DistanceRange from '../../Cell/Range/DistanceRange'

export default class RangedAttack extends Attack {
  /**
   * @param {number} [rangeRadius]
   */
  constructor (rangeRadius = 1) {
    let range = new DistanceRange(rangeRadius)

    super(range)
  }
}
