import State from './State'
import Action from './Action'
import UnitSelected from './UnitSelected'
import CreatingUnit from './CreatingUnit'
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
        new Action('Drain strength', () => this.game.changeState(DrainingStrength))
      ]
    }
    actions.push(
      new Action('End turn', () => this.game.endTurn())
    )

    return actions
  }
}
