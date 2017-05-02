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
      createCellConfig('#66EE33', '♖', new NeighborRange(0)),
      createCellConfig('#33EE66', '♜', new NeighborRange(0)),
      createCellConfig('#EE3366', '♗', new NeighborRange(1)),
      createCellConfig('#EE6633', '♝', new NeighborRange(1)),
      createCellConfig('#3366EE', '♞', new NeighborRange(2)),
      createCellConfig('#6633EE', '♘', new NeighborRange(2)),
      createCellConfig('#666666')
    ]

    /**
     * @param {string} color
     * @param {string} [unitSymbol]
     * @param {Range} [range]
     * @return {CellConfig}
     */
    function createCellConfig (color, unitSymbol, range) {
      let unitConfig = null
      if (unitSymbol !== undefined) {
        unitConfig = new UnitConfig(unitSymbol, range)
      }

      return new CellConfig(color, unitConfig)
    }
  }
}
