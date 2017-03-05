(function () {

    var VERTICAL_RATIO = 0.8;
    var BORDER_RATIO = 0.2;
    var MARGIN_RATIO = 0.05;

    /**
     * @param {Board} board
     * @param {jQuery} $board
     * @param {number} size
     * @constructor
     */
    Renderer = function (board, $board, size) {
        this.board = board;
        this.$board = $board;
        this.width = size;
        this.height = VERTICAL_RATIO * size;
        this.border = BORDER_RATIO * size;
        this.marginX = MARGIN_RATIO * size;
        this.marginY = MARGIN_RATIO * VERTICAL_RATIO * size;
    };

    Renderer.prototype.createBoard = function () {
        for (var cellId in this.board.cells) {
            var cell = this.board.cells[cellId];
            var cubeCoordinate = cell.cubeCoordinate;

            var x = cubeCoordinate.x;
            var y = cubeCoordinate.z + cubeCoordinate.x / 2;

            var $cell = this.createCell(x, y, cellId);
            this.$board.append($cell);
        }

        this.updateBoard();
    };

    Renderer.prototype.updateBoard = function () {
        var $cells = this.$board.children();
        for (var cellId in this.board.cells) {
            var cell = this.board.cells[cellId];
            var $cell = $cells.eq(cellId);
            this.updateCell(cell, $cell);
        }
    };

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} cellId
     * @return {jQuery}
     */
    Renderer.prototype.createCell = function (x, y, cellId) {
        return $('<div>')
            .addClass('cell')
            .data('cellId', cellId)
            .css({
                left: (x + this.board.size) * (this.width + this.marginX) + this.border,
                top: (y + this.board.size) * (this.height + this.marginY) + this.border,
                width: this.width,
                height: this.height
            });
    };

    /**
     * @param {Cell} cell
     * @param {jQuery} $cell
     */
    Renderer.prototype.updateCell = function (cell, $cell) {
        var content = (cell.text !== undefined ? cell.text : '') + '<br/>'
            + 'X' + cell.cubeCoordinate.x + ' Y' + cell.cubeCoordinate.y + ' Z' + cell.cubeCoordinate.z;
        $cell.html(content);
    }

})();