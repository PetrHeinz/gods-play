class Game {

    /**
     * @param {Board} board
     */
    constructor(board) {
        this.board = board
    }

    /**
     * @param {Cell} cell
     */
    cellClick(cell) {
        if (this.board.cells.indexOf(cell) > -1) {
            cell.text = 'clicked!!!'
        }
    }

}
