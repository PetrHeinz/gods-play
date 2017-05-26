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
        {fill: 0xFFFFFF}
      )

      text.interactive = true
      text.on('mouseup', action.callback)
      text.y = 30 * (i + 2)

      self.texts.push(text)
      self.stage.addChild(text)
    })
  }
}
