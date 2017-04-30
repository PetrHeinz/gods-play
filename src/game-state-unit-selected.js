import GameState from './game-state'

export default class GameStateUnitSelected extends GameState {
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
  cellClick (cell) {
    this.unit.moveTo(cell)

    super.cellClick(cell)
  }
}
