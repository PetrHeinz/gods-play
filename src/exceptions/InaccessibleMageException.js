import Exception from './Exception'

export default class InaccessibleMageException extends Exception {
  constructor () {
    super('Mage cannot be accessed')
  }
}
