esc \\
digit [0-9]

%%

\"(?:\\[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\" { yytext = yytext.substr(1,yyleng-2); return 'Text'; }
"'"(?:\\["'"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^"'"{esc}])*"'" { yytext = yytext.substr(1,yyleng-2); return 'Text'; }
\( return '(';
\) return ')';
\, return ',';
\[ return '[';
\] return ']';
\{ return '{';
\} return '}';
\n\r return 'Newline';
[\n\r] return 'Newline';
\. return 'Terminator';
\  return 'Seperator';
\: return ':';
\t return null;
"=>" return '=>';
{digit}+ return 'Int';
{digit}+\.{digit}+ return 'Decimal';
[^!?\n\t\r 0-9\.\(\)\=][^\n\t\r \.\(\)\=]* return 'Identifier';

%%

exports = module.exports = lexer;