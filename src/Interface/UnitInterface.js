import { HEX_HEIGHT, HEX_WIDTH } from './CellInterface'
const SYMBOL_SIZE = 0.75 * HEX_HEIGHT
const HEALTH_OFFSET_RATIO = 0.9

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

    /** @type {function[]} */
    this.updateTiredCallbacks = []

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
    this.updateTiredCallbacks.push(() => {
      symbol.style.stroke = this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
    })

    let maxHealth = this.createHealthText(this.unit.config.maxHealth)
    maxHealth.x = HEALTH_OFFSET_RATIO * symbol.width / 2
    maxHealth.y = HEALTH_OFFSET_RATIO * symbol.height / 2
    symbol.addChild(maxHealth)

    let separator = this.createHealthText('/')
    separator.x = HEALTH_OFFSET_RATIO * (symbol.width / 2 - maxHealth.width)
    separator.y = HEALTH_OFFSET_RATIO * symbol.height / 2
    symbol.addChild(separator)

    let health = this.createHealthText(this.unit.health)
    health.style.fill = this.unit.owner.color
    health.x = HEALTH_OFFSET_RATIO * (symbol.width / 2 - maxHealth.width - separator.width)
    health.y = HEALTH_OFFSET_RATIO * symbol.height / 2
    symbol.addChild(health)

    return symbol
  }

  /**
   * @param {string} text
   * @return {PIXI.Text}
   */
  createHealthText (text) {
    let healthText = new PIXI.Text(text, {
      stroke: this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED,
      strokeThickness: SYMBOL_SIZE / 10,
      fontSize: SYMBOL_SIZE / 4,
      fontWeight: 'bold'
    })
    healthText.anchor = new PIXI.Point(1, 1)
    this.updateTiredCallbacks.push(() => {
      healthText.style.stroke = this.unit.tired ? COLOR_UNIT_TIRED : COLOR_UNIT_RESTED
    })

    return healthText
  }

  updateTired () {
    this.updateTiredCallbacks.forEach(updateTiredCallback => updateTiredCallback())
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
