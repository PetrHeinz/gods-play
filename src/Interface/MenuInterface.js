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

    /** @type {PIXI.Text[]} */
    this.texts = []
  }

  initialize () {
    this.setActions(this.game.state.getActions())
    this.game.events.listen('gameStateChanged', data => this.setActions(data.state.getActions()))
  }

  /**
   * @param {Action[]} actions
   */
  setActions (actions) {
    let self = this

    this.texts.forEach(function (text) {
      self.stage.removeChild(text)
    })

    this.texts = []
    actions.forEach(function (action, i) {
      let text = new PIXI.Text(
        '▸' + action.label,
        {fill: 0xFFFFFF}
      )

      text.interactive = true
      text.on('mouseup', action.callback)
      text.y = 30 * (i + 3)

      self.texts.push(text)
      self.stage.addChild(text)
    })
  }
}
