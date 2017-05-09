import CellConfig from './Cell/CellConfig'
import UnitConfig from './Unit/UnitConfig'
import NeighborRange from './Cell/Range/NeighborRange'
import MeleeAttack from './Unit/Attack/MeleeAttack'
import RangedAttack from './Unit/Attack/RangedAttack'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 5

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = [0xAA0000, 0x0000AA, 0x00AA00, 0xAAAA00, 0x00AAAA, 0xAA00AA]

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('♕', new NeighborRange(1), new RangedAttack())

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      new CellConfig(0x66EE33, new UnitConfig('♖', new NeighborRange(0), new RangedAttack(2))),
      new CellConfig(0x33EE66, new UnitConfig('♜', new NeighborRange(0), new RangedAttack(2))),
      new CellConfig(0xEE3366, new UnitConfig('♗', new NeighborRange(1), new MeleeAttack())),
      new CellConfig(0xEE6633, new UnitConfig('♝', new NeighborRange(1), new MeleeAttack())),
      new CellConfig(0x3366EE, new UnitConfig('♞', new NeighborRange(2), new MeleeAttack(2))),
      new CellConfig(0x6633EE, new UnitConfig('♘', new NeighborRange(2), new MeleeAttack(2))),
      new CellConfig(0x666666, null)
    ]
  }
}
