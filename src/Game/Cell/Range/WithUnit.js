import Filter from './Filter'

export default class WithUnit extends Filter {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super(range, cell => cell.unit !== null)
  }
}
