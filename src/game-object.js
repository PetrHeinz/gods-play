export default class GameObject {

    constructor() {
        /** @type {GameObjectFactory|null} */
        this.factory = null

        /** @type {Events|null} */
        this.events = null

        /** @type {GameObject|null} */
        this.parent = null

        /** @type {GameObject[]} */
        this.children = []
    }

    /**
     * @param {GameObjectFactory} gameObjectFactory
     * @param {Events} events
     */
    inject(gameObjectFactory, events) {
        this.factory = gameObjectFactory
        this.events = events
    }

    /**
     * @param {Class} childClass
     * @param {...*} parameters
     */
    createChild(childClass, ...parameters) {
        let child = this.factory.create(childClass, ...parameters)

        child.setParent(this)

        return child
    }

    /**
     * @param {GameObject} child
     * @return bool
     */
    hasChild(child) {
        return this.children.indexOf(child) > -1
    }

    /**
     * @param {GameObject} child
     * @return bool
     */
    removeChild(child) {
        if (!this.hasChild(child)) {
            throw 'Error: Child not found'
        }

        let index = this.children.indexOf(child)
        this.children.splice(index, 1)

        child.parent = null
    }

    /**
     * @param {GameObject} parent
     */
    setParent(parent) {
        if (this.parent !== null) {
            this.parent.removeChild(this)
        }

        this.parent = parent

        parent.children.push(this)
    }

}
