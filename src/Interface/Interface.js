import HashMap from 'hashmap'
import MenuInterface from './MenuInterface'

const HEX_WIDTH = 148
const HEX_HEIGHT = 130
const HEX_OFFSET_X = 115
const HEX_OFFSET_Y = 132

export default class Interface {
  /**
   * @param {Game} game
   * @param {HTMLDocument} document
   */
  constructor (game, document) {
    /** @type {Game} */
    this.game = game

    /** @type {HTMLDocument} */
    this.document = document

    /** @type {PIXI.Application|null} */
    this.pixiApp = null

    /** @type {MenuInterface|null} */
    this.menu = null

    /** @type {HashMap} */
    this.hexesByCells = new HashMap()
  }

  initialize () {
    this.pixiApp = new PIXI.Application(
      this.document.body.offsetWidth,
      this.document.body.offsetHeight,
      {antialias: true}
    )
    this.menu = new MenuInterface(this.pixiApp.stage)

    this.document.body.appendChild(this.pixiApp.view)

    let self = this

    this.game.board.children.forEach(function (cell) {
      let hex = self.createHex(cell)

      self.pixiApp.stage.addChild(hex)
      self.hexesByCells.set(cell, hex)
    })

    this.game.events.listen('unitMove', function (data) {
      let hex = self.hexesByCells.get(data.unit.parent)

      hex.text.text = data.unit.config.symbol
      hex.text.style.stroke = data.unit.owner.color
      hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF

      self.hexesByCells.get(data.fromCell).text.text = ''
    })
    this.game.events.listen('unitAttack', function (data) {
      let hex = self.hexesByCells.get(data.unit.parent)

      hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF
    })
    this.game.events.listen('unitDied', function (data) {
      self.hexesByCells.get(data.onCell).text.text = ''
    })
    this.game.events.listen('unitCreated', function (data) {
      let hex = self.hexesByCells.get(data.unit.parent)

      hex.text.text = data.unit.config.symbol
      hex.text.style.stroke = data.unit.owner.color
      hex.text.style.fill = data.unit.tired ? 0xAAAAAA : 0xFFFFFF
    })

    let playerText = new PIXI.Text(
      getPlayerText(this.game.getPlayerOnTurn()),
      {fill: 0xFFFFFF}
    )
    self.pixiApp.stage.addChild(playerText)
    this.game.events.listen('endTurn', function (data) {
      playerText.text = getPlayerText(data.playerOnTurn)
      self.game.board.getUnitsOwnedBy(data.playerOnTurn)
        .forEach(function (unit) {
          self.hexesByCells.get(unit.parent).text.style.fill = unit.tired ? 0xAAAAAA : 0xFFFFFF
        })
    })

    this.menu.setActions(this.game.state.getActions())
    this.game.events.listen('newGameState', function (data) {
      self.menu.setActions(data.state.getActions())
    })

    /**
     * @param {Player} player
     * @return {string}
     */
    function getPlayerText (player) {
      return 'On turn: ' + player.name
    }
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

    hex.cell = cell

    let size = this.calculateSize()

    hex.width = size * HEX_WIDTH
    hex.height = size * HEX_HEIGHT

    let coordinate = cell.coordinate
    hex.x = size * HEX_OFFSET_X * coordinate.x + this.pixiApp.renderer.width / 2
    hex.y = size * HEX_OFFSET_Y * (coordinate.z + coordinate.x / 2) + this.pixiApp.renderer.height / 2
    addCoordinateAsText(hex, coordinate)

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
      self.game.cellClick(this.cell)
    })

    return hex

    function addCoordinateAsText (hex, coordinate) {
      let xText = new PIXI.Text(coordinate.x, getTextStyle(0xFF0000))
      xText.x = HEX_WIDTH - 50
      xText.y = HEX_HEIGHT / 2 - 10
      hex.addChild(xText)

      let yText = new PIXI.Text(coordinate.y, getTextStyle(0x00FF00))
      yText.x = 35
      yText.y = 10
      hex.addChild(yText)

      let zText = new PIXI.Text(coordinate.z, getTextStyle(0x0000FF))
      zText.x = 35
      zText.y = HEX_HEIGHT - 35
      hex.addChild(zText)
    }

    /**
     * @param {string} color
     * @return {PIXI.TextStyle}
     */
    function getTextStyle (color) {
      return new PIXI.TextStyle({
        fontWeight: 900,
        fill: color,
        dropShadow: true,
        dropShadowBlur: 15
      })
    }
  }

  /**
   * @return {number}
   */
  calculateSize () {
    let boardSize = this.game.board.gameConfig.boardSize

    let xSize = this.pixiApp.renderer.width / HEX_OFFSET_X / (boardSize * 2 + 1)
    let ySize = this.pixiApp.renderer.height / HEX_OFFSET_Y / (boardSize * 2 + 1)

    return Math.min(xSize, ySize)
  }
}
