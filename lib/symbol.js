var util = require('util');

var Symbol = (function() {
	function Symbol(s) {
		if(!(this instanceof Symbol)) {
			var self = Object.create(Symbol.prototype);
			Symbol.apply(self, arguments);
			return self;
		}
		
		this.str = s;
	}
	util.inherits(Symbol, String);

	return (function() {
		(function() {
			this.toString = function() {
				return this.str;
			};

			this.toSym = function() { return this; };
		}).call(this.prototype);

		return this;
	}).call(Symbol);
})();

exports = module.exports = Symbol;