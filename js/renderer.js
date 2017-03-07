(function () {

    var VERTICAL_RATIO = 0.8;
    var BORDER_RATIO = 0.2;
    var MARGIN_RATIO = 0.05;

    /**
     * @param {Board} board
     * @param {number} size
     * @param {Game} game
     * @constructor
     */
    Renderer = function (board, size, game) {
        this.pixiApp = new PIXI.Application();
        this.board = board;
        this.width = size;
        this.height = VERTICAL_RATIO * size;
        this.border = BORDER_RATIO * size;
        this.marginX = MARGIN_RATIO * size;
        this.marginY = MARGIN_RATIO * VERTICAL_RATIO * size;
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
        PIXI.loader.add('hexGrass', 'assets/ryanshenk.hex.grass.jpg').load(function(loader, resources) {
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

        var cubeCoordinate = cell.cubeCoordinate;
        hex.x = (cubeCoordinate.x + this.board.size) * (this.width + this.marginX) + this.border;
        hex.y = (cubeCoordinate.z + cubeCoordinate.x / 2 + this.board.size) * (this.height + this.marginY) + this.border;

        hex.height = this.height;
        hex.width = this.width;

        hex.interactive = true;
        var self = this;
        hex.on('mouseup', function () {
            self.game.cellClick(this.cell);
        });

        return hex;
    };

})();