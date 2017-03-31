import GameStateFactory from "./game-state-factory"
import GameStateStandby from "./game-state-standby";

export default class Game {

    /**
     * @param {Board} board
     */
    constructor(board) {
        /** @type {Board} */
        this.board = board

        /** @type {GameStateFactory} */
        this.gameStateFactory = new GameStateFactory(this)

        /** @type {GameState} */
        this.gameState = this.gameStateFactory.create(GameStateStandby)
    }

    /**
     * @param {Cell} cell
     */
    cellClick(cell) {
        if (this.board.hasChild(cell)) {
            this.gameState = this.gameState.cellClick(cell)
        }
    }

}
