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

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      new CellConfig('brick', new UnitConfig('♖')),
      new CellConfig('grass', new UnitConfig('♘')),
      new CellConfig('tree', new UnitConfig('♗')),
      new CellConfig('stone', new UnitConfig('♜')),
      new CellConfig('sand', new UnitConfig('♞')),
      new CellConfig('wheat', new UnitConfig('♝')),
      new CellConfig('water', null)
    ]
  }
}
