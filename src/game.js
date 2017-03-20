class Game {

    /**
     * @param {Board} board
     */
    constructor(board) {
        this.board = board
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
