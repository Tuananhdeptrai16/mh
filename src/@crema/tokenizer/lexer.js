export default class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.currentChar = this.input[this.pos];
  }

  advance() {
    this.pos++;
    if (this.pos > this.input.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.pos];
    }
  }

  skipWhitespace() {
    while (this.currentChar !== null && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  identifier() {
    let result = '';
    while (this.currentChar !== null && /[a-zA-Z_]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    if (result.length > 0) {
      while (
        this.currentChar !== null &&
        /[a-zA-Z0-9_]/.test(this.currentChar)
      ) {
        result += this.currentChar;
        this.advance();
      }
    }
    return result;
  }

  number() {
    let result = '';
    while (this.currentChar !== null && /\d/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return { type: 'NUMBER', value: parseFloat(result) };
  }

  string() {
    let result = '';
    this.advance(); // Skip opening quote
    while (this.currentChar !== null && this.currentChar !== "'") {
      result += this.currentChar;
      this.advance();
    }
    this.advance(); // Skip closing quote
    return { type: 'STRING', value: result };
  }

  getNextToken() {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (this.currentChar === "'") {
        return this.string();
      }

      if (/\d/.test(this.currentChar)) {
        return this.number();
      }

      if (/[a-zA-Z_]/.test(this.currentChar)) {
        let id = this.identifier();
        if (['sqrt', 'contains', 'startswith', 'endswith'].includes(id)) {
          return { type: 'FUNCTION', value: id };
        } else {
          return { type: 'IDENTIFIER', value: id };
        }
      }

      if (this.currentChar === '(') {
        this.advance();
        return { type: 'LPAREN', value: '(' };
      }

      if (this.currentChar === ')') {
        this.advance();
        return { type: 'RPAREN', value: ')' };
      }

      if (this.currentChar === '+') {
        this.advance();
        return { type: 'PLUS', value: '+' };
      }

      if (this.currentChar === '-') {
        this.advance();
        return { type: 'MINUS', value: '-' };
      }

      if (this.currentChar === '*') {
        this.advance();
        return { type: 'MULTIPLY', value: '*' };
      }

      if (this.currentChar === '/') {
        this.advance();
        return { type: 'DIVIDE', value: '/' };
      }

      if (this.currentChar === '>') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return { type: 'GTE', value: '>=' };
        }
        return { type: 'GT', value: '>' };
      }

      if (this.currentChar === '<') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return { type: 'LTE', value: '<=' };
        }
        return { type: 'LT', value: '<' };
      }

      if (this.currentChar === '=') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return { type: 'EQ', value: '==' };
        }
        throw new Error('Invalid character');
      }

      if (this.currentChar === '!') {
        this.advance();
        if (this.currentChar === '=') {
          this.advance();
          return { type: 'NEQ', value: '!=' };
        }
        throw new Error('Invalid character');
      }

      if (this.currentChar === '&' && this.input[this.pos + 1] === '&') {
        this.advance();
        this.advance();
        return { type: 'AND', value: 'and' };
      }

      if (this.currentChar === '|' && this.input[this.pos + 1] === '|') {
        this.advance();
        this.advance();
        return { type: 'OR', value: 'or' };
      }

      if (
        this.currentChar === 'n' &&
        this.input.slice(this.pos, this.pos + 3) === 'not'
      ) {
        this.advance();
        this.advance();
        this.advance();
        return { type: 'NOT', value: 'not' };
      }

      if (this.currentChar === '.') {
        this.advance();
        return { type: 'DOT', value: '.' };
      }

      throw new Error('Invalid character');
    }

    return { type: 'EOF' };
  }
}
