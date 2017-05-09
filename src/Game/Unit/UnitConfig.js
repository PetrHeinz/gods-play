export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {Movement} movement
   * @param {Attack} attack
   */
  constructor (symbol, movement, attack) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {Movement} */
    this.movement = movement

    /** @type {Attack} */
    this.attack = attack
  }
}
