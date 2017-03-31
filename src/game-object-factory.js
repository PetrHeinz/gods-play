import GameObject from "./game-object"

export default class GameObjectFactory {

    /**
     * @param {Events} events
     */
    constructor(events) {
        /** @type {Events} */
        this.events = events
    }

    /**
     * @param {Class} gameObjectClass
     * @param {...*} parameters
     * @return {GameObject}
     */
    create(gameObjectClass, ...parameters) {
        let gameObject = new gameObjectClass(...parameters)
        if (!(gameObject instanceof GameObject)) {
            throw 'Error: class must be descendant of GameObject, ' + typeof gameObject + ' passed'
        }
        gameObject.inject(this, this.events)

        return gameObject
    }

}
