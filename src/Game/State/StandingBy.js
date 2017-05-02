import State from './State'
import Action from './Action'
import UnitSelected from './UnitSelected'
import CreatingUnit from './CreatingUnit'

export default class StandingBy extends State {
  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    let unit = cell.unit

    if (unit !== null && unit.owner === this.game.getPlayerOnTurn() && !unit.tired) {
      this.game.changeState(UnitSelected, unit)
    }
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
