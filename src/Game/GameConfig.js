import CellConfig from './Cell/CellConfig'
import UnitConfig from './Unit/UnitConfig'
import NeighborRange from './Cell/Range/NeighborRange'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 5

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = ['#AA0000', '#0000AA', '#00AA00', '#AAAA00', '#00AAAA', '#AA00AA']

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕', new NeighborRange(1))

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      createCellConfig('brick', '♖', new NeighborRange(0)),
      createCellConfig('grass', '♘', new NeighborRange(2)),
      createCellConfig('tree', '♗', new NeighborRange(1)),
      createCellConfig('stone', '♜', new NeighborRange(0)),
      createCellConfig('sand', '♞', new NeighborRange(2)),
      createCellConfig('wheat', '♝', new NeighborRange(1)),
      createCellConfig('water')
    ]

    /**
     * @param {string} terrain
     * @param {string} [unitSymbol]
     * @param {Range} [range]
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
