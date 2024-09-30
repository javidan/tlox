export enum TokenType {
    // single
    EOL = "EOL",
    PLUS = "PLUS",
    MINUS = "MINUS",
    LEFT_PAREN = "LEFT_PAREN",
    RIGHT_PAREN = "RIGHT_PAREN", 
    LEFT_BRACE = "LEFT_BRACE", 
    RIGHT_BRACE ="RIGHT_BRACE",
    COMMA = "COMMA", 
    DOT = "DOT", 
    SEMICOLON = "SEMICOLON", 
    SLASH = "SLASH", 
    STAR = "STAR",
    // One or two character tokens.
    BANG = "BANG", 
    BANG_EQUAL = "BANG_EQUAL",
    EQUAL = "EQUAL", 
    EQUAL_EQUAL = "EQUAL_EQUAL",
    GREATER = "GREATER", 
    GREATER_EQUAL = "GREATER_EQUAL",
    LESS = "LESS", 
    LESS_EQUAL = "LESS_EQUAL",
    // Literals.
    IDENTIFIER = "IDENTIFIER", 
    STRING = "STRING", 
    NUMBER = "NUMBER",
}