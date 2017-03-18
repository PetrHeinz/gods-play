(function () {

    let boardSize = 5
    let boardGenerator = new BoardGenerator()
    let board = boardGenerator.generateBoard(boardSize)
    let game = new Game(board)
    let renderer = new Renderer(board, game)

    document.body.appendChild(renderer.getView())

    renderer.createBoard()

})();