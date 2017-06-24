import State from './State'
import { coordinateDistance } from '../Cell/function/distance'

export default class TransportingUnit extends State {
  /**
   * @param {Unit} unit
   */
  constructor (unit) {
    super()

    /** @member {Unit} */
    this.unit = unit
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(this.getManaCost(cell))

    this.unit.setParent(cell)
    this.unit.tired = true

    this.game.events.trigger('unitMoved', {
      unit: this.unit
    })

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return cell.unit === null &&
      this.player.mana >= this.getManaCost(cell)
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    let basicManaCost = TransportingUnit.getBasicManaCost(this.unit)

    return [
      'Select target hex to transport your ' + this.unit.config.name + '.',
      'Range: 3\n' +
      'Mana-cost: ' + basicManaCost,
      'Range can be increased by 1 for additional ' + basicManaCost + ' mana.'
    ]
  }

  /**
   * @param {Cell} cell
   * @return {number}
   */
  getManaCost (cell) {
    let distance = coordinateDistance(this.unit.parent, cell)
    let distanceOverLimit = Math.max(0, distance - 3)

    return TransportingUnit.getBasicManaCost(this.unit) * (1 + distanceOverLimit)
  }

  /**
   * @param {Unit} unit
   * @return {number}
   */
  static getBasicManaCost (unit) {
    switch (unit.config.name) {
      case 'Mage':
      case 'Keep':
        return 10
      default:
        return 5
    }
  }
}
