(function () {

    var HEX_WIDTH = 148;
    var HEX_HEIGHT = 130;
    var HEX_OFFSET_X = 115;
    var HEX_OFFSET_Y = 132;

    /**
     * @param {Board} board
     * @param {number} size
     * @param {Game} game
     * @constructor
     */
    Renderer = function (board, size, game) {
        this.pixiApp = new PIXI.Application();
        this.board = board;
        this.game = game;
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

        hex.width = HEX_WIDTH;
        hex.height = HEX_HEIGHT;

        var cubeCoordinate = cell.cubeCoordinate;
        hex.x = HEX_OFFSET_X * cubeCoordinate.x + this.pixiApp.renderer.width / 2;
        hex.y = HEX_OFFSET_Y * (cubeCoordinate.z + cubeCoordinate.x / 2) + this.pixiApp.renderer.height / 2;

        hex.interactive = true;
        var self = this;
        hex.on('mouseup', function () {
            self.game.cellClick(this.cell);
        });

        return hex;
    };

})();