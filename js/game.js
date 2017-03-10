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
        if ($.inArray(cell, this.board.cells)) {
            cell.text = 'clicked!!!';
        }
    };

})();