(function ($) {

    $(document).ready(function () {

        var boardSize = 5;
        var boardGenerator = new BoardGenerator();

        var board = boardGenerator.generateBoard(boardSize);
        console.log(board);

        var $gameBoard = $('#game-board');

        var game = new Game(board);
        var renderer = new Renderer(board, $gameBoard, 80, game);
        renderer.createBoard();

    });

})(jQuery);