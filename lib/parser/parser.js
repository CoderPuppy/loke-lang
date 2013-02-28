var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var Message = require("../message");

var Symbol = require("../symbol");

var Args = require("../args");

var Lexer = require("./lexer").IokeLexer;

var LokeParser = function LokeParser(source, opts) {
    AbstractGrammar.call(this, source, opts);
};

LokeParser.grammarName = "LokeParser";

LokeParser.match = AbstractGrammar.match;

LokeParser.matchAll = AbstractGrammar.matchAll;

exports.LokeParser = LokeParser;

require("util").inherits(LokeParser, AbstractGrammar);

LokeParser.prototype["program"] = function $program() {
    var mc;
    return this._optional(function() {
        return this._rule("messageChain", false, [], null, this["messageChain"]);
    }) && (mc = this._getIntermediate(), true) && this._exec(mc || []);
};

LokeParser.prototype["messageChain"] = function $messageChain() {
    return this._atomic(function() {
        var e, m;
        return this._rule("expression", false, [], null, this["expression"]) && (e = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("seperator", false, [], null, this["seperator"]);
            });
        }) && this._rule("messageChain", false, [], null, this["messageChain"]) && (m = this._getIntermediate(), true) && this._exec([ e ].concat(m));
    }) || this._atomic(function() {
        var e, t, m;
        return this._rule("expression", false, [], null, this["expression"]) && (e = this._getIntermediate(), true) && this._rule("terminator", false, [], null, this["terminator"]) && (t = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("seperator", false, [], null, this["seperator"]);
            });
        }) && this._rule("messageChain", false, [], null, this["messageChain"]) && (m = this._getIntermediate(), true) && this._exec([ e, t ].concat(m));
    }) || this._atomic(function() {
        var t, m;
        return this._rule("terminator", false, [], null, this["terminator"]) && (t = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("seperator", false, [], null, this["seperator"]);
            });
        }) && this._rule("messageChain", false, [], null, this["messageChain"]) && (m = this._getIntermediate(), true) && this._exec([ t ].concat(m));
    }) || this._atomic(function() {
        var e;
        return this._rule("expression", false, [], null, this["expression"]) && (e = this._getIntermediate(), true) && this._exec([ e ]);
    });
};

LokeParser.prototype["expression"] = function $expression() {
    return this._atomic(function() {
        return this._rule("brackets", false, [], null, this["brackets"]);
    }) || this._atomic(function() {
        return this._rule("assoc", false, [], null, this["assoc"]);
    }) || this._atomic(function() {
        return this._rule("message", false, [], null, this["message"]);
    });
};

LokeParser.prototype["literal"] = function $literal() {
    return this._atomic(function() {
        return this._rule("text", false, [], null, this["text"]);
    }) || this._atomic(function() {
        return this._rule("int", false, [], null, this["int"]);
    }) || this._atomic(function() {
        return this._rule("decimal", false, [], null, this["decimal"]);
    });
};

LokeParser.prototype["message"] = function $message() {
    return this._atomic(function() {
        var id, args;
        return this._rule("identifier", false, [], null, this["identifier"]) && (id = this._getIntermediate(), true) && this._rule("openParen", false, [], null, this["openParen"]) && this._rule("commated", false, [], null, this["commated"]) && (args = this._getIntermediate(), true) && this._rule("closeParen", false, [], null, this["closeParen"]) && this._exec(new Message(id, args));
    }) || this._atomic(function() {
        var id;
        return this._rule("identifier", false, [], null, this["identifier"]) && (id = this._getIntermediate(), true) && this._exec(new Message(id, new Args));
    }) || this._atomic(function() {
        var id, args;
        return this._rule("literal", false, [], null, this["literal"]) && (id = this._getIntermediate(), true) && this._rule("openParen", false, [], null, this["openParen"]) && this._rule("commated", false, [], null, this["commated"]) && (args = this._getIntermediate(), true) && this._rule("closeParen", false, [], null, this["closeParen"]) && this._exec(new Message(id, args));
    }) || this._atomic(function() {
        var id;
        return this._rule("literal", false, [], null, this["literal"]) && (id = this._getIntermediate(), true) && this._exec(new Message(id, new Args));
    });
};

LokeParser.prototype["commated"] = function $commated() {
    return this._atomic(function() {
        var ka, c;
        return this._rule("keywordArg", false, [], null, this["keywordArg"]) && (ka = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("comma", false, [], null, this["comma"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("commated", false, [], null, this["commated"]) && (c = this._getIntermediate(), true) && this._exec((new Args).set(ka).concat(c));
    }) || this._atomic(function() {
        var ka;
        return this._rule("keywordArg", false, [], null, this["keywordArg"]) && (ka = this._getIntermediate(), true) && this._exec((new Args).set(ka));
    }) || this._atomic(function() {
        var mc, c;
        return this._rule("messageChain", false, [], null, this["messageChain"]) && (mc = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("comma", false, [], null, this["comma"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("commated", false, [], null, this["commated"]) && (c = this._getIntermediate(), true) && this._exec((new Args([ mc ])).concat(c));
    }) || this._atomic(function() {
        var mc;
        return this._rule("messageChain", false, [], null, this["messageChain"]) && (mc = this._getIntermediate(), true) && this._exec(new Args([ mc ]));
    }) || this._atomic(function() {
        return this._exec(new Args);
    });
};

LokeParser.prototype["brackets"] = function $brackets() {
    return this._atomic(function() {
        var args;
        return this._rule("openSquare", false, [], null, this["openSquare"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("commated", false, [], null, this["commated"]) && (args = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("closeSquare", false, [], null, this["closeSquare"]) && this._exec(new Message(new Symbol("[]"), args));
    }) || this._atomic(function() {
        var args;
        return this._rule("openCurly", false, [], null, this["openCurly"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("commated", false, [], null, this["commated"]) && (args = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("whitespace", false, [], null, this["whitespace"]);
            });
        }) && this._rule("closeCurly", false, [], null, this["closeCurly"]) && this._exec(new Message(new Symbol("{}"), args));
    });
};

LokeParser.prototype["keywordArg"] = function $keywordArg() {
    var id, e;
    return this._rule("identifier", false, [], null, this["identifier"]) && (id = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("whitespace", false, [], null, this["whitespace"]);
        });
    }) && this._rule("colon", false, [], null, this["colon"]) && this._any(function() {
        return this._atomic(function() {
            return this._rule("whitespace", false, [], null, this["whitespace"]);
        });
    }) && this._rule("expression", false, [], null, this["expression"]) && (e = this._getIntermediate(), true) && this._exec([ id, e ]);
};

LokeParser.prototype["assoc"] = function $assoc() {
    var k, e;
    return this._rule("expression", false, [], null, this["expression"]) && (k = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("whitespace", false, [], null, this["whitespace"]);
        });
    }) && this._rule("hashrocket", false, [], null, this["hashrocket"]) && this._any(function() {
        return this._atomic(function() {
            return this._rule("whitespace", false, [], null, this["whitespace"]);
        });
    }) && this._rule("expression", false, [], null, this["expression"]) && (e = this._getIntermediate(), true) && this._exec([ k, e ]);
};

LokeParser.prototype["whitespace"] = function $whitespace() {
    return this._atomic(function() {
        return this._rule("newline", false, [], null, this["newline"]);
    }) || this._atomic(function() {
        return this._rule("seperator", false, [], null, this["seperator"]);
    });
};

LokeParser.prototype["identifier"] = function $identifier() {
    var id;
    return this._rule("foreign", true, [ Lexer, "identifier" ], null, this["foreign"]) && (id = this._getIntermediate(), true) && this._exec(new Symbol(id));
};

LokeParser.prototype["seperator"] = function $seperator() {
    return this._rule("foreign", true, [ Lexer, "seperator" ], null, this["foreign"]);
};

LokeParser.prototype["newline"] = function $newline() {
    return this._rule("foreign", true, [ Lexer, "newline" ], null, this["foreign"]);
};

LokeParser.prototype["openParen"] = function $openParen() {
    return this._rule("foreign", true, [ Lexer, "openParen" ], null, this["foreign"]);
};

LokeParser.prototype["closeParen"] = function $closeParen() {
    return this._rule("foreign", true, [ Lexer, "closeParen" ], null, this["foreign"]);
};

LokeParser.prototype["openCurly"] = function $openCurly() {
    return this._rule("token", true, [ "{" ], null, this["token"]);
};

LokeParser.prototype["closeCurly"] = function $closeCurly() {
    return this._rule("token", true, [ "}" ], null, this["token"]);
};

LokeParser.prototype["openSquare"] = function $openSquare() {
    return this._rule("foreign", true, [ Lexer, "openSquare" ], null, this["foreign"]);
};

LokeParser.prototype["closeSquare"] = function $closeSquare() {
    return this._rule("foreign", true, [ Lexer, "closeSquare" ], null, this["foreign"]);
};

LokeParser.prototype["comma"] = function $comma() {
    return this._rule("foreign", true, [ Lexer, "comma" ], null, this["foreign"]);
};

LokeParser.prototype["hashrocket"] = function $hashrocket() {
    return this._rule("foreign", true, [ Lexer, "hashrocket" ], null, this["foreign"]);
};

LokeParser.prototype["colon"] = function $colon() {
    return this._rule("foreign", true, [ Lexer, "colon" ], null, this["foreign"]);
};

LokeParser.prototype["text"] = function $text() {
    var txt;
    return this._rule("token", true, [ "Text" ], null, this["token"]) && (txt = this._getIntermediate(), true) && this._exec(txt);
};

LokeParser.prototype["decimal"] = function $decimal() {
    var n;
    return this._rule("token", true, [ "Decimal" ], null, this["token"]) && (n = this._getIntermediate(), true) && this._exec(parseFloat(n));
};

LokeParser.prototype["int"] = function $int() {
    var n;
    return this._rule("token", true, [ "Int" ], null, this["token"]) && (n = this._getIntermediate(), true) && this._exec(parseInt(n));
};

LokeParser.prototype["terminator"] = function $terminator() {
    return (this._atomic(function() {
        return this._rule("foreign", true, [ Lexer, "terminator" ], null, this["foreign"]);
    }) || this._atomic(function() {
        return this._rule("newline", false, [], null, this["newline"]);
    })) && this._exec(new Message(".", new Args));
};