import HashMap from 'hashmap'
import MenuInterface from './MenuInterface'
import CellInterface from './CellInterface'

export default class Interface {
  /**
   * @param {Game} game
   * @param {window} window
   */
  constructor (game, window) {
    /** @type {Game} */
    this.game = game

    /** @type {Window} */
    this.window = window

    /** @type {PIXI.Application|null} */
    this.pixiApp = null

    /** @type {MenuInterface|null} */
    this.menu = null

    /** @type {HashMap} */
    this.cellInterfacesMap = new HashMap()
  }

  initialize () {
    let document = this.window.document
    this.pixiApp = new PIXI.Application(
      document.body.offsetWidth,
      document.body.offsetHeight,
      {antialias: true}
    )
    this.menu = new MenuInterface(this.pixiApp.stage, this.game)
    this.menu.initialize()

    document.body.appendChild(this.pixiApp.view)

    let self = this

    this.game.board.children.forEach(cell => this.cellInterfacesMap.set(cell, new CellInterface(this, cell)))

    this.cellInterfacesMap.forEach(cellInterface => cellInterface.initialize())

    this.game.events.listen('playerLost', function (data) {
      self.window.alert(data.player.name + ' has lost the match!')
    })
  }
}
