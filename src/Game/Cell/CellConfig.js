export default class CellConfig {
  /**
   * @param {string} terrain
   * @param {UnitConfig|null} unitConfig
   */
  constructor (terrain, unitConfig = null) {
    /** @type {string} */
    this.terrain = terrain

    /** @type {UnitConfig|null} */
    this.unitConfig = unitConfig
  }
}
