import State from './State'
import { coordinateDistance } from '../Cell/function/distance'

export default class CreatingUnit extends State {
  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    this.player.castSpell(cell.config.unitConfig.manaCost)

    cell.drainStrength(1)
    if (cell.unit === null) {
      cell.createChild(this.player)
    } else {
      cell.unit.strengthen()
    }

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return cell.config.unitConfig !== null &&
      this.player.mana >= cell.config.unitConfig.manaCost &&
      cell.strength > 1 &&
      (cell.unit === null || (cell.unit.owner === this.player && cell.unit.health < cell.unit.config.maxHealth)) &&
      coordinateDistance(this.mage.parent, cell) <= 2
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'This spell is used by a mage to build an army, one unit at a time. Drains 1 strength from the target hex.',
      'Range: 2',
      'Unit that can be created depends on the hex type:',
      'Red: Trooper (3 mana)\n' +
      ' - cheap melee unit',
      'Green: Keep (4 mana)\n' +
      ' - immovable ranged unit',
      'Blue: Raider (5 mana)\n' +
      ' - melee unit with longer range',
      'This spell can also strengthen an already existing unit if its standing on a matching hex.'
    ]
  }
}
