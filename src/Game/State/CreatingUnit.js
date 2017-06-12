import Casting from './Casting'
import DistanceRange from '../Cell/Range/DistanceRange'
import WithoutUnit from '../Cell/Range/WithoutUnit'
import WithUnitConfig from '../Cell/Range/WithUnitConfig'

export default class CreatingUnit extends Casting {
  constructor () {
    super(new WithUnitConfig(new WithoutUnit(new DistanceRange(2))))
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(cell.config.unitConfig.manaCost)

    cell.createChild(player)

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && cell.config.unitConfig.manaCost <= player.mana
  }

  /**
   * @return {string}
   */
  getInfoText () {
    return 'This spell is used by a mage to build an army, one unit at a time.\n' +
      'Range: 2\n' +
      'Unit that can be created depends on the hex type:\n' +
      'Red: Trooper (3 mana)\n' +
      ' - cheap melee unit\n' +
      'Green: Keep (4 mana)\n' +
      ' - immovable ranged unit\n' +
      'Blue: Raider (5 mana)\n' +
      ' - melee unit with longer range'
  }
}
