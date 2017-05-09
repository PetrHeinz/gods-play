import Exception from './Exception'

export default class CellOutOfRangeException extends Exception {
  constructor () {
    super('Cell is out of range')
  }
}
