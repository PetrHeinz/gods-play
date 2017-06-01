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
    this.menu = new MenuInterface(this.pixiApp.stage)

    document.body.appendChild(this.pixiApp.view)

    let self = this

    this.game.board.children.forEach(cell => this.cellInterfacesMap.set(cell, new CellInterface(this, cell)))

    this.cellInterfacesMap.forEach(cellInterface => cellInterface.initialize())

    let playerText = new PIXI.Text('', {fill: 0xFFFFFF})
    updatePlayerText(this.game.getPlayerOnTurn())
    self.pixiApp.stage.addChild(playerText)
    this.game.events.listen('turnEnded', data => updatePlayerText(data.playerOnTurn))
    this.game.events.listen('playerGainedMana', data => updatePlayerText(data.player))
    this.game.events.listen('playerCastedSpell', data => updatePlayerText(data.player))
    this.game.events.listen('playerRefreshed', data => updatePlayerText(data.player))

    this.menu.setActions(this.game.state.getActions())
    this.game.events.listen('gameStateChanged', function (data) {
      self.menu.setActions(data.state.getActions())
    })

    this.game.events.listen('playerLost', function (data) {
      self.window.alert(data.player.name + ' has lost the match!')
    })

    /**
     * @param {Player} player
     */
    function updatePlayerText (player) {
      playerText.text = 'On turn: ' + player.name + '\nMana: ' + player.mana + '\nAction pts: ' + player.actionPoints
    }
  }
}
