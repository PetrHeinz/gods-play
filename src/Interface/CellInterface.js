export const HEX_WIDTH = 100
export const HEX_HEIGHT = Math.sqrt(3) / 2 * HEX_WIDTH
const HEX_OFFSET_RATIO = 1.1
const HEX_OFFSET_WIDTH = HEX_OFFSET_RATIO * 3 / 4 * HEX_WIDTH
const HEX_OFFSET_HEIGHT = HEX_OFFSET_RATIO * HEX_HEIGHT
const HEX_STRENGTH_SIZE = 0.25 * HEX_HEIGHT

const COLOR_HEX_ACTIVE = 0xFFFFFF
const COLOR_HEX_INACTIVE = 0x999999

export default class CellInterface {
  /**
   * @param {Cell} cell
   * @param {PIXI.Application} pixiApp
   * @param {Game} game
   */
  constructor (cell, pixiApp, game) {
    /** @type {Cell} */
    this.cell = cell

    /** @type {PIXI.Container} */
    this.pixiApp = pixiApp

    /** @type {Game} */
    this.game = game

    /** @type {PIXI.Graphics|null} */
    this.hex = null
  }

  initialize () {
    let self = this

    this.hex = this.createHex(this.cell)

    this.pixiApp.stage.addChild(this.hex)

    this.game.events.listen('cellDrained', function (data) {
      if (self.cell === data.cell) {
        self.hex.strength.text = self.cell.strength !== 0 ? self.cell.strength : ''
      }
    })
    this.game.events.listen('gameStateChanged', function (data) {
      self.hex.tint = data.state.canClickCell(self.cell) ? COLOR_HEX_ACTIVE : COLOR_HEX_INACTIVE
      self.hex.strength.style.stroke = self.hex.tint
    })
  }

  /**
   * @param {Cell} cell
   * @return {PIXI.Sprite}
   */
  createHex (cell) {
    let hex = new PIXI.Graphics()

    hex.lineStyle(10, COLOR_HEX_ACTIVE, 1)
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
    hex.tint = this.game.state.canClickCell(this.cell) ? COLOR_HEX_ACTIVE : COLOR_HEX_INACTIVE

    let size = this.calculateSize()

    hex.width = size * HEX_WIDTH
    hex.height = size * HEX_HEIGHT

    let coordinate = cell.coordinate
    hex.x = size * HEX_OFFSET_WIDTH * coordinate.x + this.pixiApp.renderer.width / 2
    hex.y = size * HEX_OFFSET_HEIGHT * (coordinate.z + coordinate.x / 2) + this.pixiApp.renderer.height / 2

    hex.strength = new PIXI.Text(cell.strength !== 0 ? cell.strength : '', {
      stroke: hex.tint,
      strokeThickness: HEX_STRENGTH_SIZE / 3,
      fontSize: HEX_STRENGTH_SIZE,
      fontWeight: 900
    })
    hex.strength.x = HEX_WIDTH / 4
    hex.strength.y = 0
    hex.strength.anchor = new PIXI.Point(0.25, 0.25)
    hex.addChild(hex.strength)

    hex.interactive = true
    hex.on('mouseup', () => this.game.cellClick(cell))

    return hex
  }

  /**
   * @return {number}
   */
  calculateSize () {
    let boardSize = this.game.board.gameConfig.boardSize

    let xSize = this.pixiApp.renderer.width / HEX_OFFSET_WIDTH / (boardSize * 2 + 1)
    let ySize = this.pixiApp.renderer.height / HEX_OFFSET_HEIGHT / (boardSize * 2 + 1)

    return Math.min(xSize, ySize)
  }

  remove () {
    this.pixiApp.stage.removeChild(this.hex)
  }
}
