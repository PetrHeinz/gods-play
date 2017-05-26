import Exception from './Exception'

export default class InsufficientManaException extends Exception {
  constructor () {
    super('Player has insufficient amount of mana')
  }
}
