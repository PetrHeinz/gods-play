import Filter from './Filter'

export default class WithUnitConfig extends Filter {
  /**
   * @param {Range} range
   */
  constructor (range) {
    super(range, cell => cell.config.unitConfig !== null)
  }
}
