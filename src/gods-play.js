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

        let players = []
        for (let i = 0; i < this.playerCount; i++) {
            players.push(new Player('Player #' + (i + 1)))
        }

        this.game = new Game(board, players)
        this.renderer = new Renderer(board, this.game)

        this.document.body.appendChild(this.renderer.getView())

        this.renderer.createBoard()
    }

}
