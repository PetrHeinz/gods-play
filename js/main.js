(function ($) {

    $(document).ready(function () {

        var boardSize = 5;
        var boardGenerator = new BoardGenerator();

        var board = boardGenerator.generateBoard(boardSize);
        console.log(board);

        var $gameBoard = $('#game-board');

        var game = new Game(board);
        var renderer = new Renderer(board, 80, game);

        $gameBoard.append(renderer.getView());

        renderer.createBoard();

    });

})(jQuery);