import State from './State'
import Exception from '../../Exception'
import StandingBy from './StandingBy'
import { typename } from '../../function/type'

export default class StateFactory {
  /**
   * @param {Game} game
   */
  constructor (game) {
    /** @type {Game} */
    this.game = game
  }

  /**
   * @param {Class} [StateClass]
   * @param {...*} parameters
   * @return {State}
   */
  create (StateClass = StandingBy, ...parameters) {
    let state = new StateClass(...parameters)
    if (!(state instanceof State)) {
      throw new Exception('Class must be descendant of State, ' + typename(state) + ' passed')
    }
    state.inject(this, this.game)

    return state
  }
}
