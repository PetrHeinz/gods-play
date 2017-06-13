import State from './State'
import Action from './Action'
import UnitSelected from './UnitSelected'
import CreatingUnit from './CreatingUnit'
import TransportingUnitSelection from './TransportingUnitSelection'
import DrainingStrength from './DrainingStrength'

export default class StandingBy extends State {
  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    this.game.changeState(UnitSelected, cell.unit)
  }

  /**
   * @param {Cell} cell
   * @return {boolean}
   */
  canClickCell (cell) {
    let unit = cell.unit

    return unit !== null && unit.owner === this.game.getPlayerOnTurn() && !unit.tired
  }

  /**
   * @return {Action[]}
   */
  getActions () {
    let actions = []
    if (this.game.getPlayerOnTurn().actionPoints > 0) {
      actions = [
        new Action('Create unit', () => this.game.changeState(CreatingUnit)),
        new Action('Transport unit', () => this.game.changeState(TransportingUnitSelection)),
        new Action('Drain strength', () => this.game.changeState(DrainingStrength))
      ]
    }
    actions.push(
      new Action('End turn', () => this.game.endTurn())
    )

    return actions
  }

  /**
   * @return {string[]}
   */
  getInfoTexts () {
    return [
      'Your goal in this game is to kill your opponent.',
      'Each turn, you can cast up to 3 spells.',
      'You can also control all your units - move them or attack on enemy at range.'
    ]
  }
}
