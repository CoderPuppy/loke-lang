# Syntax

## Literals are just message sends
`"hello"` parses to `[ [ "hello" ] ]`
`123` parses to `[ [ 123 ] ]`

And you can pass arguments
`123("hello"("drew"))` parses to `[ [ 123, [ [ "hello", [ [ "drew" ] ] ] ] ] ]

## Symbols
Are basically unquoted strings.