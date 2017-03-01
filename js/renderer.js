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

            var side = Math.ceil(cell.clockwise / cell.rimwards);
            var sideClockwise = (cell.clockwise - 1) % cell.rimwards + 1;

            var xc = 0;
            var yc = 0;

            switch (side) {
                case 1:
                    xc = -cell.rimwards + sideClockwise - 1;
                    yc = -cell.rimwards;
                    break;
                case 2:
                    xc = +sideClockwise - 1;
                    yc = -cell.rimwards + sideClockwise - 1;
                    break;
                case 3:
                    xc = +cell.rimwards - sideClockwise + 1;
                    yc = +sideClockwise - 1;
                    break;
                case 4:
                    xc = -sideClockwise + 1;
                    yc = +cell.rimwards;
                    break;
                case 5:
                    xc = -cell.rimwards;
                    yc = +cell.rimwards - sideClockwise + 1;
                    break;
                case 6:
                    xc = -cell.rimwards;
                    yc = -sideClockwise + 1;
                    break;
            }

            var x = xc + this.board.size;
            var y = yc + this.board.size;

            var backgroundColor = this.backgroundColors[cell.rimwards % this.backgroundColors.length];

            var $cell = createCell(this.width, this.height, cellId, backgroundColor);
            $cell.css({
                left: (x + Math.abs(y - this.board.size) / 2) * (this.width + this.marginX) + this.border,
                top: y * (this.height + this.marginY) + this.border
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
        var content = (cell.text !== undefined ? cell.text : '') + '<br/>' + 'CW: ' + cell.clockwise + '<br/>' +
            'RW: ' + cell.rimwards;

        $cell.html(content);

    }

})();