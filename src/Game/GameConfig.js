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
    this.playerColors = [0xAA0000, 0x0000AA, 0x00AA00, 0xAAAA00, 0x00AAAA, 0xAA00AA]

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕', new NeighborRange(1))

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      createCellConfig(0x66EE33, '♖', new NeighborRange(0)),
      createCellConfig(0x33EE66, '♜', new NeighborRange(0)),
      createCellConfig(0xEE3366, '♗', new NeighborRange(1)),
      createCellConfig(0xEE6633, '♝', new NeighborRange(1)),
      createCellConfig(0x3366EE, '♞', new NeighborRange(2)),
      createCellConfig(0x6633EE, '♘', new NeighborRange(2)),
      createCellConfig(0x666666)
    ]

    /**
     * @param {string} color
     * @param {string} [unitSymbol]
     * @param {Range} [moveRange]
     * @return {CellConfig}
     */
    function createCellConfig (color, unitSymbol, moveRange) {
      let unitConfig = null
      if (unitSymbol !== undefined) {
        unitConfig = new UnitConfig(unitSymbol, moveRange)
      }

      return new CellConfig(color, unitConfig)
    }
  }
}
