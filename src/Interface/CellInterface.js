const HEX_WIDTH = 100
const HEX_HEIGHT = Math.sqrt(3) / 2 * HEX_WIDTH
const HEX_OFFSET_RATIO = 1.1
const HEX_OFFSET_WIDTH = HEX_OFFSET_RATIO * 3 / 4 * HEX_WIDTH
const HEX_OFFSET_HEIGHT = HEX_OFFSET_RATIO * HEX_HEIGHT
const HEX_SYMBOL_SIZE = 0.75 * HEX_HEIGHT

const COLOR_UNIT_RESTED = 0xFFFFFF
const COLOR_UNIT_TIRED = 0x666666
const COLOR_HEX_ACTIVE = 0xFFFFFF
const COLOR_HEX_INACTIVE = 0x999999

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

    this.parent.game.events.listen('cellDrained', function (data) {
      if (self.cell === data.cell) {
        self.hex.strength.text = self.cell.strength
      }
    })
    this.parent.game.events.listen('cellDestroyed', function (data) {
      if (self.cell === data.cell) {
        self.parent.pixiApp.stage.removeChild(self.hex)
        self.parent.cellInterfacesMap.remove(self.cell)
      }
    })
    this.parent.game.events.listen('unitMoved', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.symbol.text = data.unit.config.symbol
        self.hex.symbol.style.fill = data.unit.owner.color
        self.hex.symbol.style.stroke = data.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
      } else if (self.cell === data.fromCell) {
        self.hex.symbol.text = ''
      }
    })
    this.parent.game.events.listen('unitAttacked', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.symbol.style.stroke = data.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
      }
    })
    this.parent.game.events.listen('unitDied', function (data) {
      if (self.cell === data.onCell) {
        self.hex.symbol.text = ''
      }
    })
    this.parent.game.events.listen('unitCreated', function (data) {
      if (self.cell === data.unit.parent) {
        self.hex.symbol.text = data.unit.config.symbol
        self.hex.symbol.style.fill = data.unit.owner.color
        self.hex.symbol.style.stroke = data.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
      }
    })
    this.parent.game.events.listen('turnEnded', function () {
      if (self.cell.unit !== null) {
        self.hex.symbol.style.stroke = self.cell.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
      }
    })
    this.parent.game.events.listen('gameStateChanged', function (data) {
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
    hex.tint = this.parent.game.state.canClickCell(this.cell) ? COLOR_HEX_ACTIVE : COLOR_HEX_INACTIVE

    let size = this.calculateSize()

    hex.width = size * HEX_WIDTH
    hex.height = size * HEX_HEIGHT

    let coordinate = cell.coordinate
    hex.x = size * HEX_OFFSET_WIDTH * coordinate.x + this.parent.pixiApp.renderer.width / 2
    hex.y = size * HEX_OFFSET_HEIGHT * (coordinate.z + coordinate.x / 2) + this.parent.pixiApp.renderer.height / 2

    hex.strength = new PIXI.Text(cell.strength, {
      stroke: hex.tint,
      strokeThickness: HEX_SYMBOL_SIZE / 10,
      fontSize: HEX_SYMBOL_SIZE / 3,
      fontWeight: 900
    })
    hex.strength.x = HEX_WIDTH / 4
    hex.strength.y = 0
    hex.strength.anchor = new PIXI.Point(0.25, 0.25)
    hex.addChild(hex.strength)

    hex.symbol = new PIXI.Text(cell.unit !== null ? cell.unit.config.symbol : '', {
      fill: cell.unit !== null ? cell.unit.owner.color : null,
      stroke: cell.unit !== null && cell.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED,
      strokeThickness: HEX_SYMBOL_SIZE / 15,
      fontSize: HEX_SYMBOL_SIZE,
      fontWeight: 800,
      dropShadow: true,
      dropShadowBlur: HEX_SYMBOL_SIZE / 5
    })
    hex.symbol.x = HEX_WIDTH / 2
    hex.symbol.y = HEX_HEIGHT / 2
    hex.symbol.anchor = new PIXI.Point(0.5, 0.5)
    hex.addChild(hex.symbol)

    hex.interactive = true
    let self = this
    hex.on('mouseup', function () {
      self.parent.game.cellClick(cell)
    })

    return hex
  }

  /**
   * @return {number}
   */
  calculateSize () {
    let boardSize = this.parent.game.board.gameConfig.boardSize

    let xSize = this.parent.pixiApp.renderer.width / HEX_OFFSET_WIDTH / (boardSize * 2 + 1)
    let ySize = this.parent.pixiApp.renderer.height / HEX_OFFSET_HEIGHT / (boardSize * 2 + 1)

    return Math.min(xSize, ySize)
  }
}
