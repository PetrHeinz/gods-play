import HashMap from 'hashmap'
import CellInterface from './CellInterface'

export default class BoardInterface {
  /**
   * @param {PIXI.Application} pixiApp
   * @param {Game} game
   */
  constructor (pixiApp, game) {
    /** @type {PIXI.Container} */
    this.pixiApp = pixiApp

    /** @type {Game} */
    this.game = game

    /** @type {HashMap} */
    this.cellInterfacesMap = new HashMap()
  }

  initialize () {
    this.game.board.children.forEach(
      cell => this.cellInterfacesMap.set(cell, new CellInterface(cell, this.pixiApp, this.game))
    )

    this.cellInterfacesMap.forEach(cellInterface => cellInterface.initialize())

    let self = this
    this.game.events.listen('cellDestroyed', function (data) {
      if (self.cellInterfacesMap.has(data.cell)) {
        self.pixiApp.stage.removeChild(self.cellInterfacesMap.get(data.cell).hex)
        self.cellInterfacesMap.remove(data.cell)
      }
    })
  }
}
