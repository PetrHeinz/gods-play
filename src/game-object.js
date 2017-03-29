export default class GameObject {

    constructor() {
        /** @type {GameObjectFactory|null} */
        this.factory = null

        /** @type {Events|null} */
        this.events = null
    }

    /**
     * @param {GameObjectFactory} gameObjectFactory
     * @param {Events} events
     */
    inject(gameObjectFactory, events) {
        this.factory = gameObjectFactory
        this.events = events
    }

}
