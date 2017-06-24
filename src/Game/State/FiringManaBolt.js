import State from './State'
import { coordinateDistance } from '../Cell/function/distance'

export default class FiringManaBolt extends State {
  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(1)

    cell.unit.inflictDamage(1)

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return cell.unit !== null &&
      this.player.mana >= 1 &&
      cell.unit.owner !== this.player &&
      coordinateDistance(this.mage.parent, cell) <= 5
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'Mana bolt is a weak but long-range offensive spell.',
      'Range: 5',
      'Damage: 1'
    ]
  }
}
