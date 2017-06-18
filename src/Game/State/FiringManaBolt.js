import Casting from './Casting'
import DistanceRange from '../Cell/Range/DistanceRange'
import WithUnitOfOtherPlayer from '../Cell/Range/WithUnitOfOtherPlayer'

export default class FiringManaBolt extends Casting {
  constructor () {
    super(new WithUnitOfOtherPlayer(new DistanceRange(5)))
  }

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
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && player.mana >= 1
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
