(function () {

    var VERTICAL_RATIO = 0.8;
    var BORDER_RATIO = 0.2;
    var MARGIN_RATIO = 0.05;

    Renderer = function (board, $board, size, backgroundColors) {
        this.board = board;
        this.$board = $board;
        this.width = size;
        this.height = VERTICAL_RATIO * size;
        this.border = BORDER_RATIO * size;
        this.marginX = MARGIN_RATIO * size;
        this.marginY = MARGIN_RATIO * VERTICAL_RATIO * size;
        this.backgroundColors = backgroundColors;
    };

    Renderer.prototype.createBoard = function () {
        for (var cellId in this.board.cells) {
            var cell = this.board.cells[cellId];
            var cubeCoordinate = cell.cubeCoordinate;

            var x = cubeCoordinate.x;
            var y = cubeCoordinate.z + cubeCoordinate.x / 2;

            var radius = (Math.abs(cubeCoordinate.x) + Math.abs(cubeCoordinate.y) + Math.abs(cubeCoordinate.z)) / 2;
            var backgroundColor = this.backgroundColors[radius % this.backgroundColors.length];

            var $cell = createCell(this.width, this.height, cellId, backgroundColor);
            $cell.css({
                left: (x + this.board.size) * (this.width + this.marginX) + this.border,
                top: (y + this.board.size) * (this.height + this.marginY) + this.border
            });
            this.$board.append($cell);
        }

        this.updateBoard();
    };

    Renderer.prototype.updateBoard = function () {

        var $cells = this.$board.children();

        for (var cellId in this.board.cells) {

            var cell = this.board.cells[cellId];
            var $cell = $cells.eq(cellId);
            updateCell(cell, $cell);

        }

    };

    function createCell(width, height, cellId, backgroundColor) {

        return $('<div>')
            .addClass('cell')
            .data('cellId', cellId)
            .css({
                width: width,
                height: height,
                backgroundColor: backgroundColor
            });

    }

    function updateCell(cell, $cell) {
        var content = (cell.text !== undefined ? cell.text : '') + '<br/>'
            + 'X' + cell.cubeCoordinate.x + ' Y' + cell.cubeCoordinate.y + ' Z' + cell.cubeCoordinate.z;

        $cell.html(content);

    }

})();