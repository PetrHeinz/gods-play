import CellConfig from './cell-config'
import UnitConfig from './unit-config'
import CellRange from './cell-range'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 5

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = ['#AA0000', '#0000AA', '#00AA00', '#AAAA00', '#00AAAA', '#AA00AA']

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕', new CellRange(1))

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      this.createCellConfig('brick', '♖', new CellRange(0)),
      this.createCellConfig('grass', '♘', new CellRange(2)),
      this.createCellConfig('tree', '♗', new CellRange(1)),
      this.createCellConfig('stone', '♜', new CellRange(0)),
      this.createCellConfig('sand', '♞', new CellRange(2)),
      this.createCellConfig('wheat', '♝', new CellRange(1)),
      this.createCellConfig('water')
    ]
  }

  /**
   * @param {string} terrain
   * @param {string} [unitSymbol]
   * @param {CellRange} [range]
   * @return {CellConfig}
   */
  createCellConfig (terrain, unitSymbol, range) {
    let unitConfig = null
    if (unitSymbol !== undefined) {
      unitConfig = new UnitConfig(unitSymbol, range)
    }

    return new CellConfig(terrain, unitConfig)
  }
}
