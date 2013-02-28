var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var IokeLexer = function IokeLexer(source, opts) {
    AbstractGrammar.call(this, source, opts);
};

IokeLexer.grammarName = "IokeLexer";

IokeLexer.match = AbstractGrammar.match;

IokeLexer.matchAll = AbstractGrammar.matchAll;

exports.IokeLexer = IokeLexer;

require("util").inherits(IokeLexer, AbstractGrammar);

IokeLexer.prototype["sChar"] = function $sChar() {
    return this._atomic(function() {
        var c;
        return this._match("\\") && this._rule("char", false, [], null, this["char"]) && (c = this._getIntermediate(), true) && this._exec(JSON.parse("'\\" + c + "'"));
    }) || this._atomic(function() {
        var c;
        return this._rule("char", false, [], null, this["char"]) && (c = this._getIntermediate(), true) && this._exec(c);
    });
};

IokeLexer.prototype["iStartChar"] = function $iStartChar() {
    var c;
    return this._rule("char", false, [], null, this["char"]) && (c = this._getIntermediate(), true) && !(c >= "0" && c <= "9" || c == "." || c == "!" || c == "?" || c == " " || c == "	" || c == "\n" || c == "" || c == "(" || c == ")" || c == "[" || c == "]" || c == "=");
};

IokeLexer.prototype["iEndChar"] = function $iEndChar() {
    return this._atomic(function() {
        var c;
        return this._rule("iChar", false, [], null, this["iChar"]) && (c = this._getIntermediate(), true) && !(c == ":");
    }) || this._match("!") || this._match("?");
};

IokeLexer.prototype["iChar"] = function $iChar() {
    return this._atomic(function() {
        return this._rule("iStartChar", false, [], null, this["iStartChar"]);
    }) || this._atomic(function() {
        return this._rule("digit", false, [], null, this["digit"]);
    });
};

IokeLexer.prototype["identifier"] = function $identifier() {
    return this._atomic(function() {
        return this._rule("iStartChar", false, [], null, this["iStartChar"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("iChar", false, [], null, this["iChar"]);
            });
        }) && this._rule("iEndChar", false, [], null, this["iEndChar"]);
    }) || this._atomic(function() {
        return this._rule("iStartChar", false, [], null, this["iStartChar"]) && this._optional(function() {
            return this._rule("iEndChar", false, [], null, this["iEndChar"]);
        });
    }) || this._atomic(function() {
        return this._rule("operator", false, [], null, this["operator"]);
    });
};

IokeLexer.prototype["operator"] = function $operator() {
    return this._match("/") || this._match("|") || this._atomic(function() {
        return this._match("|") && this._match("|");
    }) || this._atomic(function() {
        return this._match("&") && this._match("&");
    }) || this._match("&") || this._atomic(function() {
        return this._match("=") && this._match("=");
    }) || this._atomic(function() {
        return this._match("!") && this._match("=");
    }) || this._atomic(function() {
        return this._match("<") && this._match("=");
    }) || this._atomic(function() {
        return this._match(">") && this._match("=");
    }) || this._match("<") || this._match(">");
};

IokeLexer.prototype["seperator"] = function $seperator() {
    return this._match(" ");
};

IokeLexer.prototype["newline"] = function $newline() {
    return this._atomic(function() {
        return this._match("\r") && this._match("\n");
    }) || this._match("\n") || this._match("\r");
};

IokeLexer.prototype["terminator"] = function $terminator() {
    return this._match(".");
};

IokeLexer.prototype["openParen"] = function $openParen() {
    return this._match("(");
};

IokeLexer.prototype["closeParen"] = function $closeParen() {
    return this._match(")");
};

IokeLexer.prototype["comma"] = function $comma() {
    return this._match(",");
};

IokeLexer.prototype["openSquare"] = function $openSquare() {
    return this._match("[");
};

IokeLexer.prototype["closeSquare"] = function $closeSquare() {
    return this._match("]");
};

IokeLexer.prototype["colon"] = function $colon() {
    return this._match(":");
};

IokeLexer.prototype["hashrocket"] = function $hashrocket() {
    return this._match("=") && this._match(">");
};