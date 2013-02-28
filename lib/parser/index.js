var parser = require('./parser').LokeParser;

function parse(str) {
	return parser.matchAll(str, 'program', undefined, console.error.bind('LokeParser:'), {});
}

exports.parse = parse;

exports.parser = parser;