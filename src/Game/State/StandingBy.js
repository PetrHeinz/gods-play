import State from './State'
import Action from './Action'
import UnitSelected from './UnitSelected'
import CreatingUnit from './CreatingUnit'

export default class StandingBy extends State {
  /**
   * @param {Cell} cell
   */
  cellClickAction (cell) {
    this.game.changeState(UnitSelected, cell.unit)
  }

  /**
   * @param {Cell} cell
   * @return {bool}
   */
  canClickCell (cell) {
    let unit = cell.unit

    return unit !== null && unit.owner === this.game.getPlayerOnTurn() && !unit.tired
  }

  /**
   * @return {Action[]}
   */
  getActions () {
    let self = this

    return [
      new Action('Create unit', function () {
        self.game.changeState(CreatingUnit)
      }),
      new Action('End turn', function () {
        self.game.endTurn()
      })
    ]
  }
}
