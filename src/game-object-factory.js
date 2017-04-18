import GameObject from './game-object'

export default class GameObjectFactory {
  /**
   * @param {Events} events
   */
  constructor (events) {
    /** @type {Events} */
    this.events = events
  }

  /**
   * @param {Class} GameObjectClass
   * @param {...*} parameters
   * @return {GameObject}
   */
  create (GameObjectClass, ...parameters) {
    let gameObject = new GameObjectClass(...parameters)
    if (!(gameObject instanceof GameObject)) {
      throw 'Error: class must be descendant of GameObject, ' + typeof gameObject + ' passed'
    }
    gameObject.inject(this, this.events)

    return gameObject
  }
}
