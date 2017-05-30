import Filter from './Filter'
import { hasUnitConfig } from '../function/predicate'

export default class WithUnitConfig extends Filter {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super(range, hasUnitConfig)
  }
}
