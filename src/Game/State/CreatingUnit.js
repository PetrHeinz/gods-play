import Casting from './Casting'
import DistanceRange from '../Cell/Range/DistanceRange'
import Filter from '../Cell/Range/Filter'

export default class CreatingUnit extends Casting {
  constructor () {
    let filter = cell => {
      if (cell.unit === null) {
        return cell.config.unitConfig !== null
      } else {
        let notMaxHealth = cell.unit.health < cell.unit.config.maxHealth
        let unitOwnedByPlayer = cell.unit.owner === this.game.getPlayerOnTurn()

        return cell.config.unitConfig === cell.unit.config && unitOwnedByPlayer && notMaxHealth
      }
    }
    super(new Filter(new DistanceRange(2), filter))
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(cell.config.unitConfig.manaCost)

    if (cell.unit === null) {
      cell.createChild(player)
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
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && cell.config.unitConfig.manaCost <= player.mana
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'This spell is used by a mage to build an army, one unit at a time.',
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
