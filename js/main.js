(function($) {
	
	$(document).ready(function() {
		
		var boardSize = 5;
		var boardGenerator = new BoardGenerator();
		
		var board = boardGenerator.generateBoard(boardSize);
		console.log(board);
		
		var renderer = new Renderer(board, $('#game-board'), 80);
		renderer.createBoard();
		
		$('#game-board').on('click', '.cell', function() {
			var cellId = $(this).data('cellId');
			var cell = board.cells[cellId];
			cell.text = 'clicked!!!';
			renderer.updateBoard();
		});
		
	});
	
})(jQuery);