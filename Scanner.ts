import { Token } from "./Token"
import { TokenType } from "./TokenType"
import { Lox } from "./lox"

export class Scanner {
    line = 0
    current = 0
    start = 0
    source: string
    tokens: Token[] = []

    constructor(source: string){
        this.source = source
    }

    scanTokens(){
        while(true){

            if(!this.isAtEnd()){
                this.start = this.current
                this.scanToken()
                continue
            }


            this.tokens.push(new Token(TokenType.EOL, '', null, this.line))
            break
        }

        return this.tokens
    }

    scanToken(){
        const c = this.eatCurrentChar()

        switch(c){
            case '+': this.addToken(TokenType.PLUS); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;
            case '!': {
                const nextChar = this.getCurrentChar()
                if(nextChar == '=') {
                    this.addToken(TokenType.BANG_EQUAL)
                    this.eatCurrentChar()
                }else{
                    this.addToken(TokenType.BANG)
                }
                break
            };
            case '=': {
                const nextChar = this.getCurrentChar()
                if(nextChar == '=') {
                    this.addToken(TokenType.EQUAL_EQUAL)
                    this.eatCurrentChar()
                }else{
                    this.addToken(TokenType.EQUAL)
                }
                break
            };

            case '<': {
                const nextChar = this.getCurrentChar()
                if(nextChar == '=') {
                    this.addToken(TokenType.LESS_EQUAL)
                    this.eatCurrentChar()
                }else{
                    this.addToken(TokenType.LESS)
                }
                break
            };
            case '>': {
                const nextChar = this.getCurrentChar()
                if(nextChar == '=') {
                    this.addToken(TokenType.GREATER_EQUAL)
                    this.eatCurrentChar()
                }else{
                    this.addToken(TokenType.GREATER)
                }
                break
            };

            case '"':{
                this.string();
            }

            default:{
                if(this.isDigit(c)){
                    this.number()
                }else if(this.isAlpha(c)){
                    this.identifier()
                }else{
                    Lox.error(this.line, "Unexpected character.");
                }

            }
                
        }
    }

    isDigit(char: string){
        if(['0','1','2','3','4','5','6','7','8','9'].includes(char)) return true
        return false
    }

    private isAlpha(c:string) {
        return (c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z') ||
                c == '_';
    }

    private string() {
        while (this.getCurrentChar() != '"' && !this.isAtEnd()) {
            if (this.getCurrentChar() == '\n') this.line++;
            this.eatCurrentChar();
        }

        // Unterminated string.
        if (this.isAtEnd()) {
            Lox.error(this.line, "Unterminated string.");
            return;
        }

        // The closing ".
        this.eatCurrentChar();

        // Trim the surrounding quotes.
        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    private identifier() {
        while (this.isAlphaNumeric(this.getCurrentChar())) this.eatCurrentChar();

        // See if the identifier is a reserved word.
        const text = this.source.substring(this.start, this.current);

        // TokenType type = keywords.get(text);
        // if (type == null) type = TokenType.IDENTIFIER;
        this.addToken(TokenType.IDENTIFIER);
    }

    private isAlphaNumeric(c:string) {
        return this.isAlpha(c) || this.isDigit(c);
    }


    private number() {
        while (this.isDigit(this.getCurrentChar())) this.eatCurrentChar();

        // Look for a fractional part.
        if (this.getCurrentChar() == '.' && this.isDigit(this.getNextChar())) {
            // Consume the "."
            this.eatCurrentChar();

            while (this.isDigit(this.getCurrentChar())) this.eatCurrentChar();
        }

        this.addToken(TokenType.NUMBER, Number.parseFloat(this.source.substring(this.start, this.current)));
    }

    addToken(type: TokenType, literal: number| string | null = null){

        const text = this.source.substring(this.start, this.current)
        const token = new Token(type, text, literal, this.line)
        this.tokens.push(token)
    }

    private eatCurrentChar(){
        return this.source[this.current++]
    }

    private getCurrentChar(){
        return this.source[this.current]
    }

    private getNextChar(){
        return this.source[this.current+1]
    }

    private isAtEnd(){
        return this.current >= this.source.length
    }

}