export default class CellConfig {
  /**
   * @param {string} terrain
   * @param {UnitConfig|null} unitConfig
   * @param {UnitConfig} mageConfig
   */
  constructor (terrain, unitConfig, mageConfig) {
    /** @type {string} */
    this.terrain = terrain

    /** @type {UnitConfig|null} */
    this.unitConfig = unitConfig

    /** @type {UnitConfig} */
    this.mageConfig = mageConfig
  }
}
