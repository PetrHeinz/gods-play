import GameState from './game-state'

export default class GameStateCreateUnit extends GameState {
  /**
   * @param {Cell} cell
   */
  cellClick (cell) {
    cell.createChild(this.game.getPlayerOnTurn())

    super.cellClick(cell)
  }
}
