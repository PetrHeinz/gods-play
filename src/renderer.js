const HEX_WIDTH = 148;
const HEX_HEIGHT = 130;
const HEX_OFFSET_X = 115;
const HEX_OFFSET_Y = 132;

class Renderer {

    /**
     * @param {Board} board
     * @param {Game} game
     */
    constructor(board, game) {
        /** @type {PIXI.Application} */
        this.pixiApp = new PIXI.Application()

        /** @type {Board} */
        this.board = board

        /** @type {Game} */
        this.game = game

        /** @type {PIXI.Sprite[]} */
        this.hexes = []
    }

    /**
     * @return {HTMLCanvasElement|WindowProxy|null}
     */
    getView() {
        return this.pixiApp.view
    }

    createBoard() {
        let self = this;
        PIXI.loader.add('hexGrass', 'assets/ryanshenk.hex.grass.png').load(function(loader, resources) {
            self.board.cells.forEach(function (cell) {
                let hex = self.createHex(cell, resources)
                self.pixiApp.stage.addChild(hex)
                self.hexes.push(hex)
            })
        });
        this.pixiApp.ticker.add(function() {
            self.hexes.forEach(function (hex) {
                hex.text.text = hex.cell.text
            })
        });
    }

    /**
     * @param {Cell} cell
     * @param {Resource[]} resources
     * @return {PIXI.Sprite}
     */
    createHex(cell, resources) {
        let hex = new PIXI.Sprite(resources.hexGrass.texture)

        hex.cell = cell
        hex.text = new PIXI.Text(cell.text)
        hex.addChild(hex.text)

        hex.pivot.x = HEX_WIDTH / 2
        hex.pivot.y = HEX_HEIGHT / 2

        let size = this.calculateSize()

        hex.width = size * HEX_WIDTH
        hex.height = size * HEX_HEIGHT

        let cubeCoordinate = cell.cubeCoordinate
        hex.x = size * HEX_OFFSET_X * cubeCoordinate.x + this.pixiApp.renderer.width / 2
        hex.y = size * HEX_OFFSET_Y * (cubeCoordinate.z + cubeCoordinate.x / 2) + this.pixiApp.renderer.height / 2
        addCoordinateAsText(hex, cubeCoordinate)

        hex.interactive = true
        let self = this
        hex.on('mouseup', function () {
            self.game.cellClick(this.cell)
        });

        return hex;

        function addCoordinateAsText(hex, cubeCoordinate) {
            let xText = new PIXI.Text(cubeCoordinate.x, {fontWeight: 900, fill: 'red'});
            xText.x = HEX_WIDTH - 50;
            xText.y = HEX_HEIGHT / 2 - 10;
            hex.addChild(xText);

            let yText = new PIXI.Text(cubeCoordinate.y, {fontWeight: 900, fill: 'green'});
            yText.x = 35;
            yText.y = 10;
            hex.addChild(yText);

            let zText = new PIXI.Text(cubeCoordinate.z, {fontWeight: 900, fill: 'blue'});
            zText.x = 35;
            zText.y = HEX_HEIGHT - 35;
            hex.addChild(zText);
        }
    };

    /**
     * @return {number}
     */
    calculateSize() {
        let xSize = this.pixiApp.renderer.width / HEX_OFFSET_X / (this.board.size * 2 + 1)
        let ySize = this.pixiApp.renderer.height / HEX_OFFSET_Y / (this.board.size * 2 + 1)

        return Math.min(xSize, ySize)
    };

}
