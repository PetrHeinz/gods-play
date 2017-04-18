import GameState from './game-state'
import GameStateUnitSelected from './game-state-unit-selected'

export default class GameStateStandby extends GameState {
  /**
   * @param {Cell} cell
   * @return {GameState}
   */
  cellClick (cell) {
    let unit = cell.unit

    if (unit !== null && unit.owner === this.game.getPlayerOnTurn()) {
      return this.factory.create(GameStateUnitSelected, unit)
    }

    return super.cellClick()
  }
}
