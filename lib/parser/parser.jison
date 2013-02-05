%{
var Message = require('./message');
var Symbol  = require('./symbol');
%}

%start program

/*%lex

esc \\
digit [0-9]

%%

\"(?:\\[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\" { yytext = yytext.substr(1,yyleng-2); return 'Text'; }
\( return '(';
\) return ')';
\, return ',';
\[ return '[';
\] return ']';
\{ return '{';
\} return '}';
{digit}+ return 'Int';
{digit}+\.{digit}+ return 'Decimal';
[^!?\n\t\r 0-9\.][^\n\t\r \.]* return 'Identifier';
\n\r return 'Terminator';
[\.\n\r] return 'Terminator';
\  return 'Seperator';
\: return ':';
\t return null;

/lex*/

/* Association */

%%

program: messageChain? { return $messageChain || []; };

messageChain: expression Seperator+ messageChain { $$ = [ $expression ].concat($messageChain); }
            | expression terminator Seperator* messageChain? { $$ = [ $expression, $terminator ].concat($messageChain || []); }
            | terminator Seperator* messageChain? { $$ = [ $terminator ].concat($messageChain || []); }
            | expression? { $$ = [ $expression ].filter(Boolean); };

terminator: Terminator { $$ = new Message('.', []); };

expression: message | brackets;

literal: Text { $$ = $Text; } | Regexp | Int { $$ = parseInt($Int); } | Decimal { $$ = parseFloat($Decimal); } | Unit;

message: identifier "(" commated? ")" { $$ = new Message($identifier, $commated || []); }
       | identifier { $$ = new Message($identifier, []); }
       | literal "(" commated? ")" { $$ = new Message($literal, $commated || []) }
       | literal { $$ = new Message($literal, []) };

commated: messageChain "," commated { $$ = [ $messageChain ].concat($commated); }
        | messageChain { $$ = [ $messageChain ]; }
        | { $$ = []; };

brackets: ( "[" Seperator* commated Seperator* "]" ) { $$ = new Message(new Symbol('[]'), $commated) }
        | ( "{" commated "}" );

identifier: Identifier { $$ = new Symbol($Identifier); };

%%