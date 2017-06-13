import Casting from './Casting'
import NeighborRange from '../Cell/Range/NeighborRange'
import WithUnitOfSamePlayer from '../Cell/Range/WithUnitOfSamePlayer'
import TransportingUnit from './TransportingUnit'

export default class TransportingUnitSelection extends Casting {
  constructor () {
    super(new WithUnitOfSamePlayer(new NeighborRange(1)))
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let unit = cell.unit

    this.game.changeState(TransportingUnit, unit)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && player.mana >= TransportingUnit.getBasicManaCost(cell.unit)
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'By this spell a mage can move himself or a neighboring unit over a distance.',
      'Mana-cost: 5\n' +
      '(or 10 for mage or keep)',
      'Unit gets tired by the transport but does not have to be rested.\n' +
      'You can, for instance, transport unit that has already attacked.'
    ]
  }
}
