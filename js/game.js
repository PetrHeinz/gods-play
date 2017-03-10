(function () {

    /**
     * @param {Board} board
     * @constructor
     */
    Game = function (board) {

        /**
         * @member {Board}
         */
        this.board = board;
    };

    /**
     * @param {Cell} cell
     */
    Game.prototype.cellClick = function (cell) {
        if (this.board.cells.indexOf(cell) > -1) {
            cell.text = 'clicked!!!';
        }
    };

})();