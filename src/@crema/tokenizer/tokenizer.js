/**
 * Cách sử dụng
 * (new Tokenizer("let x = '22-@\"' + 'let'", ["aaa, bbb"])).tokenize();
 *
 */
export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

export default class Tokenizer {
  identifier_keywords = [
    'str.contains',
    'str.startswith',
    'str.endswith',
    'dt.year',
    'dt.month',
    'dt.day',
  ];
  variable_keywords = [];
  logic_keywords = ['and', 'or', 'not', '>', '>=', '<', '<=', '==', '!='];
  operator_keywords = ['+', '-', '*', '/'];
  function_keywords = ['sqrt'];

  constructor(source, columns = []) {
    this.source = source;
    this.variable_keywords = [...this.variable_keywords, ...columns];
    this.current = 0;
  }
  // Hàm đọc ký tự hiện tại
  getCurrentChar() {
    return this.source[this.current] || null;
  }

  // Hàm di chuyển đến ký tự tiếp theo
  advance() {
    this.current++;
  }

  // Hàm kiểm tra ký tự hiện tại
  peek() {
    return this.source[this.current + 1] || null;
  }

  // Hàm tạo token cho từ khóa
  createKeywordToken(keyword) {
    return new Token('KEYWORD', keyword);
  }

  // Hàm tạo token cho biến
  createIdentifierToken(identifier) {
    return new Token('IDENTIFIER', identifier);
  }

  // Hàm tạo token cho số
  createNumberToken(number) {
    return new Token('NUMBER', number);
  }

  // Hàm tạo token cho toán tử
  createOperatorToken(operator) {
    return new Token('OPERATOR', operator);
  }

  // Hàm tạo token cho chuỗi ký tự
  createStringToken(string) {
    return new Token('STRING', string);
  }

  // Hàm tạo token cho toán tử logic
  createLogicToken(logic) {
    return new Token('LOGIC', logic);
  }

  // Hàm tạo token cho gọi hàm
  createFunctionCallToken(functionName) {
    return new Token('FUNCTION_CALL', functionName);
  }

  // Hàm tạo token cho phương thức của biến
  createMethodCallToken(variable, methodName) {
    return new Token('METHOD_CALL', { variable, methodName });
  }

  // Hàm phân tích và tạo token
  tokenize() {
    const tokens = [];
    while (this.current < this.source.length) {
      const char = this.getCurrentChar();

      // Bỏ qua khoảng trắng
      if (/\s/.test(char)) {
        this.advance();
        continue;
      }

      // Nhận diện chuỗi ký tự
      if (char === "'") {
        const quote = char;
        let value = '';
        this.advance(); // Bỏ qua dấu nháy bắt đầu
        while (
          this.current < this.source.length &&
          this.getCurrentChar() !== quote
        ) {
          value += this.getCurrentChar();
          this.advance();
        }
        if (this.getCurrentChar() === quote) {
          this.advance(); // Bỏ qua dấu nháy kết thúc
        } else {
          throw new Error('Unterminated string literal');
        }
        tokens.push(this.createStringToken(value));
        continue;
      }

      // Nhận diện từ khóa hoặc biến
      if (/[a-zA-Z_]/.test(char)) {
        let value = '';
        while (
          /[a-zA-Z0-9_]/.test(this.getCurrentChar()) &&
          this.current < this.source.length
        ) {
          value += this.getCurrentChar();
          this.advance();
        }
        // Xử lý gọi phương thức của biến
        if (this.getCurrentChar() === '.') {
          this.advance();
          let methodName = '';
          while (
            /[a-zA-Z_.]/.test(this.getCurrentChar()) &&
            this.current < this.source.length
          ) {
            methodName += this.getCurrentChar();
            this.advance();
          }
          // Thêm dấu ngoặc nếu có
          if (this.getCurrentChar() === '(') {
            if (this.identifier_keywords.includes(methodName)) {
              tokens.push(this.createMethodCallToken(value, methodName));
            } else {
              throw new Error(`Unexpected function: ${value}`);
            }
            while (
              this.getCurrentChar() !== ')' &&
              this.current < this.source.length
            ) {
              this.advance();
            }
            if (this.getCurrentChar() === ')') {
              this.advance();
            }
          } else {
            throw new Error(`Error function call: ${value}`);
          }
          continue;
        }

        if (this.variable_keywords.includes(value)) {
          tokens.push(this.createIdentifierToken(value));
          continue;
        }

        // Xác định loại token dựa trên từ khóa
        if (this.logic_keywords.includes(value)) {
          tokens.push(this.createLogicToken(value));
          continue;
        }

        if (this.getCurrentChar() === '(') {
          if (this.function_keywords.includes(value)) {
            tokens.push(this.createFunctionCallToken(value));
          } else {
            throw new Error(`Unexpected function: ${value}`);
          }
        }

        continue;
      }

      // Nhận diện số
      if (/\d/.test(char) || char === '+' || char === '-') {
        let value = this.getCurrentChar();
        this.advance();

        while (
          /\d/.test(this.getCurrentChar()) &&
          this.current < this.source.length
        ) {
          value += this.getCurrentChar();
          this.advance();
        }
        if (/\d/.test(value)) {
          tokens.push(this.createNumberToken(value));
        } else if (this.operator_keywords.includes(value)) {
          tokens.push(this.createOperatorToken(value));
        }
        continue;
      }

      // Nhận diện toán tử
      if (this.operator_keywords.includes(char)) {
        tokens.push(this.createOperatorToken(char));
        this.advance();
        continue;
      }

      // Nhận diện dấu ngoặc mở
      if (char === '(') {
        tokens.push(new Token('PUNCTUATION', char));
        this.advance();
        continue;
      }

      // Nhận diện dấu ngoặc đóng
      if (char === ')') {
        tokens.push(new Token('PUNCTUATION', char));
        this.advance();
        continue;
      }

      const findLogicKeyword = this.logic_keywords.find(
        (keyword) =>
          this.source.substring(this.current, this.current + keyword.length) ===
          keyword,
      );

      // Nhận diện toán tử logic
      if (findLogicKeyword) {
        this.current += findLogicKeyword.length;
        tokens.push(this.createLogicToken(findLogicKeyword));
        continue;
      }

      throw new Error(`Unexpected character: ${char}`);
    }
    return tokens;
  }
}

// // Ví dụ sử dụng
// const sourceCode = 'let greeting = "Hello, world!";';
// const tokenizer = new Tokenizer(sourceCode);
// const tokens = tokenizer.tokenize();
