import CellConfig from './cell-config'
import UnitConfig from './unit-config'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 5

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = ['#AA0000', '#0000AA', '#00AA00', '#AAAA00', '#00AAAA', '#AA00AA']

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕')

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      this.createCellConfig('brick', '♖'),
      this.createCellConfig('grass', '♘'),
      this.createCellConfig('tree', '♗'),
      this.createCellConfig('stone', '♜'),
      this.createCellConfig('sand', '♞'),
      this.createCellConfig('wheat', '♝'),
      this.createCellConfig('water', null)
    ]
  }

  /**
   * @param {string} terrain
   * @param {string} [unitSymbol]
   * @return {CellConfig}
   */
  createCellConfig (terrain, unitSymbol) {
    let unitConfig = null
    if (unitSymbol !== undefined) {
      unitConfig = new UnitConfig(unitSymbol)
    }

    return new CellConfig(terrain, unitConfig, this.mageConfig)
  }
}
