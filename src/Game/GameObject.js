import Exception from '../exceptions/Exception'

export default class GameObject {
  constructor () {
    /** @type {gameObjectFactory|null} */
    this.factory = null

    /** @type {Events|null} */
    this.events = null

    /** @type {GameObject|null} */
    this.parent = null

    /** @type {GameObject[]} */
    this.children = []
  }

  /**
   * @param {gameObjectFactory} gameObjectFactory
   * @param {Events} events
   */
  inject (gameObjectFactory, events) {
    this.factory = gameObjectFactory
    this.events = events
  }

  /**
   * @param {Class} childClass
   * @param {...*} parameters
   */
  createChild (childClass, ...parameters) {
    let child = this.factory.create(childClass, ...parameters)

    child.setParent(this)

    return child
  }

  /**
   * @param {GameObject} child
   * @return boolean
   */
  hasChild (child) {
    return this.children.indexOf(child) > -1
  }

  /**
   * @param {GameObject} child
   * @return boolean
   */
  removeChild (child) {
    if (!this.hasChild(child)) {
      throw new Exception('Child not found')
    }

    let index = this.children.indexOf(child)
    this.children.splice(index, 1)

    child.parent = null
  }

  /**
   * @param {GameObject} parent
   */
  setParent (parent) {
    if (this.parent !== null) {
      this.parent.removeChild(this)
    }

    this.parent = parent

    parent.children.push(this)
  }
}
