export default class UnitConfig {
  /**
   * @param {string} symbol
   * @param {number} manaCost
   * @param {Movement} movement
   * @param {Attack} attack
   */
  constructor (symbol, manaCost, movement, attack) {
    /** @type {string} */
    this.symbol = symbol

    /** @type {number} */
    this.manaCost = manaCost

    /** @type {Movement} */
    this.movement = movement

    /** @type {Attack} */
    this.attack = attack
  }
}
