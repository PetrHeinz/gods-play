(function ($) {

    $(document).ready(function () {

        var boardSize = 5;
        var boardGenerator = new BoardGenerator();

        var board = boardGenerator.generateBoard(boardSize);
        console.log(board);

        var $gameBoard = $('#game-board');

        var renderer = new Renderer(board, $gameBoard, 80);
        renderer.createBoard();

        $gameBoard.on('click', '.cell', function () {
            var cellId = $(this).data('cellId');
            var cell = board.cells[cellId];
            cell.text = 'clicked!!!';
            renderer.updateBoard();
        });

    });

})(jQuery);