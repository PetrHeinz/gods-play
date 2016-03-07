(function() {
	
	var VERTICAL_RATIO = 0.8;
	var BORDER_RATIO = 0.2;
	var MARGIN_RATIO = 0.05;
	
	Renderer = function(board, $board, size, backgroundColors) {
		this.board = board;
		this.$board = $board;
		this.width = size;
		this.height = VERTICAL_RATIO * size;
		this.border = BORDER_RATIO * size;
		this.marginX = MARGIN_RATIO * size;
		this.marginY = MARGIN_RATIO * VERTICAL_RATIO * size;
		this.backgroundColors = backgroundColors;
	};
	
	Renderer.prototype.createBoard = function() {
		
		for (var cellId in this.board.cells) {
			var cell = this.board.cells[cellId];
			
			// @todo
			var xc = 0;
			var yc = 0;
			
			var x = xc + this.board.size;
			var y = yc + this.board.size;
				
			var backgroundColor = this.backgroundColors[cell.rimwards % this.backgroundColors.length];
			
			var $cell = createCell(this.width, this.height, cellId, backgroundColor);
			$cell.css({
				left: (x + Math.abs(y - this.board.size) / 2) * (this.width + this.marginX) + this.border,
				top: y * (this.height + this.marginY) + this.border
			});
			this.$board.append($cell);
			
		}
		
		/* At least this renders a hexagon
		var cellId = 0;
		for (var y = 0; y < 2 * this.board.size + 1; y++) {
			for (var x = 0; x < 2 * this.board.size - Math.abs(y - this.board.size) + 1; x++) {
				
				var $cell = createCell(this.width, this.height, cellId++);
				$cell.css({
					left: (x + Math.abs(y - this.board.size) / 2) * (this.width + this.marginX) + this.border,
					top: y * (this.height + this.marginY) + this.border
				});
				this.$board.append($cell);
				
			}
		}
		*/
		
		this.updateBoard();
	};
	
	Renderer.prototype.updateBoard = function() {
		
		var $cells = this.$board.children();
		
		for (var cellId in this.board.cells) {
			
			var cell = this.board.cells[cellId];
			var $cell = $cells.eq(cellId);
			updateCell(cell, $cell);
			
		}
		
	};
		
	function createCell(width, height, cellId, backgroundColor) {
		
		return $('<div>')
			.addClass('cell')
			.data('cellId', cellId)
			.css({
				width: width,
				height: height,
				backgroundColor: backgroundColor
			});
			
	}
		
	function updateCell(cell, $cell) {
		var content = (cell.text !== undefined ? cell.text : '') + '<br/>' + 'CW: ' + cell.clockwise + '<br/>' + 'RW: ' + cell.rimwards;
		
		$cell.html(content);
		
	}
	
})();