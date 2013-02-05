var Args = require('./args');

var Message = (function() {
	function Message(name, args) {
		if(!(this instanceof Message)) {
			var self = Object.create(Message.prototype);
			Message.apply(self, arguments);
			return self;
		}
		
		this.name = name;
		this.args = args instanceof Args ? args : new Args;
	}

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(Message);
})();

exports = module.exports = Message;