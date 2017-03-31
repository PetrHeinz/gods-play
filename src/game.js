import GameStateFactory from "./game-state-factory"
import GameStateStandby from "./game-state-standby";

export default class Game {

    /**
     * @param {Board} board
     * @param {Player[]} players
     */
    constructor(board, players) {
        /** @type {Board} */
        this.board = board

        /** @type {Player[]} */
        this.players = players

        /** @type {number} */
        this.playerTurn = 0

        /** @type {GameStateFactory} */
        this.gameStateFactory = new GameStateFactory(this)

        /** @type {GameState} */
        this.gameState = this.gameStateFactory.create(GameStateStandby)
    }

    /**
     * @return {Player}
     */
    getPlayerOnTurn() {
        return this.players[this.playerTurn]
    }

    endTurn() {
        this.playerTurn = (this.playerTurn + 1) % this.players.length

        this.gameState = this.gameStateFactory.create(GameStateStandby)
    }

    /**
     * @param {Cell} cell
     */
    cellClick(cell) {
        if (this.board.hasChild(cell)) {
            this.gameState = this.gameState.cellClick(cell)
        }
    }

}
