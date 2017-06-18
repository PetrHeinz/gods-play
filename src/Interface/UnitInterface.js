import { HEX_HEIGHT, HEX_WIDTH } from './CellInterface'
const SYMBOL_SIZE = 0.75 * HEX_HEIGHT

const COLOR_UNIT_RESTED = 0xFFFFFF
const COLOR_UNIT_TIRED = 0x666666

export default class UnitInterface {
  /**
   * @param {Unit} unit
   * @param {BoardInterface} boardInterface
   * @param {Game} game
   */
  constructor (unit, boardInterface, game) {
    /** @type {Unit} */
    this.unit = unit

    /** @type {BoardInterface} */
    this.boardInterface = boardInterface

    /** @type {Game} */
    this.game = game

    /** @type {PIXI.Text|null} */
    this.symbol = null

    /** @type {PIXI.Graphics|null} */
    this.onHex = null
  }

  initialize () {
    this.symbol = this.createSymbol()
    this.updateParent()

    let self = this
    this.game.events.listen('unitMoved', function (data) {
      if (self.unit === data.unit) {
        self.updateParent()
        self.updateTired()
      }
    })
    this.game.events.listen('unitAttacked', function (data) {
      if (self.unit === data.unit) {
        self.updateTired()
      }
    })
    this.game.events.listen('turnEnded', function () {
      self.updateTired()
    })
  }

  /**
   * @return {PIXI.Text}
   */
  createSymbol () {
    let symbol = new PIXI.Text(this.unit.config.symbol, {
      fill: this.unit.owner.color,
      stroke: this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED,
      strokeThickness: SYMBOL_SIZE / 10,
      fontSize: SYMBOL_SIZE,
      miterLimit: SYMBOL_SIZE / 10,
      dropShadow: true,
      dropShadowBlur: SYMBOL_SIZE / 5
    })
    symbol.x = HEX_WIDTH / 2
    symbol.y = HEX_HEIGHT / 2
    symbol.anchor = new PIXI.Point(0.5, 0.5)

    return symbol
  }

  updateTired () {
    this.symbol.style.stroke = this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
  }

  updateParent () {
    if (this.onHex !== null) {
      this.remove()
    }
    this.onHex = this.getHex(this.unit.parent)
    this.onHex.addChild(this.symbol)
  }

  /**
   * @param {Cell} cell
   * @return {PIXI.Graphics}
   */
  getHex (cell) {
    return this.boardInterface.findCellInterface(cell).hex
  }

  remove () {
    this.onHex.removeChild(this.symbol)
  }
}
