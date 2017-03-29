import BoardGenerator from "./board-generator"
import Game from "./game"
import Renderer from "./renderer"
import Unit from "./unit"

export default class GodsPlay {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document) {
        /** @type {HTMLDocument} */
        this.document = document

        /** @type {number} */
        this.boardSize = 5

        /** @type {BoardGenerator} */
        this.boardGenerator = new BoardGenerator()

        /** @type {Game|null} */
        this.game = null

        /** @type {Renderer|null} */
        this.renderer = null
    }

    initialize() {
        let board = this.boardGenerator.generateBoard(this.boardSize)

        this.game = new Game(board)
        this.renderer = new Renderer(board,  this.game)

        this.document.body.appendChild(this.renderer.getView())

        this.renderer.createBoard()

        Unit.createOn(board.cells[0])
    }

}
