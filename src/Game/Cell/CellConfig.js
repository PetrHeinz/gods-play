export default class CellConfig {
  /**
   * @param {string} color
   * @param {UnitConfig|null} unitConfig
   */
  constructor (color, unitConfig = null) {
    /** @type {string} */
    this.color = color

    /** @type {UnitConfig|null} */
    this.unitConfig = unitConfig
  }
}
