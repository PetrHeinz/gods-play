(function () {

    BoardGenerator = function () {

    };

    BoardGenerator.prototype.generateBoard = function (boardSize) {
        var cells = [new Cell(0, 0)];

        for (var rimwards = 1; rimwards <= boardSize; rimwards++) {
            for (var clockwise = 1; clockwise <= 6 * rimwards; clockwise++) {
                cells.push(new Cell(rimwards, clockwise));
            }
        }

        for (var cellId in cells) {
            var cell = cells[cellId];
            cell.neighbours;
        }

        return new Board(boardSize, cells);
    };

})();