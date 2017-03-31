import GameState from "./game-state";

export default class GameStateFactory {

    /**
     * @param {Game} game
     */
    constructor(game) {
        /** @type {Game} */
        this.game = game
    }

    /**
     * @param {Class} gameStateClass
     * @param {...*} parameters
     * @return {GameState}
     */
    create(gameStateClass, ...parameters) {
        let gameState = new gameStateClass(...parameters)
        if (!(gameState instanceof GameState)) {
            throw 'Error: class must be descendant of GameObject, ' + typeof GameState + ' passed'
        }
        gameState.inject(this, this.game)

        return gameState
    }

}
