import GameObject from './game-object'
import Exception from './exception'
import { typename } from './type-functions'

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
      throw new Exception('Class must be descendant of GameObject, ' + typename(gameObject) + ' passed')
    }
    gameObject.inject(this, this.events)

    return gameObject
  }
}
