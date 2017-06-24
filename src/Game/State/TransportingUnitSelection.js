import State from './State'
import TransportingUnit from './TransportingUnit'
import { neighborDistance } from '../Cell/function/distance'

export default class TransportingUnitSelection extends State {
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
    return cell.unit !== null &&
      this.player.mana >= TransportingUnit.getBasicManaCost(cell.unit) &&
      cell.unit.owner === this.player &&
      neighborDistance(this.mage.parent, cell) <= 1
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
