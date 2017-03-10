(function ($) {

    $(document).ready(function () {

        var boardSize = 5;
        var boardGenerator = new BoardGenerator();

        var board = boardGenerator.generateBoard(boardSize);

        var $gameBoard = $('#game-board');

        var game = new Game(board);
        var renderer = new Renderer(board, game);

        $gameBoard.append(renderer.getView());

        renderer.createBoard();

    });

})(jQuery);