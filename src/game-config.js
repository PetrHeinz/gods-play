import CellConfig from './cell-config'
import UnitConfig from './unit-config'
import NeighborCellRange from './neighbor-cell-range'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 5

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = ['#AA0000', '#0000AA', '#00AA00', '#AAAA00', '#00AAAA', '#AA00AA']

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕', new NeighborCellRange(1))

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      createCellConfig('brick', '♖', new NeighborCellRange(0)),
      createCellConfig('grass', '♘', new NeighborCellRange(2)),
      createCellConfig('tree', '♗', new NeighborCellRange(1)),
      createCellConfig('stone', '♜', new NeighborCellRange(0)),
      createCellConfig('sand', '♞', new NeighborCellRange(2)),
      createCellConfig('wheat', '♝', new NeighborCellRange(1)),
      createCellConfig('water')
    ]

    /**
     * @param {string} terrain
     * @param {string} [unitSymbol]
     * @param {CellRange} [range]
     * @return {CellConfig}
     */
    function createCellConfig (terrain, unitSymbol, range) {
      let unitConfig = null
      if (unitSymbol !== undefined) {
        unitConfig = new UnitConfig(unitSymbol, range)
      }

      return new CellConfig(terrain, unitConfig)
    }
  }
}
