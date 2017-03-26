import BoardGenerator from "./board-generator"
import Game from "./game"
import Renderer from "./renderer"
import Unit from "./unit"

(function () {

    let boardSize = 5
    let boardGenerator = new BoardGenerator()
    let board = boardGenerator.generateBoard(boardSize)
    let game = new Game(board)
    let renderer = new Renderer(board, game)

    document.body.appendChild(renderer.getView())

    renderer.createBoard()

    Unit.createOn(board.cells[0])

})()