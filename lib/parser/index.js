var lexer = require('./lexer');
var parser = require('./parser').LokeParser;

function tokenize(str) {
	lexer.setInput(str);

	var tokens = [];

	do {
		tokens.push([ lexer.lex(), lexer.yytext ]);
	} while(tokens[tokens.length - 1][0] != 1 && tokens[tokens.length - 1][0] != 0)

	if(tokens[tokens.length - 1][0] == 1)
		tokens.pop();

	if(tokens.length && tokens[tokens.length - 1][0] == 0)
		tokens[tokens.length - 1][0] = 'error';

	return tokens;
}

function parse(tokens) {
	if(typeof(tokens) == 'string')
		return parse(tokenize(tokens));

	// console.log(tokens);

	return parser.matchAll(tokens, 'program', undefined, console.error.bind('LokeParser:'), {});
}

exports.tokenize = tokenize;
exports.parse = parse;

exports.parser = parser;
exports.lexer = lexer;