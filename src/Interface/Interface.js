import MenuInterface from './MenuInterface'
import BoardInterface from './BoardInterface'

const MOUSE_BUTTON_RIGHT = 2

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
  }

  initialize () {
    let document = this.window.document
    this.pixiApp = new PIXI.Application(
      document.body.offsetWidth,
      document.body.offsetHeight,
      {antialias: true}
    )
    document.body.appendChild(this.pixiApp.view)

    let game = this.game
    document.onmouseup = (event) => {
      if (event.button === MOUSE_BUTTON_RIGHT) {
        game.state.rightClickAction()

        return false
      }
    }
    document.oncontextmenu = () => false

    let menuInterface = new MenuInterface(this.pixiApp.stage, this.game)
    menuInterface.initialize()

    let boardInterface = new BoardInterface(this.pixiApp, this.game)
    boardInterface.initialize()

    this.game.events.listen('playerLost', data => this.window.alert(data.player.name + ' has lost the match!'))
  }
}
