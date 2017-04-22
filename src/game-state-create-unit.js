import GameState from './game-state'

export default class GameStateCreateUnit extends GameState {
  /**
   * @param {Cell} cell
   * @return {GameState}
   */
  cellClick (cell) {
    cell.createUnit(this.game.getPlayerOnTurn())

    super.cellClick(cell)
  }
}
