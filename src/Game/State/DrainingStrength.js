import State from './State'
import { coordinateDistance } from '../Cell/function/distance'

export default class DrainingStrength extends State {
  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(0)

    let originalNeighbors = cell.neighbors.slice()
    let mana = cell.drainStrength(3)
    originalNeighbors.forEach(function (cell) {
      mana += cell.drainStrength(1)
    })
    player.addMana(mana)

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return cell.unit === null &&
      coordinateDistance(this.mage.parent, cell) <= 3
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'This spell is used by a mage to gain mana for spell-casting.\n' +
      'Range: 3\n' +
      'It costs only an action point and can lower strength of target hex by 3 and all neighboring by 1, ' +
      'converting the total strength into mana.',
      'Beware of destroying hexes with low strength!'
    ]
  }
}
