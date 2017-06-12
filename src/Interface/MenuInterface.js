const MENU_OFFSET = 10

export default class MenuInterface {
  /**
   * @param {PIXI.Container} stage
   * @param {Game} game
   */
  constructor (stage, game) {
    /** @type {PIXI.Container} */
    this.stage = stage

    /** @type {Game} */
    this.game = game

    /** @type {PIXI.Text|null} */
    this.playerText = null

    /** @type {PIXI.Text[]} */
    this.actionTexts = []
  }

  initialize () {
    this.createPlayerText()

    this.updatePlayerText(this.game.getPlayerOnTurn())
    this.game.events.listen('turnEnded', data => this.updatePlayerText(data.playerOnTurn))
    this.game.events.listen('playerGainedMana', data => this.updatePlayerText(data.player))
    this.game.events.listen('playerCastedSpell', data => this.updatePlayerText(data.player))
    this.game.events.listen('playerRefreshed', data => this.updatePlayerText(data.player))

    this.setActions(this.game.state.getActions())
    this.game.events.listen('gameStateChanged', data => this.setActions(data.state.getActions()))
  }

  createPlayerText () {
    this.playerText = new PIXI.Text('', {fill: 0xFFFFFF})
    this.playerText.x = MENU_OFFSET
    this.playerText.y = MENU_OFFSET

    this.stage.addChild(this.playerText)
  }

  /**
   * @param {Player} player
   */
  updatePlayerText (player) {
    let playerTextLines = [
      'On turn: ' + player.name,
      'Mana: ' + player.mana,
      'Action pts: ' + player.actionPoints
    ]

    this.playerText.text = playerTextLines.join('\n')
  }

  /**
   * @param {Action[]} actions
   */
  setActions (actions) {
    let self = this

    this.actionTexts.forEach(function (text) {
      self.stage.removeChild(text)
    })

    this.actionTexts = []
    let actionTextsHeight = 0
    actions.forEach(function (action) {
      let text = new PIXI.Text(
        '▸' + action.label,
        {fill: 0xFFFFFF}
      )

      text.interactive = true
      text.on('mouseup', action.callback)
      text.x = MENU_OFFSET
      text.y = self.playerText.height + actionTextsHeight + MENU_OFFSET
      actionTextsHeight += text.height

      self.actionTexts.push(text)
      self.stage.addChild(text)
    })
  }
}
