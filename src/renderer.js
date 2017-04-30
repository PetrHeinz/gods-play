import HashMap from 'hashmap'
import MenuUI from './menu-ui'

const HEX_WIDTH = 148
const HEX_HEIGHT = 130
const HEX_OFFSET_X = 115
const HEX_OFFSET_Y = 132

export default class Renderer {
  /**
   * @param {Game} game
   */
  constructor (game) {
    /** @type {PIXI.Application} */
    this.pixiApp = new PIXI.Application()

    /** @type {Game} */
    this.game = game

    /** @type {MenuUI} */
    this.menu = new MenuUI(this.pixiApp.stage)

    /** @type {HashMap} */
    this.hexesByCells = new HashMap()
  }

  /**
   * @return {HTMLCanvasElement|WindowProxy|null}
   */
  getView () {
    return this.pixiApp.view
  }

  createBoard () {
    let self = this

    this.game.board.children.forEach(function (cell) {
      if (PIXI.loader.resources[('hex.' + cell.config.terrain)] === undefined) {
        PIXI.loader.add('hex.' + cell.config.terrain, 'assets/ryanshenk.hex.' + cell.config.terrain + '.png')
      }
    })
    PIXI.loader.load(function (loader, resources) {
      self.game.board.children.forEach(function (cell) {
        let hex = self.createHex(cell, resources)
        self.pixiApp.stage.addChild(hex)
        self.hexesByCells.set(cell, hex)
      })
    })
    this.game.events.listen('unitMove', function (data) {
      self.hexesByCells.get(data.unit.parent).text.text = data.unit.config.symbol
      self.hexesByCells.get(data.unit.parent).text.style.stroke = data.unit.owner.color
      self.hexesByCells.get(data.fromCell).text.text = ''
    })
    this.game.events.listen('unitCreated', function (data) {
      self.hexesByCells.get(data.unit.parent).text.text = data.unit.config.symbol
      self.hexesByCells.get(data.unit.parent).text.style.stroke = data.unit.owner.color
    })

    let playerText = new PIXI.Text(
      getPlayerText(this.game.getPlayerOnTurn()),
      {fill: '#FFFFFF'}
    )
    self.pixiApp.stage.addChild(playerText)
    this.game.events.listen('endTurn', function (data) {
      playerText.text = getPlayerText(data.playerOnTurn)
    })

    this.menu.setItems(this.game.gameState.getMenuItems())
    this.game.events.listen('newGameState', function (data) {
      self.menu.setItems(data.gameState.getMenuItems())
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
   * @param {Resource[]} resources
   * @return {PIXI.Sprite}
   */
  createHex (cell, resources) {
    let hex = new PIXI.Sprite(resources['hex.' + cell.config.terrain].texture)

    hex.cell = cell

    hex.pivot.x = HEX_WIDTH / 2
    hex.pivot.y = HEX_HEIGHT / 2

    let size = this.calculateSize()

    hex.width = size * HEX_WIDTH
    hex.height = size * HEX_HEIGHT

    let coordinate = cell.coordinate
    hex.x = size * HEX_OFFSET_X * coordinate.x + this.pixiApp.renderer.width / 2
    hex.y = size * HEX_OFFSET_Y * (coordinate.z + coordinate.x / 2) + this.pixiApp.renderer.height / 2
    addCoordinateAsText(hex, coordinate)

    hex.text = new PIXI.Text(cell.unit !== null ? cell.unit.config.symbol : '', {
      fill: '#FFFFFF',
      stroke: cell.unit !== null ? cell.unit.owner.color : '#FFFFFF',
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
      let xText = new PIXI.Text(coordinate.x, getTextStyle('#FF0000'))
      xText.x = HEX_WIDTH - 50
      xText.y = HEX_HEIGHT / 2 - 10
      hex.addChild(xText)

      let yText = new PIXI.Text(coordinate.y, getTextStyle('#00FF00'))
      yText.x = 35
      yText.y = 10
      hex.addChild(yText)

      let zText = new PIXI.Text(coordinate.z, getTextStyle('#0000FF'))
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
