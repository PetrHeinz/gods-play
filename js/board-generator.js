(function() {
	
	BoardGenerator = function() {};
	
	BoardGenerator.prototype.generateBoard = function(boardSize) {
		
		var cells = [generateCell(0, 0)];
		
		for (var rimwards = 1; rimwards <= boardSize; rimwards++) {
			for (var clockwise = 1; clockwise <= 6 * rimwards; clockwise++) {
				cells.push(generateCell(rimwards, clockwise));
			}
		}
		
		for (var cellId in cells) {
			var cell = cells[cellId];
			cell.neighbours;
		}
		
		var board = new Board(boardSize, cells);
		
		return board;
		
	};
		
	function generateCell(rimwards, clockwise) {
		
		var cellType = new CellType();
		var cell = new Cell(rimwards, clockwise, cellType);
		
		return cell;
		
	}
	
})();