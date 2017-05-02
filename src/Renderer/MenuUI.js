export default class MenuUI {
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
   * @param {MenuItem[]} items
   */
  setItems (items) {
    let self = this

    this.texts.forEach(function (text) {
      self.stage.removeChild(text)
    })

    this.texts = []
    items.forEach(function (item, i) {
      let text = new PIXI.Text(
        '▸' + item.label,
        {fill: '#FFFFFF'}
      )

      text.interactive = true
      text.on('mouseup', item.callback)
      text.y = 28 * (i + 1)

      self.texts.push(text)
      self.stage.addChild(text)
    })
  }
}
