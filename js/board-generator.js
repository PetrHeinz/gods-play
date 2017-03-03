(function () {

    BoardGenerator = function () {

    };

    BoardGenerator.prototype.generateBoard = function (boardSize) {
        var centerCubeCoordinate = new CubeCoordinate(0, 0, 0);
        var cells = [new Cell(centerCubeCoordinate)];

        for (var radius = 1; radius <= boardSize; radius++) {
            var ring = centerCubeCoordinate.getRing(radius);
            for (var i in ring) {
                cells.push(new Cell(ring[i]));
            }
        }

        return new Board(boardSize, cells);
    };

})();