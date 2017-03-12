(function () {

    var boardSize = 5;
    var boardGenerator = new BoardGenerator();

    var board = boardGenerator.generateBoard(boardSize);

    var game = new Game(board);
    var renderer = new Renderer(board, game);

    document.body.appendChild(renderer.getView());

    renderer.createBoard();

})();