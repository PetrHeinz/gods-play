import GameState from './game-state'
import MenuItem from './menu-item'
import GameStateUnitSelected from './game-state-unit-selected'
import GameStateCreateUnit from './game-state-create-unit'

export default class GameStateStandby extends GameState {
  /**
   * @param {Cell} cell
   * @return {GameState}
   */
  cellClick (cell) {
    let unit = cell.unit

    if (unit !== null && unit.owner === this.game.getPlayerOnTurn()) {
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
