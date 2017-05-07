import Exception from './Exception'

export default class CellNotFoundException extends Exception {
  constructor () {
    super('Cell was not found')
  }
}
