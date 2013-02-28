var Map = require('hashmap').HashMap;

var Args = (function() {
	function Args(p) {
		if(!(this instanceof Args)) {
			var self = Object.create(Args.prototype);
			Args.apply(self, arguments);
			return self;
		}

		this.positional = Array.isArray(p) ? p : [];
		this.keyword    = new Map;
	}

	return (function() {
		(function() {
			this.concat = function(oa) {
				var a = new Args(this.positional.concat(oa.positional));

				this.keyword.forEach(function(v, k) {
					a.keyword.set(k, v);
				});

				oa.keyword.forEach(function(v, k) {
					a.keyword.set(k, v);
				});

				console.log('concat:', this, oa);

				return a;
			};

			this.set = function(k, v) {
				if(Array.isArray(k) && k.length == 2)
					v = k[1], k = k[0];

				console.log('set:', k, v);

				this.keyword.set(k, v);

				return this;
			};
		}).call(this.prototype);

		return this;
	}).call(Args);
})();

exports = module.exports = Args;