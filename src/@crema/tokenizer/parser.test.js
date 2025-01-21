import Lexer from './lexer';
import Parser from './parser';

function evaluate(expression, variables = {}) {
  const lexer = new Lexer(expression);
  const parser = new Parser(lexer);
  return parser.parse(variables);
}

describe('parser', () => {
  /**
   * Kiểm tra các hợp lệ
   */
  it('Kiểm tra logic', () => {
    const variables = { column_1: 10, column_2: 20 };
    const expr = 'column_1 + column_2 > 25 and sqrt(16) == 4';
    const result = evaluate(expr, variables);
    expect(result).toEqual(true);
  });

  it('Kiểm tra string', () => {
    const variables = { column_1: 'Hello', column_2: 'World!' };
    const expr = "(column_1 + ', ' + column_2) == 'Hello, World!'";
    const result = evaluate(expr, variables);
    expect(result).toEqual(true);
  });

  it('Kiểm tra hàm hỗ trợ string', () => {
    const variables = { column_1: 'Hello, World!' };
    const expr = "column_1.str.contains('Hello')";
    const result = evaluate(expr, variables);
    expect(result).toEqual(true);
  });

  it('Kiểm tra hàm hỗ trợ date', () => {
    const variables = {
      column_1: 'Tue Aug 13 2024 16:36:34 GMT+0700 (GMT+07:00)',
    };
    const expr = 'column_1.dt.year';
    const result = evaluate(expr, variables);
    expect(result).toEqual(2024);
  });
});
