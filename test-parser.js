var util = require('util');

var parser = require('./lib/parser');

// parse('123');

// parse('123("abc") HelloWorld');

// parse('"hello world" print');

// parse('"Hello" print. "World" print');

// parse('[ "Hello", "World" ] join(" ")');

// parse('print("hello")');

parse('{ a: b }');

// parse('a => b'); // Not Working 2/5/2013 10:28

function print(chain) {
	console.log(util.inspect(chain, false, null, true));
}

function parse(str) {
	console.log('%s:', str);
	print(parser.parse(str));
}