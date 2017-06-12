import State from './State'

export default class UnitSelected extends State {
  /**
   * @param {Unit} unit
   */
  constructor (unit) {
    super()

    /** @type {Unit} */
    this.unit = unit
  }

  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    if (this.unit.isInMoveRange(cell)) {
      this.unit.moveTo(cell)
    } else if (this.unit.isInAttackRange(cell)) {
      this.unit.attackOn(cell)
    }

    super.cellClickAction(cell)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    return this.unit.isInMoveRange(cell) || this.unit.isInAttackRange(cell)
  }

  /**
   * @return {string}
   */
  getInfoText () {
    let unitDescription = 'unknown unit'
    switch (this.unit.config.name) {
      case 'Mage':
        unitDescription = 'This is you, on the battlefield.\n' +
          'If an enemy unit gets close you can attack it with your magic.\n' +
          'Try to be safe.'
        break
      case 'Trooper':
        unitDescription = 'A cheap melee unit, basically just spell fodder.'
        break
      case 'Keep':
        unitDescription = 'Cannot move but can keep the enemy away.'
        break
      case 'Raider':
        unitDescription = 'Strongest unit available, can move and attack at a distance.'
        break
    }

    return 'Selected: ' + this.unit.config.name + '\n' + unitDescription
  }
}
