export default class MenuInterface {
  /**
   * @param {PIXI.Container} stage
   */
  constructor (stage) {
    /** @type {PIXI.Container} */
    this.stage = stage

    /** @type {PIXI.Text[]} */
    this.texts = []
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
        {fill: '#FFFFFF'}
      )

      text.interactive = true
      text.on('mouseup', action.callback)
      text.y = 28 * (i + 1)

      self.texts.push(text)
      self.stage.addChild(text)
    })
  }
}
