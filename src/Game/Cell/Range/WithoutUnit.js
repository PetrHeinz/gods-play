import Filter from './Filter'

export default class WithoutUnit extends Filter {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super(range, cell => cell.unit === null)
  }
}
