import HashMap from 'hashmap'
import MenuInterface from './MenuInterface'
import CellInterface from './CellInterface'

export default class Interface {
  /**
   * @param {Game} game
   * @param {HTMLDocument} document
   */
  constructor (game, document) {
    /** @type {Game} */
    this.game = game

    /** @type {HTMLDocument} */
    this.document = document

    /** @type {PIXI.Application|null} */
    this.pixiApp = null

    /** @type {MenuInterface|null} */
    this.menu = null

    /** @type {HashMap} */
    this.cellInterfacesMap = new HashMap()
  }

  initialize () {
    this.pixiApp = new PIXI.Application(
      this.document.body.offsetWidth,
      this.document.body.offsetHeight,
      {antialias: true}
    )
    this.menu = new MenuInterface(this.pixiApp.stage)

    this.document.body.appendChild(this.pixiApp.view)

    let self = this

    this.game.board.children.forEach(cell => this.cellInterfacesMap.set(cell, new CellInterface(this, cell)))

    this.cellInterfacesMap.forEach(cellInterface => cellInterface.initialize())

    let playerText = new PIXI.Text('', {fill: 0xFFFFFF})
    updatePlayerText(this.game.getPlayerOnTurn())
    self.pixiApp.stage.addChild(playerText)
    this.game.events.listen('endTurn', data => updatePlayerText(data.playerOnTurn))
    this.game.events.listen('addMana', data => updatePlayerText(data.player))

    this.menu.setActions(this.game.state.getActions())
    this.game.events.listen('newGameState', function (data) {
      self.menu.setActions(data.state.getActions())
    })

    /**
     * @param {Player} player
     */
    function updatePlayerText (player) {
      playerText.text = 'On turn: ' + player.name + '\nMana: ' + player.mana
    }
  }
}
