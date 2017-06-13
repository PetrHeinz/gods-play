import Casting from './Casting'
import Range from '../Cell/Range/Range'
import WithoutUnit from '../Cell/Range/WithoutUnit'
import { coordinateDistance } from '../Cell/function/distance'

export default class TransportingUnit extends Casting {
  /**
   * @param {Unit} unit
   */
  constructor (unit) {
    super(new WithoutUnit(new Range()))

    /** @member {Unit} */
    this.unit = unit
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    let player = this.game.getPlayerOnTurn()
    player.castSpell(this.getManaCost(cell))

    let previousParent = this.unit.parent

    this.unit.setParent(cell)

    this.unit.tired = true

    this.game.events.trigger('unitMoved', {
      unit: this.unit,
      fromCell: previousParent
    })

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    let player = this.game.getPlayerOnTurn()

    return super.canClickCell(cell) && player.mana >= this.getManaCost(cell)
  }

  /**
   * @return {string}
   */
  getInfoText () {
    let basicManaCost = TransportingUnit.getBasicManaCost(this.unit)

    return 'Select target hex to transport your ' + this.unit.config.name + '.\n' +
      'Range: 3\n' +
      'Mana-cost: ' + basicManaCost + '\n' +
      'Range can be increased by 1 for additional ' + basicManaCost + ' mana.'
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
