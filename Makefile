build-parser-dev:
	node node_modules/ometajs/bin/ometajs2js -i lib/parser/lexer.ometajs -o lib/parser/lexer.js -b
	node node_modules/ometajs/bin/ometajs2js -i lib/parser/parser.ometajs -o lib/parser/parser.js -b

build-parser:
	node node_modules/ometajs/bin/ometajs2js -i lib/parser/lexer.ometajs -o lib/parser/lexer.js
	node node_modules/ometajs/bin/ometajs2js -i lib/parser/parser.ometajs -o lib/parser/parser.js