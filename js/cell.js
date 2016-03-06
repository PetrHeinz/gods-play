(function() {
	
	Cell = function(rimwards, clockwise, cellType) {
		this.rimwards = rimwards;
		this.clockwise = clockwise;
		this.unitUpper = null;
		this.unitLower = null;
		this.player = null;
		this.health = new Resource(100);
		this.mana = new Resource(10);
		this.cellType = cellType;
		this.neighbours = [];
	};
	
})();