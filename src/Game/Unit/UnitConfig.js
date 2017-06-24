export default class UnitConfig {
  /**
   * @param {string} name
   * @param {string} symbol
   * @param {number} manaCost
   * @param {number} maxHealth
   * @param {number} healthIncrease
   * @param {UnitAction} movement
   * @param {UnitAction} attack
   */
  constructor (name, symbol, manaCost, maxHealth, healthIncrease, movement, attack) {
    /** @type {string} */
    this.name = name

    /** @type {string} */
    this.symbol = symbol

    /** @type {number} */
    this.manaCost = manaCost

    /** @type {number} */
    this.maxHealth = maxHealth

    /** @type {number} */
    this.healthIncrease = healthIncrease

    /** @type {UnitAction} */
    this.movement = movement

    /** @type {UnitAction} */
    this.attack = attack
  }
}
