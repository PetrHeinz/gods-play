class Game {

    /**
     * @param {Board} board
     */
    constructor(board) {
        /** @type {Board} */
        this.board = board

        /** @type {GameState} */
        this.gameState = new GameStateStandby()
    }

    /**
     * @param {Cell} cell
     */
    cellClick(cell) {
        if (this.board.hasCell(cell)) {
            this.gameState = this.gameState.cellClick(cell)
        }
    }

}
