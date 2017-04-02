import BoardGenerator from "./board-generator"
import Game from "./game"
import Renderer from "./renderer"
import Events from "./events";
import GameObjectFactory from "./game-object-factory";
import Player from "./player";

export default class GodsPlay {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document) {
        /** @type {HTMLDocument} */
        this.document = document

        /** @type {number} */
        this.boardSize = 5

        /** @type {number} */
        this.playerCount = 2

        /** @type {string[]} */
        this.playerColors = ['#AA0000', '#0000AA', '#00AA00', '#AAAA00', '#00AAAA', '#AA00AA']

        /** @type {Events} */
        this.events = new Events()

        /** @type {GameObjectFactory} */
        this.gameObjectFactory = new GameObjectFactory(this.events)

        /** @type {BoardGenerator} */
        this.boardGenerator = new BoardGenerator(this.gameObjectFactory)

        /** @type {Game|null} */
        this.game = null

        /** @type {Renderer|null} */
        this.renderer = null
    }

    initialize() {
        let board = this.boardGenerator.generateBoard(this.boardSize)

        let shuffledCells = board.getShuffledChildren().slice()
        shuffledCells.splice(0, this.boardSize).forEach(function (cell) {
            board.removeChild(cell)
        })

        let players = []
        for (let i = 0; i < this.playerCount; i++) {
            let player = new Player('Player #' + (i + 1), this.playerColors[i]);

            shuffledCells.pop().createUnit(player)
            players.push(player)
        }

        this.game = new Game(board, players, this.events)
        this.renderer = new Renderer(board, this.game)

        this.document.body.appendChild(this.renderer.getView())

        this.renderer.createBoard()
    }

}
