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
   * @return {bool}
   */
  canClickCell (cell) {
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && cell.config.unitConfig.manaCost <= player.mana
  }
}
