import CellConfig from './Cell/CellConfig'
import UnitConfig from './Unit/UnitConfig'
import MeleeAttack from './Unit/Action/MeleeAttack'
import RangedAttack from './Unit/Action/RangedAttack'
import Movement from './Unit/Action/Movement'

export default class GameConfig {
  constructor () {
    /** @type {number} */
    this.boardSize = 4

    /** @type {number} */
    this.playerCount = 2

    /** @type {string[]} */
    this.playerColors = [0xAA0000, 0x0000AA, 0x00AA00, 0xAAAA00, 0x00AAAA, 0xAA00AA]

    /** @type {UnitConfig} */
    this.mageConfig = new UnitConfig('Mage', '♛', 0, 10, 10, new Movement(), new RangedAttack())

    /** @type {CellConfig[]} */
    this.cellConfigs = [
      new CellConfig(0xEE3333, true, new UnitConfig('Trooper', '♟', 3, 12, 3, new Movement(), new MeleeAttack())),
      new CellConfig(0x33EE33, true, new UnitConfig('Keep', '♜', 4, 16, 4, new Movement(0), new RangedAttack(2))),
      new CellConfig(0x3333EE, true, new UnitConfig('Raider', '♞', 5, 6, 3, new Movement(2), new MeleeAttack(2))),
      new CellConfig(0x666666)
    ]
  }
}
