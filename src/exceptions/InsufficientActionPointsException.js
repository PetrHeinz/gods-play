import Exception from './Exception'

export default class InsufficientActionPointsException extends Exception {
  constructor () {
    super('Player has insufficient amount of action points')
  }
}
