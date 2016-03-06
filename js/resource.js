(function() {
	
	Resource = function(maxValue) {
		this.value = maxValue;
		this.maxValue = maxValue;
	};

	Resource.prototype.refill = function(value) {
		if (value === undefined || this.value + value > this.maxValue) {
			this.value = this.maxValue;
		}
		this.value += value;
		
		return this;
	}

	Resource.prototype.use = function(value) {
		if (value < this.value) {
			throw new Exception('Insufficient funds.');
		}
		this.value -= value;
		
		return this;
	}
	
})();