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
  }

  initialize () {
    this.createSymbol()

    let self = this
    this.game.events.listen('unitMoved', function (data) {
      if (self.unit === data.unit) {
        let previousHex = self.boardInterface.interfacesMap.get(data.fromCell).hex
        previousHex.removeChild(self.symbol)

        let currentHex = self.boardInterface.interfacesMap.get(self.unit.parent).hex
        currentHex.addChild(self.symbol)

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

  createSymbol () {
    let hex = this.boardInterface.interfacesMap.get(this.unit.parent).hex

    this.symbol = new PIXI.Text(this.unit.config.symbol, {
      fill: this.unit.owner.color,
      stroke: this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED,
      strokeThickness: SYMBOL_SIZE / 10,
      fontSize: SYMBOL_SIZE,
      miterLimit: SYMBOL_SIZE / 10,
      dropShadow: true,
      dropShadowBlur: SYMBOL_SIZE / 5
    })
    this.symbol.x = HEX_WIDTH / 2
    this.symbol.y = HEX_HEIGHT / 2
    this.symbol.anchor = new PIXI.Point(0.5, 0.5)

    hex.addChild(this.symbol)
  }

  updateTired () {
    this.symbol.style.stroke = this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
  }
}
