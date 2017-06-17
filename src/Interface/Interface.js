import HashMap from 'hashmap'
import MenuInterface from './MenuInterface'
import BoardInterface from './BoardInterface'

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
    document.body.appendChild(this.pixiApp.view)

    let menuInterface = new MenuInterface(this.pixiApp.stage, this.game)
    menuInterface.initialize()

    let boardInterface = new BoardInterface(this.pixiApp, this.game)
    boardInterface.initialize()

    this.game.events.listen('playerLost', data => this.window.alert(data.player.name + ' has lost the match!'))
  }
}
