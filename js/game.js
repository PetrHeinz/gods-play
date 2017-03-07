(function () {

    /**
     * @param {Board} board
     * @constructor
     */
    Game = function (board) {
        this.board = board;
    };

    /**
     * @param {number} cell
     */
    Game.prototype.cellClick = function (cell) {
        if ($.inArray(cell, this.board.cells)) {
            cell.text = 'clicked!!!';
        }
    };

})();