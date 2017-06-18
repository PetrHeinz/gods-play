import HashMap from 'hashmap'
import CellInterface from './CellInterface'
import UnitInterface from './UnitInterface'

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
    this.interfacesMap = new HashMap()
  }

  initialize () {
    let self = this

    this.game.board.children.forEach(function (cell) {
      self.createCellInterface(cell)
      if (cell.unit !== null) {
        self.createUnitInterface(cell.unit)
      }
    })

    this.game.events.listen('cellDestroyed', function (data) {
      if (self.interfacesMap.has(data.cell)) {
        self.pixiApp.stage.removeChild(self.interfacesMap.get(data.cell).hex)
        self.interfacesMap.remove(data.cell)
      }
    })
    this.game.events.listen('unitCreated', function (data) {
      if (self.interfacesMap.has(data.unit.parent)) {
        self.createUnitInterface(data.unit)
      }
    })
    this.game.events.listen('unitDied', function (data) {
      if (self.interfacesMap.has(data.unit)) {
        self.interfacesMap.get(data.unit.parent).removeChild(self.interfacesMap.get(data.unit).symbol)
        self.interfacesMap.remove(data.unit)
      }
    })
  }

  /**
   * @param {Cell} cell
   */
  createCellInterface (cell) {
    let cellInterface = new CellInterface(cell, this.pixiApp, this.game)
    this.interfacesMap.set(cell, cellInterface)
    cellInterface.initialize()
  }

  /**
   * @param {Unit} unit
   */
  createUnitInterface (unit) {
    let unitInterface = new UnitInterface(unit, this, this.game)
    this.interfacesMap.set(unit, unitInterface)
    unitInterface.initialize()
  }
}
