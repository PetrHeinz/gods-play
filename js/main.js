(function () {

    var boardSize = 5;
    var boardGenerator = new BoardGenerator();

    var board = boardGenerator.generateBoard(boardSize);

    var renderElement = document.getElementById('game-board');

    var game = new Game(board);
    var renderer = new Renderer(board, game);

    renderElement.appendChild(renderer.getView());

    renderer.createBoard();

})();