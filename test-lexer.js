var Lexer = require('./lib/parser/lexer').IokeLexer;

function lex(rule, str) { return Lexer.matchAll(str, rule); }

lex.Lexer = Lexer;

require('repl').start({}).context.lex = lex;