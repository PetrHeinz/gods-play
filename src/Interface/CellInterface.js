const HEX_WIDTH = 148
const HEX_HEIGHT = 130
const HEX_OFFSET_X = 115
const HEX_OFFSET_Y = 132

export default class CellInterface {
  /**
   * @param {Interface} parent
   * @param {Cell} cell
   */
  constructor (parent, cell) {
    /** @type {Interface} */
    this.parent = parent

    /** @type {Cell} */
    this.cell = cell

    /** @type {PIXI.Graphics|null} */
    this.hex = null
  }

  initialize () {
    let self = this

    this.hex = self.createHex(this.cell)

    this.parent.pixiApp.stage.addChild(this.hex)

    this.parent.game.events.listen('unitMove', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.text.text = data.unit.config.symbol
        self.hex.text.style.stroke = data.unit.owner.color
        self.hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF
      } else if (self.cell === data.fromCell) {
        self.hex.text.text = ''
      }
    })
    this.parent.game.events.listen('unitAttack', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF
      }
    })
    this.parent.game.events.listen('unitDied', function (data) {
      if (self.cell === data.onCell) {
        self.hex.text.text = ''
      }
    })
    this.parent.game.events.listen('unitCreated', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.text.text = data.unit.config.symbol
        self.hex.text.style.stroke = data.unit.owner.color
        self.hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF
      }
    })
    this.parent.game.events.listen('endTurn', function () {
      if (self.cell.unit !== null) {
        self.hex.text.style.fill = self.cell.unit.tired ? 0xAAAAAA : 0xFFFFFF
      }
    })
    this.parent.game.events.listen('newGameState', function (data) {
      self.hex.tint = data.state.canClickCell(self.cell) ? 0xFFFFFF : 0xCCCCCC
    })
  }

  /**
   * @param {Cell} cell
   * @return {PIXI.Sprite}
   */
  createHex (cell) {
    let hex = new PIXI.Graphics()

    hex.lineStyle(5, 0xFFFFFF, 1)
    hex.beginFill(cell.config.color)
    hex.drawPolygon(
      new PIXI.Point(0, HEX_HEIGHT / 2),
      new PIXI.Point(HEX_WIDTH / 4, 0),
      new PIXI.Point(3 * HEX_WIDTH / 4, 0),
      new PIXI.Point(HEX_WIDTH, HEX_HEIGHT / 2),
      new PIXI.Point(3 * HEX_WIDTH / 4, HEX_HEIGHT),
      new PIXI.Point(HEX_WIDTH / 4, HEX_HEIGHT),
      new PIXI.Point(0, HEX_HEIGHT / 2)
    )
    hex.endFill()
    hex.pivot = new PIXI.Point(HEX_WIDTH / 2, HEX_HEIGHT / 2)

    let size = this.calculateSize()

    hex.width = size * HEX_WIDTH
    hex.height = size * HEX_HEIGHT

    let coordinate = cell.coordinate
    hex.x = size * HEX_OFFSET_X * coordinate.x + this.parent.pixiApp.renderer.width / 2
    hex.y = size * HEX_OFFSET_Y * (coordinate.z + coordinate.x / 2) + this.parent.pixiApp.renderer.height / 2

    hex.text = new PIXI.Text(cell.unit !== null ? cell.unit.config.symbol : '', {
      fill: cell.unit !== null && cell.unit.tired ? 0xAAAAAA : 0xFFFFFF,
      stroke: cell.unit !== null ? cell.unit.owner.color : 0xFFFFFF,
      strokeThickness: 10,
      fontSize: 80,
      dropShadow: true,
      dropShadowBlur: 30
    })
    hex.text.x = HEX_WIDTH / 2 - 50
    hex.text.y = HEX_HEIGHT / 2 - 50
    hex.addChild(hex.text)

    hex.interactive = true
    let self = this
    hex.on('mouseup', function () {
      self.parent.game.cellClick(cell)
    })

    hex.tint = this.parent.game.state.canClickCell(cell) ? 0xFFFFFF : 0xCCCCCC

    return hex
  }

  /**
   * @return {number}
   */
  calculateSize () {
    let boardSize = this.parent.game.board.gameConfig.boardSize

    let xSize = this.parent.pixiApp.renderer.width / HEX_OFFSET_X / (boardSize * 2 + 1)
    let ySize = this.parent.pixiApp.renderer.height / HEX_OFFSET_Y / (boardSize * 2 + 1)

    return Math.min(xSize, ySize)
  }
}
