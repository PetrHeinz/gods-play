import Filter from './Filter'
import { hasUnit } from '../function/predicate'
import { not } from '../../../function/predicate'

export default class WithoutUnit extends Filter {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super(range, not(hasUnit))
  }
}
