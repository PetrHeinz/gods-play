export default class CellConfig {
  /**
   * @param {string} color
   * @param {boolean} destructible
   * @param {UnitConfig|null} unitConfig
   */
  constructor (color, destructible = false, unitConfig = null) {
    /** @type {string} */
    this.color = color

    /** @type {boolean} */
    this.destructible = destructible

    /** @type {UnitConfig|null} */
    this.unitConfig = unitConfig
  }
}
