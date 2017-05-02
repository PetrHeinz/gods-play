import GameState from './GameState'
import MenuItem from './MenuItem'
import GameStateUnitSelected from './GameStateUnitSelected'
import GameStateCreateUnit from './GameStateCreateUnit'

export default class GameStateStandby extends GameState {
  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    let unit = cell.unit

    if (unit !== null && unit.owner === this.game.getPlayerOnTurn() && !unit.tired) {
      this.game.changeGameState(GameStateUnitSelected, unit)
    }
  }

  /**
   * @return {MenuItem[]}
   */
  getMenuItems () {
    let self = this

    return [
      new MenuItem('Create unit', function () {
        self.game.changeGameState(GameStateCreateUnit)
      }),
      new MenuItem('End turn', function () {
        self.game.endTurn()
      })
    ]
  }
}
