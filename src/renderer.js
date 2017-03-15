var Renderer;

(function () {

    var HEX_WIDTH = 148;
    var HEX_HEIGHT = 130;
    var HEX_OFFSET_X = 115;
    var HEX_OFFSET_Y = 132;

    /**
     * @param {Board} board
     * @param {Game} game
     * @constructor
     */
    Renderer = function (board, game) {

        /**
         * @member {PIXI.Application}
         */
        this.pixiApp = new PIXI.Application();

        /**
         * @member {Board}
         */
        this.board = board;

        /**
         * @member {Game}
         */
        this.game = game;

        /**
         * @member {PIXI.Sprite[]}
         */
        this.hexes = [];
    };

    /**
     * @return {HTMLCanvasElement|WindowProxy|null}
     */
    Renderer.prototype.getView = function () {
        return this.pixiApp.view;
    };

    Renderer.prototype.createBoard = function () {
        var self = this;
        PIXI.loader.add('hexGrass', 'assets/ryanshenk.hex.grass.png').load(function(loader, resources) {
            for (var i in self.board.cells) {
                var cell = self.board.cells[i];
                var hex = self.createHex(cell, resources);

                self.pixiApp.stage.addChild(hex);
                self.hexes.push(hex);
            }
        });
        this.pixiApp.ticker.add(function() {
            for (var i in self.hexes) {
                var hex = self.hexes[i];
                hex.text.text = hex.cell.text;
            }
        });
    };

    /**
     * @param {Cell} cell
     * @param {Resource[]} resources
     * @return {PIXI.Sprite}
     */
    Renderer.prototype.createHex = function (cell, resources) {
        var hex = new PIXI.Sprite(resources.hexGrass.texture);

        hex.cell = cell;
        hex.text = new PIXI.Text(cell.text);
        hex.addChild(hex.text);

        hex.pivot.x = HEX_WIDTH / 2;
        hex.pivot.y = HEX_HEIGHT / 2;

        var size = this.calculateSize();

        hex.width = size * HEX_WIDTH;
        hex.height = size * HEX_HEIGHT;

        var cubeCoordinate = cell.cubeCoordinate;
        hex.x = size * HEX_OFFSET_X * cubeCoordinate.x + this.pixiApp.renderer.width / 2;
        hex.y = size * HEX_OFFSET_Y * (cubeCoordinate.z + cubeCoordinate.x / 2) + this.pixiApp.renderer.height / 2;
        addCoordinateAsText(hex, cubeCoordinate);

        hex.interactive = true;
        var self = this;
        hex.on('mouseup', function () {
            self.game.cellClick(this.cell);
        });

        return hex;
    };

    /**
     * @param {PIXI.Sprite} hex
     * @param {CubeCoordinate} cubeCoordinate
     */
    var addCoordinateAsText = function (hex, cubeCoordinate) {
        var xText = new PIXI.Text(cubeCoordinate.x, {fontWeight: 900, fill: 'red'});
        xText.x = HEX_WIDTH - 50;
        xText.y = HEX_HEIGHT / 2 - 10;
        hex.addChild(xText);

        var yText = new PIXI.Text(cubeCoordinate.y, {fontWeight: 900, fill: 'green'});
        yText.x = 35;
        yText.y = 10;
        hex.addChild(yText);

        var zText = new PIXI.Text(cubeCoordinate.z, {fontWeight: 900, fill: 'blue'});
        zText.x = 35;
        zText.y = HEX_HEIGHT - 35;
        hex.addChild(zText);
    };

    /**
     * @return {number}
     */
    Renderer.prototype.calculateSize = function () {
        var xSize = this.pixiApp.renderer.width / HEX_OFFSET_X / (this.board.size * 2 + 1);
        var ySize = this.pixiApp.renderer.height / HEX_OFFSET_Y / (this.board.size * 2 + 1);

        return Math.min(xSize, ySize);
    };

})();